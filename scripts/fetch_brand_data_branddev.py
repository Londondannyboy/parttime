#!/usr/bin/env python3
"""
Fetch brand data from Brand.dev API and store in database.
Uses the same normalized schema as Brandfetch for provider-agnostic storage.
"""

import os
import json
import asyncio
import httpx
from typing import Optional
from dotenv import load_dotenv
import psycopg2
from psycopg2.extras import RealDictCursor, Json

load_dotenv()


def calculate_brightness(hex_color: str) -> int:
    """Calculate perceived brightness from hex color (0-255)"""
    hex_color = hex_color.lstrip('#')
    r = int(hex_color[0:2], 16)
    g = int(hex_color[2:4], 16)
    b = int(hex_color[4:6], 16)
    # Standard luminance formula
    return int((r * 299 + g * 587 + b * 114) / 1000)


def infer_color_type(color_name: str, brightness: int) -> str:
    """Infer color type from name and brightness"""
    name_lower = color_name.lower() if color_name else ""

    if brightness < 50:
        return "dark"
    if brightness > 200:
        return "light"
    if "primary" in name_lower or "brand" in name_lower:
        return "brand"
    if "accent" in name_lower or "secondary" in name_lower:
        return "accent"

    # Default based on brightness
    if brightness < 128:
        return "dark"
    return "accent"


def get_db_connection():
    """Get database connection"""
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        raise ValueError("DATABASE_URL environment variable not set")
    return psycopg2.connect(database_url)


def get_companies_without_brands(conn, limit: int = 10, provider: str = 'branddev') -> list[dict]:
    """Get companies that don't have brand data from this provider yet"""
    with conn.cursor(cursor_factory=RealDictCursor) as cur:
        # Get companies without brand data OR with data from different provider
        cur.execute("""
            SELECT DISTINCT j.company_domain, j.company_name
            FROM jobs j
            LEFT JOIN company_brands cb ON j.company_domain = cb.domain
            WHERE j.is_active = true
              AND j.company_domain IS NOT NULL
              AND j.company_domain != ''
              AND (cb.id IS NULL OR cb.provider != %s OR cb.provider IS NULL)
            ORDER BY j.company_name
            LIMIT %s
        """, (provider, limit,))
        return [dict(row) for row in cur.fetchall()]


async def fetch_brand_from_branddev(domain: str, api_key: str) -> Optional[dict]:
    """Fetch brand data from Brand.dev API"""
    url = f"https://api.brand.dev/v1/brand/retrieve?domain={domain}"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url, headers=headers, timeout=30.0)
            if response.status_code == 200:
                return response.json()
            elif response.status_code == 404:
                print(f"    Brand not found for {domain}")
                return None
            else:
                print(f"    API error {response.status_code}: {response.text[:100]}")
                return None
        except Exception as e:
            print(f"    Request error: {str(e)[:80]}")
            return None


def extract_brand_data(api_response: dict) -> dict:
    """Extract and normalize Brand.dev response to our schema"""
    brand = api_response.get('brand', {})

    # Extract and normalize colors
    colors = []
    for color in brand.get('colors', []):
        hex_val = color.get('hex', '#888888')
        brightness = calculate_brightness(hex_val)
        colors.append({
            'hex': hex_val,
            'type': infer_color_type(color.get('name', ''), brightness),
            'brightness': brightness
        })

    # Sort colors by brightness to ensure we have dark, light, accent
    colors.sort(key=lambda c: c['brightness'])

    # If we don't have enough color types, infer them
    if colors:
        colors[0]['type'] = 'dark'  # Darkest is always dark
        if len(colors) > 1:
            colors[-1]['type'] = 'light'  # Lightest is always light
        if len(colors) > 2:
            colors[1]['type'] = 'accent'  # Middle is accent

    # Extract logos - map to our format {logo_light, logo_dark, symbol_light, etc}
    logos = {}
    for logo in brand.get('logos', []):
        logo_type = logo.get('type', 'logo')  # "logo" or "icon"
        mode = logo.get('mode', 'dark')  # "light", "dark", or "has_opaque_background"

        # Normalize mode
        if mode == 'has_opaque_background':
            mode = 'dark'  # Assume dark background safe

        key = f"{logo_type}_{mode}"
        logos[key] = logo.get('url')

    # Extract banner/backdrop
    banners = {}
    backdrops = brand.get('backdrops', [])
    if backdrops:
        banners['banner'] = backdrops[0].get('url')

    # Extract address info
    address = brand.get('address', {})

    # Extract industries
    industries = []
    industry_data = brand.get('industries', {})
    if isinstance(industry_data, dict):
        for ind in industry_data.get('eic', []):
            if ind.get('industry'):
                industries.append(ind['industry'])

    # Calculate quality score based on data completeness
    quality_factors = [
        bool(colors),
        bool(logos),
        bool(banners),
        bool(brand.get('description')),
        bool(address.get('city')),
        bool(industries),
    ]
    quality_score = sum(quality_factors) / len(quality_factors)

    return {
        'colors': colors,
        'font_title': None,  # Brand.dev doesn't include fonts in standard response
        'font_body': None,
        'logos': logos,
        'banners': banners,
        'description': brand.get('description'),
        'founded': None,  # Brand.dev doesn't include founded year in standard response
        'employees': None,  # Brand.dev doesn't include employee count
        'city': address.get('city'),
        'country': address.get('country'),
        'company_kind': None,
        'industries': industries,
        'quality_score': round(quality_score, 2)
    }


def save_brand_to_database(conn, domain: str, company_name: str, brand_data: dict, provider: str = 'branddev'):
    """Save brand data to company_brands table"""
    with conn.cursor() as cur:
        cur.execute("""
            INSERT INTO company_brands (
                domain, company_name, colors, font_title, font_body,
                logos, banners, description, founded, employees,
                city, country, company_kind, industries, quality_score,
                fetched_at, provider
            ) VALUES (
                %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW(), %s
            )
            ON CONFLICT (domain) DO UPDATE SET
                company_name = EXCLUDED.company_name,
                colors = EXCLUDED.colors,
                font_title = EXCLUDED.font_title,
                font_body = EXCLUDED.font_body,
                logos = EXCLUDED.logos,
                banners = EXCLUDED.banners,
                description = EXCLUDED.description,
                founded = EXCLUDED.founded,
                employees = EXCLUDED.employees,
                city = EXCLUDED.city,
                country = EXCLUDED.country,
                company_kind = EXCLUDED.company_kind,
                industries = EXCLUDED.industries,
                quality_score = EXCLUDED.quality_score,
                fetched_at = NOW(),
                provider = EXCLUDED.provider
        """, (
            domain,
            company_name,
            Json(brand_data['colors']),
            brand_data['font_title'],
            brand_data['font_body'],
            Json(brand_data['logos']),
            Json(brand_data.get('banners', {})),
            brand_data['description'],
            brand_data['founded'],
            brand_data['employees'],
            brand_data.get('city'),
            brand_data.get('country'),
            brand_data.get('company_kind'),
            brand_data['industries'],
            brand_data['quality_score'],
            provider
        ))
    conn.commit()


async def main(limit: int = 10, dry_run: bool = False, domains: list = None):
    """Main processing function"""
    api_key = os.environ.get('BRANDDEV_API_KEY')
    if not api_key:
        print("Error: BRANDDEV_API_KEY environment variable not set")
        return

    conn = get_db_connection()

    try:
        if domains:
            # Fetch specific domains
            companies = [{'company_domain': d, 'company_name': d} for d in domains]
        else:
            companies = get_companies_without_brands(conn, limit, provider='branddev')

        print(f"\n{'='*60}")
        print(f"BRAND.DEV BRAND DATA FETCH")
        print(f"{'='*60}")
        print(f"Found {len(companies)} companies to process")
        print(f"API Key: {api_key[:15]}...{api_key[-4:]}")
        print(f"{'='*60}\n")

        success_count = 0
        skip_count = 0
        error_count = 0

        for i, company in enumerate(companies):
            domain = company['company_domain']
            name = company['company_name']
            print(f"\n[{i+1}/{len(companies)}] {name} ({domain})")

            try:
                api_response = await fetch_brand_from_branddev(domain, api_key)

                if api_response and api_response.get('brand'):
                    brand_data = extract_brand_data(api_response)

                    print(f"    Colors: {len(brand_data['colors'])}")
                    print(f"    Logos: {len(brand_data['logos'])}")
                    print(f"    Banners: {len(brand_data.get('banners', {}))}")
                    if brand_data.get('city'):
                        print(f"    Location: {brand_data['city']}, {brand_data.get('country', '')}")
                    print(f"    Quality: {brand_data['quality_score']}")

                    if not dry_run:
                        save_brand_to_database(conn, domain, name, brand_data, provider='branddev')
                        print(f"    ✅ Saved to database (provider: branddev)")
                    else:
                        print(f"    [DRY RUN] Would save to database")

                    success_count += 1
                else:
                    skip_count += 1

            except Exception as e:
                print(f"    ❌ Error: {str(e)[:80]}")
                error_count += 1
                continue

        print(f"\n{'='*60}")
        print(f"COMPLETE: {success_count} fetched, {skip_count} skipped, {error_count} errors")
        print(f"{'='*60}\n")

    finally:
        conn.close()


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description='Fetch brand data from Brand.dev API')
    parser.add_argument('--limit', type=int, default=10, help='Max companies to process')
    parser.add_argument('--dry-run', action='store_true', help='Don\'t actually save to database')
    parser.add_argument('--domains', nargs='+', help='Specific domains to fetch')

    args = parser.parse_args()

    print(f"\nStarting Brand.dev Data Fetch...")
    print(f"Limit: {args.limit}, Dry run: {args.dry_run}")
    if args.domains:
        print(f"Domains: {args.domains}")

    asyncio.run(main(limit=args.limit, dry_run=args.dry_run, domains=args.domains))
