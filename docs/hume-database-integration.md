# Hume EVI + Neon Database Integration - Complete Guide

## Overview

This document explains how we connected Hume's voice assistant (Quest) to our Neon PostgreSQL database, allowing users to ask about jobs and get real results from our database.

---

## The Problem We Solved

We wanted Quest (our Hume voice assistant) to:
1. Know the user's name and profile when they start talking
2. Search our jobs database when users ask "find me CFO jobs"
3. Return actual job listings with clickable links

---

## Architecture

```
User speaks → Hume EVI → Calls our Tool API → Queries Neon → Returns to Hume → Speaks results
     ↑                                                                              ↓
     └──────────────────── Session Variables (name, location, etc.) ───────────────┘
```

### Two Mechanisms:

1. **Session Variables** - Data passed AT CONNECTION TIME
   - User's name, location, interests, budget
   - Hume uses `{{variable_name}}` in system prompt
   - Immediate personalization, no database call needed

2. **Tools** - Functions Hume can CALL DURING conversation
   - `search_jobs`, `get_user_profile`, `save_user_preference`
   - Hume sends HTTP POST to our `/api/hume-tool` endpoint
   - We query Neon and return results

---

## What We Got Wrong (Lessons Learned)

### 1. SDK Version Issue
**Problem:** Voice cut off immediately after greeting with "Received unknown message type" error
**Cause:** Using `@humeai/voice-react` version 0.2.0 (outdated)
**Fix:** Updated to version 0.2.11+
```json
"@humeai/voice-react": "^0.2.11"
```

### 2. Missing `user_id` in Session Variables
**Problem:** Tools returned "No user ID provided"
**Cause:** We passed `first_name`, `current_country`, etc. but forgot `user_id`
**Fix:** Added `user_id` to session variables:
```typescript
const vars = {
  user_id: userId || '',  // ← This was missing!
  first_name: profile?.first_name || '',
  // ...
}
```

### 3. Wrong Table Name Assumption
**Problem:** Thought there was a `user_profile` table
**Cause:** Legacy code references
**Fix:** Confirmed the table is just `users` - all profile data lives there

### 4. Empty Profile Data
**Problem:** Hume knew user as "Dan" (from Stack Auth) not "Tony" (from Neon)
**Cause:** The `users` table row for `dan@rainmakrr.com` had NULL `first_name`
**Fix:** Updated the database record:
```sql
UPDATE users SET first_name = 'Dan', last_name = 'Keegan'
WHERE email = 'dan@rainmakrr.com'
```

### 5. Job Links Using ID Instead of Slug
**Problem:** Links like `/job/uuid-here` didn't work
**Cause:** Job detail page uses `slug` for SEO-friendly URLs
**Fix:** Updated tool to return slug-based URLs:
```typescript
if (j.slug) desc += ` - View at fractional.quest/job/${j.slug}`
```

### 6. Hume Tool JSON Format
**Problem:** "Invalid JSON" when configuring tools in Hume dashboard
**Cause:** Wrong property order in JSON schema
**Fix:** `required` must come BEFORE `properties`:
```json
{
  "type": "object",
  "required": [],
  "properties": { ... }
}
```

---

## What We Got Right

### 1. Clean Separation of Concerns
- `/api/hume-token` - Just fetches OAuth token
- `/api/hume-tool` - Handles ALL tool calls with switch statement
- `/api/user-profile` - Profile CRUD operations
- `/api/hume-webhook` - Saves conversations after they end

### 2. Session Variables for Instant Personalization
Instead of calling a tool to get the user's name (slow), we pass it at connection:
```typescript
await connect({
  auth: { type: 'accessToken', value: token },
  configId: CONFIG_ID,
  sessionSettings: {
    type: 'session_settings',
    variables: {
      user_id: userId,
      first_name: profile.first_name,
      current_country: profile.current_country,
      // ...
    }
  }
})
```

### 3. Hume System Prompt with Variables
```
<user_context>
Name: {{first_name}} {{last_name}}
User ID: {{user_id}}
Location: {{current_country}}
</user_context>
```

### 4. Tool Response Format
Hume expects this exact format:
```typescript
return NextResponse.json({
  type: 'tool_response',
  tool_call_id: body.tool_call_id,
  content: "Your string result here"
})
```

---

## Key Files

| File | Purpose |
|------|---------|
| `app/repo/page.tsx` | Main voice interface (production) |
| `app/api/hume-token/route.ts` | OAuth token endpoint |
| `app/api/hume-tool/route.ts` | Tool execution endpoint |
| `app/api/hume-webhook/route.ts` | Post-conversation webhook |
| `app/api/user-profile/route.ts` | Profile API |
| `lib/user-profiles.ts` | Database queries for users |
| `components/HumeWidget.tsx` | Reusable voice component |

---

## Hume Dashboard Configuration

### Config ID: `d57ceb71-4cf5-47e9-87cd-6052445a031c`

### System Prompt:
```
<role>
You are Quest, an empathetic career advisor for Fractional.Quest.
</role>

<user_context>
Name: {{first_name}} {{last_name}}
User ID: {{user_id}}
Authenticated: {{is_authenticated}}
Location: {{current_country}}
Interests: {{interests}}
Timeline: {{timeline}}
Day Rate: {{budget}}
</user_context>

<tools>
When user asks about jobs, use the search_jobs tool.
When user shares preferences, use save_user_preference tool.
</tools>
```

### Tool: search_jobs
```json
{
  "name": "search_jobs",
  "description": "Search for fractional executive jobs",
  "parameters": {
    "type": "object",
    "required": [],
    "properties": {
      "role_type": {
        "type": "string",
        "description": "Job role type like CFO, CMO, CTO"
      },
      "location": {
        "type": "string",
        "description": "Location like London, Manchester, Remote"
      }
    }
  }
}
```

Tool URL: `https://fractional.quest/api/hume-tool`

---

## Environment Variables Required

```env
HUME_API_KEY=your_api_key
HUME_SECRET_KEY=your_secret_key
DATABASE_URL=postgresql://...
```

---

## Testing Checklist

1. [ ] Go to `/repo` - should see "Hi [Name]"
2. [ ] Click mic, say "Hello" - Quest should greet you by name
3. [ ] Ask "What CFO jobs are available?" - should call search_jobs tool
4. [ ] Check response includes job titles and `fractional.quest/job/...` links
5. [ ] Click a job link - should load job detail page

---

## Flow Diagram

```
1. User loads /repo
   ↓
2. Page fetches:
   - Hume token from /api/hume-token
   - User profile from /api/user-profile (queries Neon `users` table)
   ↓
3. User clicks "Speak"
   ↓
4. Connect to Hume with session variables:
   { user_id, first_name, current_country, interests, timeline, budget }
   ↓
5. Hume greets user using {{first_name}} from system prompt
   ↓
6. User asks "Find me CFO jobs in London"
   ↓
7. Hume calls search_jobs tool → POST /api/hume-tool
   ↓
8. Tool queries Neon: SELECT ... FROM jobs WHERE ...
   ↓
9. Returns: "Found 3 roles: Fractional CFO at X - fractional.quest/job/slug"
   ↓
10. Hume speaks the results to user
```

---

## Restart Prompt for Future Sessions

```
I'm working on fractional.quest, a Next.js 14 app with Hume EVI voice integration.

Key context:
- Hume voice assistant "Quest" connects to our Neon PostgreSQL database
- Users talk to Quest at /repo to build their professional profile
- Quest can search jobs via tools that call /api/hume-tool

The integration works via:
1. Session variables (passed at connect) - for instant personalization
2. Tools (called during conversation) - for database queries

Key files:
- app/repo/page.tsx - Main voice interface
- app/api/hume-tool/route.ts - Tool endpoint (search_jobs, get_user_profile, etc.)
- app/api/hume-webhook/route.ts - Saves conversations to Neon

Hume Config ID: d57ceb71-4cf5-47e9-87cd-6052445a031c
SDK: @humeai/voice-react v0.2.11

Database: Neon PostgreSQL
- `users` table has profile data (first_name, current_country, etc.)
- `jobs` table has job listings with `slug` for URLs

Documentation: docs/hume-voice-integration.md, docs/hume-database-integration.md
```
