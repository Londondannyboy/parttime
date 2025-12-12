import { createDbQuery } from './db'

// User profile from the main `users` table
export interface UserProfile {
  id: string
  neon_auth_id: string
  email: string | null
  first_name: string | null
  last_name: string | null
  current_country: string | null
  destination_countries: string[] | null
  budget_monthly: number | null
  timeline: string | null
  interests: string[] | null
  created_at: Date
  updated_at: Date
}

export async function getUserProfile(stackUserId: string): Promise<UserProfile | null> {
  const sql = createDbQuery()
  const results = await sql`
    SELECT
      id,
      neon_auth_id,
      email,
      first_name,
      last_name,
      current_country,
      destination_countries,
      budget_monthly,
      timeline,
      relocation_motivation as interests
    FROM users
    WHERE neon_auth_id = ${stackUserId}
    LIMIT 1
  `
  return (results[0] as UserProfile) || null
}

export async function createOrUpdateUserProfile(
  stackUserId: string,
  data: {
    email?: string
    first_name?: string
    last_name?: string
    current_country?: string
    destination_countries?: string[]
    budget_monthly?: number
    timeline?: string
    interests?: string[]
  }
): Promise<UserProfile> {
  const sql = createDbQuery()

  const results = await sql`
    INSERT INTO users (
      neon_auth_id,
      email,
      first_name,
      last_name,
      current_country,
      destination_countries,
      budget_monthly,
      timeline,
      relocation_motivation
    ) VALUES (
      ${stackUserId},
      ${data.email || null},
      ${data.first_name || null},
      ${data.last_name || null},
      ${data.current_country || 'United Kingdom'},
      ${data.destination_countries || null},
      ${data.budget_monthly || null},
      ${data.timeline || null},
      ${data.interests || null}
    )
    ON CONFLICT (neon_auth_id) DO UPDATE SET
      email = COALESCE(EXCLUDED.email, users.email),
      first_name = COALESCE(EXCLUDED.first_name, users.first_name),
      last_name = COALESCE(EXCLUDED.last_name, users.last_name),
      current_country = COALESCE(EXCLUDED.current_country, users.current_country),
      destination_countries = COALESCE(EXCLUDED.destination_countries, users.destination_countries),
      budget_monthly = COALESCE(EXCLUDED.budget_monthly, users.budget_monthly),
      timeline = COALESCE(EXCLUDED.timeline, users.timeline),
      relocation_motivation = COALESCE(EXCLUDED.relocation_motivation, users.relocation_motivation),
      updated_at = NOW()
    RETURNING
      id,
      neon_auth_id,
      email,
      first_name,
      last_name,
      current_country,
      destination_countries,
      budget_monthly,
      timeline,
      relocation_motivation as interests
  `

  return results[0] as UserProfile
}

export async function updateUserProfile(
  stackUserId: string,
  data: Partial<Omit<UserProfile, 'id' | 'neon_auth_id' | 'created_at' | 'updated_at'>>
): Promise<UserProfile | null> {
  const sql = createDbQuery()

  const results = await sql`
    UPDATE users
    SET
      email = COALESCE(${data.email}, email),
      first_name = COALESCE(${data.first_name}, first_name),
      last_name = COALESCE(${data.last_name}, last_name),
      current_country = COALESCE(${data.current_country}, current_country),
      destination_countries = COALESCE(${data.destination_countries}, destination_countries),
      budget_monthly = COALESCE(${data.budget_monthly}, budget_monthly),
      timeline = COALESCE(${data.timeline}, timeline),
      relocation_motivation = COALESCE(${data.interests}, relocation_motivation),
      updated_at = NOW()
    WHERE neon_auth_id = ${stackUserId}
    RETURNING
      id,
      neon_auth_id,
      email,
      first_name,
      last_name,
      current_country,
      destination_countries,
      budget_monthly,
      timeline,
      relocation_motivation as interests
  `

  return (results[0] as UserProfile) || null
}
