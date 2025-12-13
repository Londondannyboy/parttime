#!/usr/bin/env python3
"""
Pydantic AI Job Classification Script

ETL Pipeline:
1. Read from raw_jobs table (staging)
2. Process with Pydantic AI to extract and structure
3. Update structured jobs table
4. Mark raw_jobs as processed

Every job gets the full Condé Nast editorial treatment.
"""

import os
import json
import asyncio
import httpx
from datetime import datetime
from typing import Optional

import psycopg2
from psycopg2.extras import RealDictCursor
from pydantic import BaseModel, Field
from pydantic_ai import Agent

# ZEP sync configuration
ZEP_SYNC_ENABLED = os.environ.get('ZEP_SYNC_ENABLED', 'true').lower() == 'true'
API_BASE_URL = os.environ.get('API_BASE_URL', 'https://fractional.quest')
REVALIDATE_SECRET = os.environ.get('REVALIDATE_SECRET', '')

# Load environment variables
from dotenv import load_dotenv
load_dotenv()


class StructuredJob(BaseModel):
    """Structured job data extracted and enhanced by AI"""

    # Classification
    employment_type: str = Field(description="One of: full-time, part-time, fractional, contract, interim")
    is_fractional: bool = Field(description="True if this is a fractional/part-time executive role")
    days_per_week: Optional[str] = Field(default=None, description="e.g., '2-3 days', '1 day' - only for fractional/part-time roles")

    # Location
    country: str = Field(description="Normalized country name, e.g., 'United Kingdom', 'United States'")
    city: Optional[str] = Field(default=None, description="Primary city, e.g., 'London', 'Manchester'")
    is_remote: bool = Field(description="True if remote work is available")

    # Categorization
    vertical: str = Field(description="Industry vertical: Technology, Finance, Healthcare, Professional Services, E-commerce, Manufacturing, Recruitment, Consulting, Media, Retail, etc.")
    seniority_level: str = Field(description="One of: Executive, Senior, Mid-Senior, Associate, Entry")
    role_category: str = Field(description="MUST be one of these exact values: CFO, CMO, CTO, COO, HR, Sales, Other. Map finance/accounting roles to CFO, marketing roles to CMO, technology/engineering roles to CTO, operations/project roles to COO, people/HR roles to HR, business development/sales roles to Sales. Use 'Other' only if no category fits.")

    # Compensation
    salary_min: Optional[int] = Field(default=None, description="Minimum salary/day rate as integer (no currency symbol)")
    salary_max: Optional[int] = Field(default=None, description="Maximum salary/day rate as integer (no currency symbol)")
    salary_currency: str = Field(default="GBP", description="Currency code: GBP, USD, EUR")
    salary_type: str = Field(default="daily", description="One of: daily, annual, hourly")

    # Editorial Content
    summary: str = Field(description="""
        Compelling 2-3 sentence summary that sells the opportunity.
        Editorial voice - sophisticated, exciting but professional.
        This appears at the top of the job listing as the hook.
        ~50-80 words.
    """)

    opportunity_description: str = Field(description="""
        Rewrite the job description in Condé Nast editorial style.
        Frame it as an exciting career opportunity.
        Use engaging, dynamic language. Active voice.
        Structure with clear paragraphs (2-4 paragraphs).
        ~200-400 words.
        Do NOT use bullet points - flowing prose only.
        Highlight what makes this role special.
        For fractional roles, emphasize flexibility and strategic impact.

        IMPORTANT - Internal Linking for SEO:
        Naturally weave 2-4 internal links into the prose using markdown format.

        KEYWORD CLUSTERS (each links to a DIFFERENT dedicated page):
        - CFO cluster → /fractional-cfo-jobs-uk
          Link text variations: "fractional CFO", "fractional CFO jobs", "CFO roles",
          "part-time CFO", "fractional finance director", "CFO opportunities"

        - CMO cluster → /fractional-cmo-jobs-uk
          Link text variations: "fractional CMO", "fractional CMO jobs", "CMO roles",
          "part-time CMO", "fractional marketing director", "CMO opportunities"

        - CTO cluster → /fractional-cto-jobs-uk
          Link text variations: "fractional CTO", "fractional CTO jobs", "CTO roles",
          "part-time CTO", "fractional tech director", "CTO opportunities"

        - COO cluster → /fractional-coo-jobs-uk
          Link text variations: "fractional COO", "fractional COO jobs", "COO roles",
          "part-time COO", "fractional operations director", "COO opportunities"

        - General fractional → /fractional-jobs
          Link text variations: "fractional jobs", "fractional roles", "fractional executive",
          "part-time executive", "portfolio career", "fractional opportunities"

        RULES:
        1. ONE link per keyword cluster maximum (no repeats of same cluster)
        2. CRITICAL: Each URL must be UNIQUE - never link to the same URL twice!
           - If you use /fractional-jobs once, you CANNOT use it again
           - If you use /fractional-jobs?role=CFO once, you CANNOT use it again
        3. Use the most natural phrase that fits the sentence
        4. Prioritize the cluster that matches the job's role_category
        5. Add 1-2 DIFFERENT role clusters (CFO, CMO, CTO, COO) if they fit naturally
        6. Links must read smoothly - don't force them

        Example: "This [fractional CFO](/fractional-jobs?role=CFO) opportunity is ideal for
        executives exploring [portfolio careers](/fractional-jobs)."

        BAD (duplicate URL): "[fractional opportunities](/fractional-jobs)...[portfolio career](/fractional-jobs)"
        GOOD (unique URLs): "[fractional CFO](/fractional-jobs?role=CFO)...[portfolio career](/fractional-jobs)"
    """)

    responsibilities: list[str] = Field(description="""
        5-8 key responsibilities as clear, action-oriented bullet points.
        Start each with a strong verb (Lead, Drive, Build, Develop, etc.).
        Be specific and impactful.
        Each should be one clear sentence.
    """)

    requirements: list[str] = Field(description="""
        5-8 key requirements/qualifications as clear bullet points.
        Mix of experience, skills, and qualities.
        Be specific where possible (e.g., "10+ years" not "extensive experience").
    """)

    benefits: list[str] = Field(default_factory=list, description="""
        Benefits/perks if mentioned. Empty list if none specified.
        Include things like: flexible working, equity, day rate, remote options.
    """)

    skills_required: list[str] = Field(description="""
        10-15 key skills extracted from the description.
        Mix of technical and soft skills.
        Single words or short phrases (2-3 words max).
        Examples: 'Financial Modelling', 'Stakeholder Management', 'M&A', 'Board Reporting'
    """)

    about_company: Optional[str] = Field(default=None, description="""
        2-3 sentences about the company if information is available.
        Editorial style - make them sound interesting.
        Include industry, stage, and any notable facts.
    """)


# Create the Pydantic AI agent using Google Gemini
# Set GEMINI_API_KEY or GOOGLE_API_KEY in environment
agent = Agent(
    'google-gla:gemini-2.0-flash',
    output_type=StructuredJob,
    system_prompt="""You are the senior content editor for Fractional.Quest, the UK's premier platform for fractional executive opportunities.

Your role is to transform raw job postings into beautifully crafted, editorially polished listings that attract top-tier fractional talent.

## Editorial Style Guide

**Voice & Tone:**
- Condé Nast meets Bloomberg - sophisticated, authoritative, yet accessible
- Confident and aspirational without being hyperbolic
- Professional but never stuffy or corporate
- British English spelling and conventions

**Content Principles:**
- Frame every role as an exciting opportunity, not just a job
- Emphasize strategic impact and meaningful work
- For fractional roles, highlight flexibility as a feature, not a limitation
- Be specific and concrete - avoid vague corporate speak
- Use active voice and dynamic verbs

**When Extracting Data:**
- Parse compensation carefully: look for £, $, €, "per day", "daily", "p/d", "per annum", "pa", etc.
- Fractional indicators: "fractional", "part-time", "2-3 days", "days per week", "portfolio", etc.
- Extract skills throughout the description, not just from requirements
- Normalize locations properly (London, not "London, England, United Kingdom")
- Identify the true seniority - "Fractional CFO" is Executive level

**CRITICAL - Role Category Classification:**
role_category MUST be exactly one of: CFO, CMO, CTO, COO, HR, Sales, Other
- CFO: Finance Directors, Financial Controllers, Accounting, Treasury, FP&A
- CMO: Marketing Directors, Brand, Growth, Demand Gen, Communications
- CTO: Tech Directors, Engineering Leads, AI/ML, Product Tech, VP Engineering
- COO: Operations Directors, Project/Programme Managers, Chief of Staff, MD
- HR: People Directors, Talent, L&D, HR Business Partners
- Sales: Sales Directors, Revenue, Business Development, Partnerships
- Other: Only if nothing else fits (rare)

**Quality Standards:**
- Every listing should read like it belongs in a premium publication
- The summary should make talented executives want to learn more
- The opportunity_description should paint a compelling picture
- Responsibilities and requirements should be crisp and scannable

**Internal Linking Strategy (SEO Critical):**
The opportunity_description MUST include 2-4 internal links for SEO strength.
Use markdown: [link text](url)

Available DEDICATED PAGES (each is a truly different page - use each ONLY ONCE):
- /fractional-cfo-jobs-uk (fractional CFO, CFO jobs, part-time CFO, finance director)
- /fractional-cmo-jobs-uk (fractional CMO, CMO jobs, marketing director)
- /fractional-cto-jobs-uk (fractional CTO, CTO jobs, tech director)
- /fractional-coo-jobs-uk (fractional COO, COO jobs, operations director)
- /fractional-jobs (fractional jobs, fractional roles, portfolio career, part-time executive)

CRITICAL RULES:
1. NEVER link to the same URL twice - Google penalizes duplicate internal links
2. Use 2-4 DIFFERENT dedicated pages per description
3. Prioritize the role-specific page matching the job category
4. Vary anchor text naturally

Remember: You're not just extracting data - you're crafting content that represents our brand.
"""
)


def get_db_connection():
    """Get database connection"""
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        raise ValueError("DATABASE_URL environment variable not set")
    return psycopg2.connect(database_url)


def fetch_pending_raw_jobs(conn, limit: int = 10, source: str = None) -> list[dict]:
    """Fetch raw jobs pending classification"""
    with conn.cursor(cursor_factory=RealDictCursor) as cur:
        if source:
            cur.execute("""
                SELECT r.id as raw_id, r.source, r.source_id, r.raw_data, r.job_id,
                       j.title, j.company_name, j.location, j.full_description,
                       j.employment_type, j.seniority_level, j.compensation
                FROM raw_jobs r
                LEFT JOIN jobs j ON r.job_id = j.id
                WHERE r.processing_status = 'pending'
                AND r.source = %s
                ORDER BY r.received_at DESC
                LIMIT %s
            """, (source, limit))
        else:
            cur.execute("""
                SELECT r.id as raw_id, r.source, r.source_id, r.raw_data, r.job_id,
                       j.title, j.company_name, j.location, j.full_description,
                       j.employment_type, j.seniority_level, j.compensation
                FROM raw_jobs r
                LEFT JOIN jobs j ON r.job_id = j.id
                WHERE r.processing_status = 'pending'
                ORDER BY r.received_at DESC
                LIMIT %s
            """, (limit,))
        return [dict(row) for row in cur.fetchall()]


async def classify_job(raw_job: dict) -> StructuredJob:
    """Classify a single job using Pydantic AI"""

    raw_data = raw_job.get('raw_data', {})
    if isinstance(raw_data, str):
        raw_data = json.loads(raw_data)

    # Build comprehensive context
    context = f"""
## Job Details

**Title:** {raw_job.get('title') or raw_data.get('job_title', 'Unknown')}
**Company:** {raw_job.get('company_name') or raw_data.get('company_name', 'Unknown')}
**Location:** {raw_job.get('location') or raw_data.get('location', 'Unknown')}
**Employment Type:** {raw_job.get('employment_type') or raw_data.get('employment_type', 'Unknown')}
**Seniority:** {raw_job.get('seniority_level') or raw_data.get('seniority_level', 'Unknown')}
**Compensation:** {raw_job.get('compensation') or raw_data.get('salary_range', 'Not specified')}
**Industry/Function:** {raw_data.get('job_function', 'Unknown')} / {raw_data.get('industries', 'Unknown')}

## Full Job Description

{raw_job.get('full_description') or raw_data.get('job_description', 'No description available')}

## Additional Context

- Posted: {raw_data.get('time_posted', 'Unknown')}
- Applicants: {raw_data.get('num_applicants', 'Unknown')}
- Easy Apply: {raw_data.get('easy_apply', 'Unknown')}
- Source: {raw_job.get('source', 'Unknown')}
"""

    result = await agent.run(f"Please analyze and structure this job posting into our editorial format:\n\n{context}")
    return result.output


def update_structured_job(conn, job_id: str, structured: StructuredJob):
    """Update the jobs table with AI-structured data"""
    with conn.cursor() as cur:
        cur.execute("""
            UPDATE jobs SET
                employment_type = %s,
                is_fractional = %s,
                hours_per_week = %s,
                is_remote = %s,
                seniority_level = %s,
                role_category = %s,
                salary_min = %s,
                salary_max = %s,
                salary_currency = %s,
                description_snippet = %s,
                full_description = %s,
                responsibilities = %s,
                requirements = %s,
                benefits = %s,
                skills_required = %s,
                about_company = %s,
                classification_confidence = 1.0,
                classification_reasoning = %s,
                updated_date = NOW()
            WHERE id = %s
        """, (
            structured.employment_type,
            structured.is_fractional,
            structured.days_per_week,
            structured.is_remote,
            structured.seniority_level,
            structured.role_category,
            structured.salary_min,
            structured.salary_max,
            structured.salary_currency,
            structured.summary,
            structured.opportunity_description,
            structured.responsibilities,
            structured.requirements,
            structured.benefits,
            structured.skills_required,
            structured.about_company,
            f"Pydantic AI - Vertical: {structured.vertical}, City: {structured.city}, Country: {structured.country}",
            job_id
        ))


def mark_raw_job_processed(conn, raw_id: str, status: str = 'processed', error: str = None):
    """Update raw_jobs status after processing"""
    with conn.cursor() as cur:
        cur.execute("""
            UPDATE raw_jobs SET
                processing_status = %s,
                processed_at = NOW(),
                processing_error = %s
            WHERE id = %s
        """, (status, error, raw_id))


async def sync_job_to_zep(job_id: str, structured: StructuredJob, title: str, company: str, location: str) -> bool:
    """Sync a processed job to ZEP knowledge graph via API"""
    if not ZEP_SYNC_ENABLED:
        return True  # Skip but don't fail

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{API_BASE_URL}/api/graph/jobs",
                json={
                    "action": "sync-one",
                    "jobId": job_id,
                },
                headers={
                    "Authorization": f"Bearer {REVALIDATE_SECRET}",
                    "Content-Type": "application/json",
                },
                timeout=30.0,
            )

            if response.status_code == 200:
                return True
            else:
                print(f"    ⚠ ZEP sync failed: {response.status_code}")
                return False
    except Exception as e:
        print(f"    ⚠ ZEP sync error: {str(e)[:50]}")
        return False


async def process_jobs(limit: int = 10, source: str = None):
    """Main processing function"""
    conn = get_db_connection()

    try:
        jobs = fetch_pending_raw_jobs(conn, limit, source)
        print(f"\n{'='*60}")
        print(f"PYDANTIC AI JOB CLASSIFICATION")
        print(f"{'='*60}")
        print(f"Found {len(jobs)} pending jobs to classify")
        print(f"{'='*60}\n")

        success_count = 0
        error_count = 0

        for i, job in enumerate(jobs):
            title = job.get('title') or job.get('raw_data', {}).get('job_title', 'Unknown')
            company = job.get('company_name') or job.get('raw_data', {}).get('company_name', 'Unknown')

            print(f"\n[{i+1}/{len(jobs)}] {title}")
            print(f"    Company: {company}")
            print(f"    Source: {job['source']}")

            try:
                # Classify with Pydantic AI
                structured = await classify_job(job)

                # Update the structured jobs table
                if job['job_id']:
                    update_structured_job(conn, job['job_id'], structured)

                    # Sync to ZEP knowledge graph
                    zep_synced = await sync_job_to_zep(
                        job['job_id'], structured, title, company,
                        structured.city or job.get('location', 'UK')
                    )
                    if zep_synced:
                        print(f"    ✓ Synced to ZEP graph")

                # Mark as processed
                mark_raw_job_processed(conn, job['raw_id'], 'processed')
                conn.commit()

                # Print summary
                print(f"    ✓ Type: {structured.employment_type} {'(Fractional)' if structured.is_fractional else ''}")
                print(f"    ✓ Location: {structured.city or 'Unknown'}, {structured.country} {'🌐' if structured.is_remote else ''}")
                print(f"    ✓ Vertical: {structured.vertical}")
                print(f"    ✓ Level: {structured.seniority_level}")
                if structured.salary_min or structured.salary_max:
                    print(f"    ✓ Comp: {structured.salary_currency}{structured.salary_min or '?'}-{structured.salary_max or '?'} ({structured.salary_type})")
                print(f"    ✓ Skills: {len(structured.skills_required)} extracted")
                print(f"    ✓ Summary: {structured.summary[:80]}...")

                success_count += 1

            except Exception as e:
                print(f"    ✗ Error: {str(e)[:100]}")
                mark_raw_job_processed(conn, job['raw_id'], 'error', str(e))
                conn.commit()
                error_count += 1
                continue

        print(f"\n{'='*60}")
        print(f"COMPLETE: {success_count} processed, {error_count} errors")
        print(f"{'='*60}\n")

    finally:
        conn.close()


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description='Classify jobs using Pydantic AI')
    parser.add_argument('--limit', type=int, default=10, help='Number of jobs to process')
    parser.add_argument('--source', type=str, help='Filter by source (e.g., linkedin, greenhouse)')
    parser.add_argument('--all', action='store_true', help='Process all pending jobs')

    args = parser.parse_args()

    limit = 1000 if args.all else args.limit

    print(f"\nStarting Pydantic AI Job Classification...")
    print(f"Limit: {limit}, Source: {args.source or 'all'}")

    asyncio.run(process_jobs(limit=limit, source=args.source))
