#!/usr/bin/env python3
"""
Add Internal Links to Existing Jobs

Retrospectively adds SEO internal links to all job descriptions.
Uses Pydantic AI to intelligently insert links without disrupting flow.
"""

import os
import asyncio
from typing import Optional

import psycopg2
from psycopg2.extras import RealDictCursor
from pydantic import BaseModel, Field
from pydantic_ai import Agent

from dotenv import load_dotenv
# Load .env.local first, then .env
load_dotenv('.env.local')
load_dotenv()


class LinkedDescription(BaseModel):
    """Job description with internal links added"""

    updated_description: str = Field(description="""
        The job description with 2-4 internal SEO links added naturally.

        KEYWORD CLUSTERS (pick ONE phrase per cluster, max ONE link per cluster):

        - CFO cluster → /fractional-jobs?role=CFO
          Anchor text: "fractional CFO", "fractional CFO jobs", "CFO roles",
          "part-time CFO", "fractional finance director", "CFO opportunities"

        - CMO cluster → /fractional-jobs?role=CMO
          Anchor text: "fractional CMO", "fractional CMO jobs", "CMO roles",
          "part-time CMO", "fractional marketing director", "CMO opportunities"

        - CTO cluster → /fractional-jobs?role=CTO
          Anchor text: "fractional CTO", "fractional CTO jobs", "CTO roles",
          "part-time CTO", "fractional tech director", "CTO opportunities"

        - COO cluster → /fractional-jobs?role=COO
          Anchor text: "fractional COO", "fractional COO jobs", "COO roles",
          "part-time COO", "fractional operations director", "COO opportunities"

        - General fractional → /fractional-jobs
          Anchor text: "fractional jobs", "fractional roles", "fractional executive",
          "part-time executive", "portfolio career", "fractional opportunities"

        RULES:
        1. Maximum ONE link per keyword cluster (no duplicates)
        2. Choose anchor text that fits naturally in the sentence
        3. Prioritize the cluster matching the job's role (CFO job = CFO cluster first)
        4. Add 1-2 related clusters if they fit naturally
        5. Links must read smoothly - preserve the editorial flow
        6. Use markdown format: [anchor text](url)
        7. Do NOT add links to existing linked text
        8. Keep all existing content and formatting intact

        Example transformation:
        Before: "This fractional CFO opportunity offers strategic impact for finance leaders."
        After: "This [fractional CFO](/fractional-jobs?role=CFO) opportunity offers strategic impact for finance leaders."
    """)

    links_added: int = Field(description="Number of internal links added (should be 2-4)")

    clusters_used: list[str] = Field(description="Which keyword clusters were linked (e.g., ['CFO', 'general'])")


# Create the agent - prefer Google Gemini (most reliable)
# Order: Google Gemini > Anthropic Claude > OpenAI
def get_model():
    if os.environ.get('GOOGLE_API_KEY'):
        return 'google-gla:gemini-2.0-flash'
    elif os.environ.get('ANTHROPIC_API_KEY'):
        return 'anthropic:claude-3-haiku-20240307'
    elif os.environ.get('OPENAI_API_KEY') and not os.environ.get('OPENAI_API_KEY', '').startswith('sk-proj-placeholder'):
        return 'openai:gpt-4o-mini'
    else:
        raise ValueError("No valid API key found. Set GOOGLE_API_KEY, ANTHROPIC_API_KEY, or OPENAI_API_KEY")

model_name = get_model()
print(f"Using model: {model_name}")

agent = Agent(
    model_name,
    output_type=LinkedDescription,
    system_prompt="""You are an SEO specialist adding internal links to job descriptions.

Your task: Add 2-4 internal links to the job description WITHOUT changing any other content.

CRITICAL RULES:
1. Preserve ALL existing text exactly - only add markdown link syntax around phrases
2. Each keyword cluster can only be linked ONCE (no duplicate clusters)
3. Links must feel natural and editorial, not forced
4. Use varied anchor text that fits the sentence context
5. Prioritize the cluster that matches the job's role category
6. If the text already has markdown links, don't add more to the same cluster

Keyword clusters and their URLs:
- CFO → /fractional-jobs?role=CFO
- CMO → /fractional-jobs?role=CMO
- CTO → /fractional-jobs?role=CTO
- COO → /fractional-jobs?role=COO
- General → /fractional-jobs

Choose natural anchor text variations like:
- "fractional CFO", "CFO roles", "fractional finance leadership"
- "fractional CMO", "CMO opportunities", "marketing leadership roles"
- "fractional jobs", "portfolio career", "fractional executive"
"""
)


def get_db_connection():
    """Get database connection"""
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        raise ValueError("DATABASE_URL environment variable not set")
    return psycopg2.connect(database_url)


def fetch_jobs_without_links(conn, limit: int = 100) -> list[dict]:
    """Fetch jobs that don't have internal links yet"""
    with conn.cursor(cursor_factory=RealDictCursor) as cur:
        # Find jobs without markdown links in description
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


def fetch_all_jobs(conn, limit: int = 1000) -> list[dict]:
    """Fetch all active jobs for processing"""
    with conn.cursor(cursor_factory=RealDictCursor) as cur:
        cur.execute("""
            SELECT id, title, company_name, role_category, full_description
            FROM jobs
            WHERE is_active = true
            AND full_description IS NOT NULL
            AND full_description != ''
            ORDER BY posted_date DESC NULLS LAST
            LIMIT %s
        """, (limit,))
        return [dict(row) for row in cur.fetchall()]


async def add_links_to_job(job: dict) -> Optional[LinkedDescription]:
    """Add internal links to a single job description"""

    context = f"""
Job Title: {job['title']}
Company: {job['company_name']}
Role Category: {job.get('role_category', 'Not specified')}

Current Description:
{job['full_description']}

Add 2-4 internal links using markdown format. Prioritize the {job.get('role_category', 'general')} cluster if relevant.
"""

    try:
        result = await agent.run(context)
        return result.output
    except Exception as e:
        error_str = str(e)
        print(f"    Error: {error_str[:200]}")
        if 'invalid_api_key' in error_str.lower() or 'authentication' in error_str.lower():
            print("    ⚠️  API key issue detected!")
        return None


def update_job_description(conn, job_id: str, new_description: str):
    """Update job with linked description"""
    with conn.cursor() as cur:
        cur.execute("""
            UPDATE jobs
            SET full_description = %s,
                updated_date = NOW()
            WHERE id = %s
        """, (new_description, job_id))


async def process_jobs(limit: int = 100, force_all: bool = False):
    """Main processing function"""
    conn = get_db_connection()

    try:
        # Fetch jobs
        if force_all:
            jobs = fetch_all_jobs(conn, limit)
            print(f"Processing ALL {len(jobs)} jobs (including those with existing links)")
        else:
            jobs = fetch_jobs_without_links(conn, limit)
            print(f"Found {len(jobs)} jobs without internal links")

        if not jobs:
            print("No jobs to process!")
            return

        print(f"\n{'='*60}")
        print(f"ADDING INTERNAL SEO LINKS TO JOB DESCRIPTIONS")
        print(f"{'='*60}\n")

        success_count = 0
        error_count = 0

        for i, job in enumerate(jobs):
            print(f"\n[{i+1}/{len(jobs)}] {job['title'][:50]}")
            print(f"    Company: {job['company_name'][:30] if job['company_name'] else 'Unknown'}")
            print(f"    Category: {job.get('role_category', 'N/A')}")

            # Skip if already has links and not forcing
            if not force_all and '](/fractional-jobs' in (job['full_description'] or ''):
                print(f"    ⏭ Already has links, skipping")
                continue

            result = await add_links_to_job(job)

            if result:
                # Verify links were actually added
                if '](/fractional-jobs' in result.updated_description:
                    update_job_description(conn, job['id'], result.updated_description)
                    conn.commit()
                    print(f"    ✓ Added {result.links_added} links: {', '.join(result.clusters_used)}")
                    success_count += 1
                else:
                    print(f"    ⚠ No links in output, skipping update")
                    error_count += 1
            else:
                error_count += 1

            # Rate limiting
            await asyncio.sleep(0.5)

        print(f"\n{'='*60}")
        print(f"COMPLETE: {success_count} updated, {error_count} errors/skipped")
        print(f"{'='*60}\n")

    finally:
        conn.close()


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description='Add internal SEO links to job descriptions')
    parser.add_argument('--limit', type=int, default=100, help='Number of jobs to process')
    parser.add_argument('--all', action='store_true', help='Process all jobs, even those with existing links')
    parser.add_argument('--force', action='store_true', help='Force reprocess all jobs (same as --all)')

    args = parser.parse_args()

    print(f"\nStarting Internal Link Addition...")
    print(f"Limit: {args.limit}")
    print(f"Force all: {args.all or args.force}")

    asyncio.run(process_jobs(limit=args.limit, force_all=args.all or args.force))
