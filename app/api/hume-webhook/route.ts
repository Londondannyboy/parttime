import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'
import { storeConversationMemory } from '@/lib/supermemory'
import { addToUserGraph } from '@/lib/zep-client'

const sql = neon(process.env.DATABASE_URL!)

/**
 * Hume Webhook Endpoint
 *
 * Receives conversation data from Hume when a chat session ends.
 * Saves the conversation to Neon and syncs to ZEP.
 */

interface HumeWebhookPayload {
  type: string
  chat_id: string
  chat_group_id: string
  user_id?: string
  messages?: Array<{
    role: string
    content: string
    timestamp?: string
  }>
  metadata?: Record<string, any>
}

export async function POST(request: NextRequest) {
  try {
    const body: HumeWebhookPayload = await request.json()
    console.log('[Hume Webhook] Received:', JSON.stringify(body, null, 2))

    const { type, chat_id, chat_group_id, user_id, messages, metadata } = body

    // Only process chat_end events
    if (type !== 'chat_end' && type !== 'session_end') {
      return NextResponse.json({ status: 'ignored', reason: `Event type: ${type}` })
    }

    if (!user_id) {
      console.log('[Hume Webhook] No user_id, skipping save')
      return NextResponse.json({ status: 'skipped', reason: 'No user_id' })
    }

    // Get internal user ID from neon_auth_id
    const userResult = await sql`
      SELECT id FROM users WHERE neon_auth_id = ${user_id} LIMIT 1
    `

    if (userResult.length === 0) {
      console.log('[Hume Webhook] User not found:', user_id)
      return NextResponse.json({ status: 'skipped', reason: 'User not found' })
    }

    const internalUserId = userResult[0].id

    // Format messages for storage
    const conversationText = messages?.map(m =>
      `${m.role}: ${m.content}`
    ).join('\n') || ''

    // Save conversation to database
    await sql`
      INSERT INTO user_conversations (
        user_id,
        hume_chat_id,
        hume_chat_group_id,
        conversation_text,
        message_count,
        metadata,
        created_at
      ) VALUES (
        ${internalUserId},
        ${chat_id},
        ${chat_group_id},
        ${conversationText},
        ${messages?.length || 0},
        ${JSON.stringify(metadata || {})},
        NOW()
      )
    `

    console.log('[Hume Webhook] Saved conversation for user:', user_id)

    // Sync to ZEP if available
    if (process.env.ZEP_API_KEY) {
      try {
        await addToUserGraph(user_id, {
          type: 'conversation',
          chat_id,
          messages: messages?.map(m => ({ role: m.role, content: m.content })),
          timestamp: new Date().toISOString()
        })
        console.log('[Hume Webhook] Synced to ZEP')
      } catch (zepError) {
        console.error('[Hume Webhook] ZEP sync failed:', zepError)
      }
    }

    // Sync to Supermemory if available
    if (process.env.SUPERMEMORY_API_KEY) {
      try {
        await storeConversationMemory(user_id, conversationText)
        console.log('[Hume Webhook] Synced to Supermemory')
      } catch (smError) {
        console.error('[Hume Webhook] Supermemory sync failed:', smError)
      }
    }

    return NextResponse.json({
      status: 'saved',
      chat_id,
      message_count: messages?.length || 0,
      synced: {
        neon: true,
        zep: !!process.env.ZEP_API_KEY,
        supermemory: !!process.env.SUPERMEMORY_API_KEY
      }
    })
  } catch (error) {
    console.error('[Hume Webhook] Error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed', details: String(error) },
      { status: 500 }
    )
  }
}

// GET for testing
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: 'Hume Webhook',
    accepts: ['chat_end', 'session_end'],
    saves_to: ['Neon (user_conversations)', 'ZEP']
  })
}
