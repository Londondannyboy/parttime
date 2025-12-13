#!/usr/bin/env python3
"""
Fetch brand data from Brandfetch Brand API and store in database.
Uses the free tier (100 requests/month) for testing.
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


def get_db_connection():
    """Get database connection"""
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        raise ValueError("DATABASE_URL environment variable not set")
    return psycopg2.connect(database_url)


def get_companies_without_brands(conn, limit: int = 10) -> list[dict]:
    """Get companies that have domains but no brand data fetched yet"""
    with conn.cursor(cursor_factory=RealDictCursor) as cur:
        cur.execute("""
            SELECT DISTINCT j.company_domain, j.company_name
            FROM jobs j
            LEFT JOIN company_brands cb ON j.company_domain = cb.domain
            WHERE j.is_active = true
              AND j.company_domain IS NOT NULL
              AND j.company_domain != ''
              AND cb.id IS NULL
            ORDER BY j.company_name
            LIMIT %s
        """, (limit,))
        return [dict(row) for row in cur.fetchall()]


async def fetch_brand_from_api(domain: str, api_key: str) -> Optional[dict]:
    """Fetch brand data from Brandfetch Brand API"""
    url = f"https://api.brandfetch.io/v2/brands/{domain}"
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
    """Extract relevant fields from Brandfetch API response"""
    # Extract colors
    colors = []
    for color in api_response.get('colors', []):
        colors.append({
            'hex': color.get('hex'),
            'type': color.get('type'),
            'brightness': color.get('brightness')
        })

    # Extract fonts
    fonts = api_response.get('fonts', [])
    font_title = None
    font_body = None
    for font in fonts:
        if font.get('type') == 'title':
            font_title = font.get('name')
        elif font.get('type') == 'body':
            font_body = font.get('name')

    # Extract logos - get URLs for different variants
    logos = {}
    for logo in api_response.get('logos', []):
        logo_type = logo.get('type', 'logo')
        theme = logo.get('theme', 'light')
        key = f"{logo_type}_{theme}"

        # Get the best format (prefer SVG, then PNG)
        formats = logo.get('formats', [])
        for fmt in formats:
            if fmt.get('format') == 'svg':
                logos[key] = fmt.get('src')
                break
            elif fmt.get('format') == 'png':
                logos[key] = fmt.get('src')

    # Extract company info
    company_info = api_response.get('company', {})

    return {
        'colors': colors,
        'font_title': font_title,
        'font_body': font_body,
        'logos': logos,
        'description': api_response.get('description'),
        'founded': company_info.get('foundedYear'),
        'employees': company_info.get('numberOfEmployees'),
        'location': None,  # Would need to parse from company_info
        'industries': [ind.get('name') for ind in company_info.get('industries', [])],
        'quality_score': api_response.get('qualityScore')
    }


def save_brand_to_database(conn, domain: str, company_name: str, brand_data: dict):
    """Save brand data to company_brands table"""
    with conn.cursor() as cur:
        cur.execute("""
            INSERT INTO company_brands (
                domain, company_name, colors, font_title, font_body,
                logos, description, founded, employees, location,
                industries, quality_score, fetched_at
            ) VALUES (
                %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW()
            )
            ON CONFLICT (domain) DO UPDATE SET
                company_name = EXCLUDED.company_name,
                colors = EXCLUDED.colors,
                font_title = EXCLUDED.font_title,
                font_body = EXCLUDED.font_body,
                logos = EXCLUDED.logos,
                description = EXCLUDED.description,
                founded = EXCLUDED.founded,
                employees = EXCLUDED.employees,
                location = EXCLUDED.location,
                industries = EXCLUDED.industries,
                quality_score = EXCLUDED.quality_score,
                fetched_at = NOW()
        """, (
            domain,
            company_name,
            Json(brand_data['colors']),
            brand_data['font_title'],
            brand_data['font_body'],
            Json(brand_data['logos']),
            brand_data['description'],
            brand_data['founded'],
            brand_data['employees'],
            brand_data['location'],
            brand_data['industries'],
            brand_data['quality_score']
        ))
    conn.commit()


async def main(limit: int = 10, dry_run: bool = False):
    """Main processing function"""
    api_key = os.environ.get('BRANDFETCH_API_KEY')
    if not api_key:
        print("Error: BRANDFETCH_API_KEY environment variable not set")
        print("Get your API key from https://developers.brandfetch.com/")
        return

    conn = get_db_connection()

    try:
        companies = get_companies_without_brands(conn, limit)
        print(f"\n{'='*60}")
        print(f"BRANDFETCH BRAND DATA FETCH")
        print(f"{'='*60}")
        print(f"Found {len(companies)} companies without brand data")
        print(f"API Key: {api_key[:10]}...{api_key[-4:]}")
        print(f"{'='*60}\n")

        success_count = 0
        skip_count = 0
        error_count = 0

        for i, company in enumerate(companies):
            domain = company['company_domain']
            name = company['company_name']
            print(f"\n[{i+1}/{len(companies)}] {name} ({domain})")

            try:
                api_response = await fetch_brand_from_api(domain, api_key)

                if api_response:
                    brand_data = extract_brand_data(api_response)

                    print(f"    Colors: {len(brand_data['colors'])}")
                    print(f"    Fonts: {brand_data['font_title'] or 'N/A'} / {brand_data['font_body'] or 'N/A'}")
                    print(f"    Logos: {len(brand_data['logos'])}")
                    print(f"    Quality: {brand_data['quality_score']}")

                    if not dry_run:
                        save_brand_to_database(conn, domain, name, brand_data)
                        print(f"    Saved to database")
                    else:
                        print(f"    [DRY RUN] Would save to database")

                    success_count += 1
                else:
                    skip_count += 1

            except Exception as e:
                print(f"    Error: {str(e)[:80]}")
                error_count += 1
                continue

        print(f"\n{'='*60}")
        print(f"COMPLETE: {success_count} fetched, {skip_count} skipped, {error_count} errors")
        print(f"{'='*60}\n")

    finally:
        conn.close()


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description='Fetch brand data from Brandfetch API')
    parser.add_argument('--limit', type=int, default=10, help='Max companies to process')
    parser.add_argument('--dry-run', action='store_true', help='Don\'t actually save to database')

    args = parser.parse_args()

    print(f"\nStarting Brand Data Fetch...")
    print(f"Limit: {args.limit}, Dry run: {args.dry_run}")

    asyncio.run(main(limit=args.limit, dry_run=args.dry_run))
