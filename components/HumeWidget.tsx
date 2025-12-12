'use client'

import { useState, useEffect, useCallback } from 'react'
import { VoiceProvider, useVoice } from '@humeai/voice-react'

const CONFIG_ID = process.env.NEXT_PUBLIC_HUME_CONFIG_ID || 'd57ceb71-4cf5-47e9-87cd-6052445a031c'

export interface UserProfile {
  first_name: string | null
  current_country: string | null
  budget_monthly?: number | null
  budget?: string | null
  timeline: string | null
  interests: string[] | null
  neon_auth_id?: string | null
}

export interface HumeMessage {
  type: 'user_message' | 'assistant_message'
  message?: {
    content?: string
    role?: string
  }
}

// Inner component that uses the voice hook
function VoiceWidget({
  accessToken,
  userName,
  userId,
  isAuthenticated,
  userProfile,
  onTranscript
}: {
  accessToken: string
  userName?: string
  userId?: string
  isAuthenticated: boolean
  userProfile?: UserProfile | null
  onTranscript?: (transcript: string, allMessages: HumeMessage[]) => void
}) {
  const { connect, disconnect, status, messages } = useVoice()
  const [isPending, setIsPending] = useState(false)
  const [logs, setLogs] = useState<string[]>([])

  const log = (msg: string) => {
    const time = new Date().toLocaleTimeString()
    console.log(`[Hume ${time}]`, msg)
    setLogs(prev => [...prev.slice(-9), `${time} ${msg}`])
  }

  // Log status changes
  useEffect(() => {
    log(`Status: ${status.value}`)
  }, [status.value])

  // Log messages and forward transcripts
  useEffect(() => {
    if (messages.length === 0) return

    const last = messages[messages.length - 1] as any
    if (last.type === 'assistant_message' && last.message?.content) {
      const content = last.message.content
      const hasName = userName && content.toLowerCase().includes(userName.toLowerCase())
      log(`🤖 "${content.slice(0, 50)}..." ${hasName ? '✅' : ''}`)
    }

    // Forward transcripts
    if (onTranscript) {
      const userMsgs = messages.filter((m: any) => m.type === 'user_message' && m.message?.content)
      if (userMsgs.length > 0) {
        const transcript = userMsgs.map((m: any) => m.message?.content).join('\n')
        onTranscript(transcript, messages as HumeMessage[])
      }
    }
  }, [messages, userName, onTranscript])

  const handleConnect = useCallback(async () => {
    setIsPending(true)

    // Build budget string
    const budgetStr = userProfile?.budget_monthly
      ? `£${userProfile.budget_monthly}/day`
      : userProfile?.budget || ''

    // All variables for Quest prompt (including user_id for tools)
    const sessionSettings = {
      type: 'session_settings' as const,
      variables: {
        user_id: userId || '',
        first_name: userName || '',
        is_authenticated: isAuthenticated ? 'true' : 'false',
        current_country: userProfile?.current_country || '',
        interests: userProfile?.interests?.join(', ') || '',
        timeline: userProfile?.timeline || '',
        budget: budgetStr
      }
    }

    log(`Connecting: ${userName}, auth=${isAuthenticated}`)
    console.log('[Hume] Variables:', sessionSettings.variables)

    try {
      await connect({
        auth: { type: 'accessToken', value: accessToken },
        configId: CONFIG_ID,
        sessionSettings
      })
      log('Connected!')
    } catch (e: any) {
      log(`Error: ${e?.message || e}`)
      console.error('[Hume] Connect error:', e)
    }

    setIsPending(false)
  }, [connect, accessToken, userName, userId, isAuthenticated, userProfile])

  const handleDisconnect = useCallback(() => {
    disconnect()
    log('Disconnected')
  }, [disconnect])

  const isConnected = status.value === 'connected'

  // Get last assistant message
  const lastMsg = [...messages].reverse().find((m: any) =>
    m.type === 'assistant_message' && m.message?.content
  ) as any

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Mic Button */}
      <button
        onClick={isConnected ? handleDisconnect : handleConnect}
        disabled={isPending}
        className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-lg ${
          isConnected
            ? 'bg-green-500 hover:bg-green-600 animate-pulse'
            : isPending
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-white hover:bg-purple-50 border-2 border-purple-200'
        }`}
      >
        {isPending ? (
          <div className="w-6 h-6 border-2 border-purple-700 border-t-transparent rounded-full animate-spin" />
        ) : (
          <svg className={`w-8 h-8 ${isConnected ? 'text-white' : 'text-purple-700'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        )}
      </button>

      {/* Status Text */}
      <p className="text-sm text-purple-200">
        {isPending ? 'Connecting...' : isConnected ? 'Listening...' : 'Tap to talk'}
      </p>

      {/* Stop Button */}
      {isConnected && (
        <button
          onClick={handleDisconnect}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
        >
          Stop
        </button>
      )}

      {/* Last Message */}
      {lastMsg?.message?.content && (
        <div className="max-w-md bg-white/10 backdrop-blur rounded-lg px-4 py-2 text-sm text-white">
          {lastMsg.message.content.slice(0, 200)}
          {lastMsg.message.content.length > 200 && '...'}
        </div>
      )}

      {/* Debug Panel */}
      <div className="mt-4 w-full max-w-md p-3 bg-black/60 rounded text-xs font-mono text-green-400">
        <div className="text-yellow-400 mb-2">
          Debug (user: {userName || 'none'}, auth: {isAuthenticated ? 'yes' : 'no'})
        </div>
        <div className="text-gray-500 mb-2">
          Status: {status.value} | Config: {CONFIG_ID.slice(0, 8)}...
        </div>
        <div className="space-y-1 max-h-32 overflow-auto">
          {logs.length === 0 && <div className="text-gray-600">Tap mic to start...</div>}
          {logs.map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </div>
    </div>
  )
}

// Props for the exported component
export interface HumeWidgetProps {
  variant?: 'hero' | 'floating'
  userName?: string
  userId?: string
  isAuthenticated?: boolean
  darkMode?: boolean
  userProfile?: UserProfile | null
  onTranscript?: (transcript: string, allMessages: HumeMessage[]) => void
}

// Main exported component - fetches token, renders VoiceProvider
export function HumeWidget({
  userName,
  userId,
  isAuthenticated = false,
  userProfile,
  onTranscript
}: HumeWidgetProps) {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Derive display name from profile or prop
  const displayName = userProfile?.first_name || userName || undefined

  // Fetch token on mount
  useEffect(() => {
    console.log('[HumeWidget] Fetching token...')
    fetch('/api/hume-token')
      .then(res => res.json())
      .then(data => {
        if (data.accessToken) {
          console.log('[HumeWidget] Token received')
          setAccessToken(data.accessToken)
        } else {
          console.error('[HumeWidget] No token:', data)
          setError(data.error || 'No token received')
        }
      })
      .catch(err => {
        console.error('[HumeWidget] Token fetch error:', err)
        setError(err.message)
      })
  }, [])

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
          <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <p className="text-purple-200 text-sm">Voice unavailable</p>
        <p className="text-red-400 text-xs">{error}</p>
      </div>
    )
  }

  // Loading state
  if (!accessToken) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="text-purple-200 text-sm">Loading voice...</p>
      </div>
    )
  }

  // Ready - render with VoiceProvider
  return (
    <VoiceProvider>
      <VoiceWidget
        accessToken={accessToken}
        userName={displayName}
        userId={userId}
        isAuthenticated={isAuthenticated}
        userProfile={userProfile}
        onTranscript={onTranscript}
      />
    </VoiceProvider>
  )
}
