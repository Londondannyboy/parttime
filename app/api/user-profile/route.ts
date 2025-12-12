import { NextRequest, NextResponse } from 'next/server'
import { stackServerApp } from '@/stack/server'
import { getUserProfile, createOrUpdateUserProfile } from '@/lib/user-profiles'

export async function GET() {
  try {
    const user = await stackServerApp.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const profile = await getUserProfile(user.id)

    // If no profile exists, create one with basic info from Stack Auth
    if (!profile) {
      const newProfile = await createOrUpdateUserProfile(user.id, {
        email: user.primaryEmail || undefined,
        first_name: user.displayName?.split(' ')[0] || undefined,
      })
      return NextResponse.json(newProfile)
    }

    return NextResponse.json(profile)
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await stackServerApp.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()

    const profile = await createOrUpdateUserProfile(user.id, {
      email: data.email || user.primaryEmail || undefined,
      first_name: data.first_name || user.displayName?.split(' ')[0] || undefined,
      current_country: data.current_country,
      destination_countries: data.destination_countries,
      budget_monthly: data.budget_monthly || data.budget,
      timeline: data.timeline,
      interests: data.interests,
    })

    return NextResponse.json(profile)
  } catch (error) {
    console.error('Error updating user profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
