#!/usr/bin/env python3
"""
Add Internal Links to Existing Jobs - Simple Regex Version

No external AI APIs needed. Uses pattern matching to add SEO internal links.
"""

import os
import re
from typing import Optional, Tuple

import psycopg2
from psycopg2.extras import RealDictCursor

from dotenv import load_dotenv
load_dotenv('.env.local')
load_dotenv()


# Keyword clusters with their target URLs and anchor text variations
# Order matters - more specific patterns first
KEYWORD_CLUSTERS = {
    'CFO': {
        'url': '/fractional-jobs?role=CFO',
        'patterns': [
            (r'\b(Fractional CFO)s?\b', r'[\1](/fractional-jobs?role=CFO)'),
            (r'\b(fractional CFO)s?\b', r'[\1](/fractional-jobs?role=CFO)'),
            (r'\b(Fractional Finance Director)s?\b', r'[\1](/fractional-jobs?role=CFO)'),
            (r'\b(fractional finance director)s?\b', r'[\1](/fractional-jobs?role=CFO)'),
            (r'\b(CFO role)s?\b', r'[\1](/fractional-jobs?role=CFO)'),
            (r'\b(part-time CFO)s?\b', r'[\1](/fractional-jobs?role=CFO)'),
            (r'\b(CFO opportunit)(y|ies)\b', r'[\1\2](/fractional-jobs?role=CFO)'),
            (r'\b(finance leadership)\b', r'[\1](/fractional-jobs?role=CFO)'),
            (r'\b(senior finance leader)s?\b', r'[\1](/fractional-jobs?role=CFO)'),
            (r'\b(strategic financial)\b', r'[\1](/fractional-jobs?role=CFO)'),
        ]
    },
    'CMO': {
        'url': '/fractional-jobs?role=CMO',
        'patterns': [
            (r'\b(Fractional CMO)s?\b', r'[\1](/fractional-jobs?role=CMO)'),
            (r'\b(fractional CMO)s?\b', r'[\1](/fractional-jobs?role=CMO)'),
            (r'\b(Fractional Marketing Director)s?\b', r'[\1](/fractional-jobs?role=CMO)'),
            (r'\b(fractional marketing director)s?\b', r'[\1](/fractional-jobs?role=CMO)'),
            (r'\b(CMO role)s?\b', r'[\1](/fractional-jobs?role=CMO)'),
            (r'\b(part-time CMO)s?\b', r'[\1](/fractional-jobs?role=CMO)'),
            (r'\b(CMO opportunit)(y|ies)\b', r'[\1\2](/fractional-jobs?role=CMO)'),
            (r'\b(marketing leadership)\b', r'[\1](/fractional-jobs?role=CMO)'),
        ]
    },
    'CTO': {
        'url': '/fractional-jobs?role=CTO',
        'patterns': [
            (r'\b(Fractional CTO)s?\b', r'[\1](/fractional-jobs?role=CTO)'),
            (r'\b(fractional CTO)s?\b', r'[\1](/fractional-jobs?role=CTO)'),
            (r'\b(Fractional Tech Director)s?\b', r'[\1](/fractional-jobs?role=CTO)'),
            (r'\b(fractional tech director)s?\b', r'[\1](/fractional-jobs?role=CTO)'),
            (r'\b(CTO role)s?\b', r'[\1](/fractional-jobs?role=CTO)'),
            (r'\b(part-time CTO)s?\b', r'[\1](/fractional-jobs?role=CTO)'),
            (r'\b(CTO opportunit)(y|ies)\b', r'[\1\2](/fractional-jobs?role=CTO)'),
            (r'\b(technology leadership)\b', r'[\1](/fractional-jobs?role=CTO)'),
            (r'\b(technical leadership)\b', r'[\1](/fractional-jobs?role=CTO)'),
        ]
    },
    'COO': {
        'url': '/fractional-jobs?role=COO',
        'patterns': [
            (r'\b(Fractional COO)s?\b', r'[\1](/fractional-jobs?role=COO)'),
            (r'\b(fractional COO)s?\b', r'[\1](/fractional-jobs?role=COO)'),
            (r'\b(Fractional Operations Director)s?\b', r'[\1](/fractional-jobs?role=COO)'),
            (r'\b(fractional operations director)s?\b', r'[\1](/fractional-jobs?role=COO)'),
            (r'\b(COO role)s?\b', r'[\1](/fractional-jobs?role=COO)'),
            (r'\b(part-time COO)s?\b', r'[\1](/fractional-jobs?role=COO)'),
            (r'\b(COO opportunit)(y|ies)\b', r'[\1\2](/fractional-jobs?role=COO)'),
            (r'\b(operations leadership)\b', r'[\1](/fractional-jobs?role=COO)'),
        ]
    },
    'general': {
        'url': '/fractional-jobs',
        'patterns': [
            (r'\b(fractional role)s?\b', r'[\1](/fractional-jobs)'),
            (r'\b(fractional job)s?\b', r'[\1](/fractional-jobs)'),
            (r'\b(fractional executive)s?\b', r'[\1](/fractional-jobs)'),
            (r'\b(fractional leader)s?\b', r'[\1](/fractional-jobs)'),
            (r'\b(fractional position)s?\b', r'[\1](/fractional-jobs)'),
            (r'\b(part-time executive)s?\b', r'[\1](/fractional-jobs)'),
            (r'\b(portfolio career)s?\b', r'[\1](/fractional-jobs)'),
            (r'\b(fractional opportunit)(y|ies)\b', r'[\1\2](/fractional-jobs)'),
            (r'\b(fractional work)\b', r'[\1](/fractional-jobs)'),
            (r'\b(fractional engagement)s?\b', r'[\1](/fractional-jobs)'),
        ]
    }
}


def add_links_to_description(text: str, role_category: Optional[str] = None) -> Tuple[str, int, list]:
    """
    Add internal links to job description.
    Returns: (updated_text, links_added, clusters_used)
    """
    if not text:
        return text, 0, []

    # Skip if already has links
    if '](/fractional-jobs' in text:
        return text, 0, []

    clusters_used = []
    links_added = 0

    # Determine priority order based on role_category
    cluster_order = ['general']  # Always include general
    if role_category:
        role_upper = role_category.upper()
        if role_upper in KEYWORD_CLUSTERS:
            cluster_order.insert(0, role_upper)
        elif 'CFO' in role_upper or 'FINANCE' in role_upper:
            cluster_order.insert(0, 'CFO')
        elif 'CMO' in role_upper or 'MARKET' in role_upper:
            cluster_order.insert(0, 'CMO')
        elif 'CTO' in role_upper or 'TECH' in role_upper:
            cluster_order.insert(0, 'CTO')
        elif 'COO' in role_upper or 'OPERATION' in role_upper:
            cluster_order.insert(0, 'COO')

    # Add remaining clusters
    for cluster in ['CFO', 'CMO', 'CTO', 'COO']:
        if cluster not in cluster_order:
            cluster_order.append(cluster)

    # Apply links - max 3 clusters, one link per cluster
    max_links = 3
    result = text

    for cluster_name in cluster_order:
        if links_added >= max_links:
            break

        cluster = KEYWORD_CLUSTERS.get(cluster_name)
        if not cluster:
            continue

        # Try each pattern until one matches
        for pattern, replacement in cluster['patterns']:
            # Case insensitive matching
            match = re.search(pattern, result, re.IGNORECASE)
            if match:
                # Only replace the first occurrence
                result = re.sub(pattern, replacement, result, count=1, flags=re.IGNORECASE)
                clusters_used.append(cluster_name)
                links_added += 1
                break  # Move to next cluster

    return result, links_added, clusters_used


def get_db_connection():
    """Get database connection"""
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        raise ValueError("DATABASE_URL environment variable not set")
    return psycopg2.connect(database_url)


def fetch_jobs_without_links(conn, limit: int = 100) -> list[dict]:
    """Fetch jobs that don't have internal links yet"""
    with conn.cursor(cursor_factory=RealDictCursor) as cur:
        cur.execute("""
            SELECT id, title, company_name, role_category, full_description
            FROM jobs
            WHERE is_active = true
            AND full_description IS NOT NULL
            AND full_description != ''
            AND full_description NOT LIKE '%%](/fractional-jobs%%'
            ORDER BY posted_date DESC NULLS LAST
            LIMIT %s
        """, (limit,))
        return [dict(row) for row in cur.fetchall()]


def update_job_description(conn, job_id: str, new_description: str):
    """Update job with linked description"""
    with conn.cursor() as cur:
        cur.execute("""
            UPDATE jobs
            SET full_description = %s,
                updated_date = NOW()
            WHERE id = %s
        """, (new_description, job_id))


def process_jobs(limit: int = 100, dry_run: bool = False):
    """Main processing function"""
    conn = get_db_connection()

    try:
        jobs = fetch_jobs_without_links(conn, limit)
        print(f"Found {len(jobs)} jobs without internal links")

        if not jobs:
            print("No jobs to process!")
            return

        print(f"\n{'='*60}")
        print(f"ADDING INTERNAL SEO LINKS (Simple Regex)")
        print(f"{'='*60}\n")

        success_count = 0
        no_match_count = 0

        for i, job in enumerate(jobs):
            print(f"\n[{i+1}/{len(jobs)}] {job['title'][:50]}")
            print(f"    Category: {job.get('role_category', 'N/A')}")

            updated_text, links_added, clusters = add_links_to_description(
                job['full_description'],
                job.get('role_category')
            )

            if links_added > 0:
                if not dry_run:
                    update_job_description(conn, job['id'], updated_text)
                    conn.commit()
                print(f"    ✓ Added {links_added} links: {', '.join(clusters)}")
                success_count += 1
            else:
                print(f"    ⏭ No matching keywords found")
                no_match_count += 1

        print(f"\n{'='*60}")
        print(f"COMPLETE: {success_count} updated, {no_match_count} no matches")
        if dry_run:
            print("(DRY RUN - no changes saved)")
        print(f"{'='*60}\n")

    finally:
        conn.close()


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description='Add internal SEO links to job descriptions (simple regex)')
    parser.add_argument('--limit', type=int, default=100, help='Number of jobs to process')
    parser.add_argument('--dry-run', action='store_true', help='Preview changes without saving')
    parser.add_argument('--all', action='store_true', help='Process up to 10000 jobs')

    args = parser.parse_args()

    limit = 10000 if args.all else args.limit

    print(f"\nStarting Internal Link Addition (Simple Regex)...")
    print(f"Limit: {limit}")
    print(f"Dry run: {args.dry_run}")

    process_jobs(limit=limit, dry_run=args.dry_run)
