'use client'

import { useState, useCallback, useEffect } from 'react'
import { VoiceProvider, useVoice } from '@humeai/voice-react'
import Link from 'next/link'

const MAX_FREE_USES = 3
const STORAGE_KEY = 'fractional_hume_uses'
// Use the same properly configured EVI config for both auth and unauth
// The system prompt handles both flows via {{is_authenticated}} variable
const HUME_CONFIG_ID = process.env.NEXT_PUBLIC_HUME_CONFIG_ID || 'd57ceb71-4cf5-47e9-87cd-6052445a031c'

function getUsageCount(): number {
  if (typeof window === 'undefined') return 0
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? parseInt(stored, 10) : 0
}

function incrementUsage(): number {
  const current = getUsageCount()
  const newCount = current + 1
  localStorage.setItem(STORAGE_KEY, newCount.toString())
  return newCount
}

export interface UserProfile {
  first_name: string | null
  current_country: string | null
  destination_countries: string[] | null
  budget: string | null
  timeline: string | null
  interests: string[] | null
}

interface VoiceInterfaceProps {
  accessToken: string
  onUse: () => void
  darkMode?: boolean
  userProfile?: UserProfile | null
  onTranscript?: (transcript: string, allMessages: HumeMessage[]) => void
  isAuthenticated?: boolean
}

// Hume message type
export interface HumeMessage {
  type: 'user_message' | 'assistant_message'
  message?: {
    content?: string
    role?: string
  }
}

function VoiceInterface({ accessToken, onUse, darkMode = true, userProfile, onTranscript, isAuthenticated = false }: VoiceInterfaceProps) {
  const { connect, disconnect, status, messages, sendSessionSettings } = useVoice()
  const [isConnecting, setIsConnecting] = useState(false)
  const [hasConnectedOnce, setHasConnectedOnce] = useState(false)
  const [lastProcessedIndex, setLastProcessedIndex] = useState(0)
  const [debugLogs, setDebugLogs] = useState<string[]>([])
  const [connectError, setConnectError] = useState<string | null>(null)
  const [sessionSettingsSent, setSessionSettingsSent] = useState(false)

  const addLog = (msg: string) => {
    console.log('[Hume]', msg)
    setDebugLogs(prev => [...prev.slice(-19), `${new Date().toISOString().slice(11, 19)} ${msg}`])
  }

  // Handle stop - disconnect from Hume
  const handleStop = useCallback(() => {
    addLog('Disconnecting...')
    disconnect()
    setSessionSettingsSent(false)
  }, [disconnect])

  // Watch for chat_metadata message and then send session_settings
  // This is the approach confirmed by Hume support - must wait for chat_metadata first
  useEffect(() => {
    if (sessionSettingsSent) return
    if (status.value !== 'connected') return

    // Check if we have chat_metadata
    const hasChatMetadata = messages.some((msg: unknown) => {
      const typedMsg = msg as { type?: string }
      return typedMsg.type === 'chat_metadata'
    })

    if (hasChatMetadata) {
      addLog('✅ Received chat_metadata - sending session_settings...')

      // Build variables for Hume - must match {{placeholder}} names in system prompt
      const variables: Record<string, string> = {
        is_authenticated: isAuthenticated ? 'true' : 'false'
      }

      if (userProfile) {
        if (userProfile.first_name) variables.first_name = userProfile.first_name
        if (userProfile.current_country) variables.current_country = userProfile.current_country
        if (userProfile.destination_countries?.length) {
          variables.destination_countries = userProfile.destination_countries.join(', ')
        }
        if (userProfile.budget) variables.budget = userProfile.budget
        if (userProfile.timeline) variables.timeline = userProfile.timeline
        if (userProfile.interests?.length) {
          variables.interests = userProfile.interests.join(', ')
        }
      }

      const settings = {
        type: 'session_settings' as const,
        variables
      }

      addLog(`Sending: ${JSON.stringify(settings)}`)
      sendSessionSettings(settings as any)
      setSessionSettingsSent(true)
      addLog('✅ Session settings sent!')
    }
  }, [messages, status.value, sessionSettingsSent, userProfile, isAuthenticated, sendSessionSettings])

  // Watch for new user messages and trigger extraction
  useEffect(() => {
    if (!onTranscript || messages.length === 0) return

    // Only process new messages
    if (messages.length <= lastProcessedIndex) return

    // Get new messages since last check
    const newMessages = messages.slice(lastProcessedIndex)

    // Look for user messages
    const userMessages = newMessages.filter((msg: unknown) => {
      const typedMsg = msg as HumeMessage
      return typedMsg.type === 'user_message' && typedMsg.message?.content
    })

    if (userMessages.length > 0) {
      // Build transcript from all user messages so far
      const allUserContent = messages
        .filter((msg: unknown) => {
          const typedMsg = msg as HumeMessage
          return typedMsg.type === 'user_message' && typedMsg.message?.content
        })
        .map((msg: unknown) => (msg as HumeMessage).message?.content || '')
        .join('\n')

      // Call the extraction callback
      onTranscript(allUserContent, messages as HumeMessage[])
    }

    setLastProcessedIndex(messages.length)
  }, [messages, lastProcessedIndex, onTranscript])

  const handleConnect = useCallback(async () => {
    setIsConnecting(true)
    setConnectError(null)
    setSessionSettingsSent(false)

    try {
      addLog(`Auth: ${isAuthenticated}, Name: ${userProfile?.first_name || 'none'}`)
      addLog(`Config: ${HUME_CONFIG_ID.slice(0, 8)}...`)
      addLog('Connecting (will send vars after chat_metadata)...')

      // Connect WITHOUT sessionSettings - we'll send them after receiving chat_metadata
      // This is the approach confirmed by Hume support
      await connect({
        auth: { type: 'accessToken', value: accessToken },
        configId: HUME_CONFIG_ID
      })

      addLog('✅ Connected! Waiting for chat_metadata...')

      if (!hasConnectedOnce) {
        onUse()
        setHasConnectedOnce(true)
      }
    } catch (error: unknown) {
      const errorMsg = error instanceof Error ? error.message : String(error)
      addLog(`❌ ERROR: ${errorMsg}`)
      setConnectError(errorMsg)
      console.error('Failed to connect to Hume:', error)
    }
    setIsConnecting(false)
  }, [connect, accessToken, onUse, hasConnectedOnce, userProfile, isAuthenticated])

  const isConnected = status.value === 'connected'

  // Dynamic text colors based on background
  const textMuted = darkMode ? 'text-purple-200' : 'text-gray-500'
  const textPrimary = darkMode ? 'text-white' : 'text-gray-900'

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Voice Button + Stop Button */}
      <div className="flex items-center gap-4">
        {/* Main Voice Button */}
        <button
          onClick={isConnected ? handleStop : handleConnect}
          disabled={isConnecting}
          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
            isConnected
              ? 'bg-green-500 hover:bg-green-600 animate-pulse'
              : isConnecting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-white hover:bg-purple-50 border-2 border-purple-200'
          }`}
        >
          {isConnecting ? (
            <div className="w-6 h-6 border-3 border-purple-700 border-t-transparent rounded-full animate-spin" />
          ) : isConnected ? (
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          ) : (
            <svg className="w-8 h-8 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          )}
        </button>

        {/* Separate Stop Button - visible when connected */}
        {isConnected && (
          <button
            onClick={handleStop}
            className="w-14 h-14 rounded-full flex items-center justify-center bg-red-500 hover:bg-red-600 transition-colors shadow-lg"
            title="Stop conversation"
          >
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="6" width="12" height="12" rx="1" />
            </svg>
          </button>
        )}
      </div>

      {/* Status */}
      <p className={`text-sm font-medium ${isConnected ? textPrimary : textMuted}`}>
        {isConnecting ? 'Connecting...' : isConnected ? 'Speaking with Quest' : 'Tap to talk'}
      </p>

      {/* Last message */}
      {messages.length > 0 && (
        <div className={`max-w-md rounded-lg px-4 py-2 text-sm ${darkMode ? 'bg-white/10 backdrop-blur text-white' : 'bg-gray-100 text-gray-700'}`}>
          {(() => {
            const lastMsg = messages[messages.length - 1] as { message?: { content?: string } } | undefined
            const content = lastMsg?.message?.content || ''
            return (
              <>
                {content.slice(0, 150)}
                {content.length > 150 && '...'}
              </>
            )
          })()}
        </div>
      )}

      {/* Debug Panel - always visible */}
      <div className="mt-4 w-full max-w-md">
        <div className={`p-2 rounded text-xs font-mono ${darkMode ? 'bg-black/50 text-green-400' : 'bg-gray-900 text-green-400'}`}>
          <div className="text-yellow-400 mb-1">Debug (user: {userProfile?.first_name || 'none'})</div>
          {connectError && (
            <div className="text-red-400 mb-2">Error: {connectError}</div>
          )}
          {debugLogs.length === 0 && (
            <div className="text-gray-500">Tap to connect...</div>
          )}
          {debugLogs.map((log, i) => (
            <div key={i} className="truncate">{log}</div>
          ))}
          <div className="text-gray-500 mt-1">Status: {status.value} | SettingsSent: {sessionSettingsSent ? 'yes' : 'no'}</div>
        </div>
      </div>
    </div>
  )
}

function UsageLimitReached({ darkMode = true }: { darkMode?: boolean }) {
  const textPrimary = darkMode ? 'text-white' : 'text-gray-900'
  const textMuted = darkMode ? 'text-purple-200' : 'text-gray-500'
  const iconBg = darkMode ? 'bg-white/10' : 'bg-gray-100'

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className={`w-20 h-20 rounded-full ${iconBg} flex items-center justify-center`}>
        <svg className={`w-10 h-10 ${textMuted}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      <div>
        <p className={`${textPrimary} font-medium mb-1`}>Free trial ended</p>
        <p className={`${textMuted} text-sm mb-4`}>Sign in for unlimited access</p>
        <Link
          href="/handler/sign-in"
          className="inline-flex items-center px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
        >
          Sign In Free
        </Link>
      </div>
    </div>
  )
}

export interface HumeWidgetProps {
  variant?: 'hero' | 'floating'
  userName?: string
  isAuthenticated?: boolean
  darkMode?: boolean
  userProfile?: UserProfile | null
  onTranscript?: (transcript: string, allMessages: HumeMessage[]) => void
}

export function HumeWidget({ variant = 'hero', userName, isAuthenticated = false, darkMode = true, userProfile, onTranscript }: HumeWidgetProps) {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [usageCount, setUsageCount] = useState(0)
  const [isClient, setIsClient] = useState(false)

  const textMuted = darkMode ? 'text-purple-200' : 'text-gray-500'
  const iconBg = darkMode ? 'bg-white/10' : 'bg-gray-100'

  // Create a merged profile with userName if provided
  const mergedProfile: UserProfile | null = userProfile || (userName ? {
    first_name: userName,
    current_country: null,
    destination_countries: null,
    budget: null,
    timeline: null,
    interests: null,
  } : null)

  useEffect(() => {
    setIsClient(true)
    setUsageCount(getUsageCount())
  }, [])

  useEffect(() => {
    if (!isClient) return

    async function getAccessToken() {
      try {
        const response = await fetch('/api/hume-token')
        if (!response.ok) throw new Error('Failed to get token')
        const data = await response.json()
        setAccessToken(data.accessToken)
      } catch (err) {
        setError('Voice service unavailable')
        console.error('Hume token error:', err)
      }
    }

    // Authenticated users get unlimited access
    if (isAuthenticated || usageCount < MAX_FREE_USES) {
      getAccessToken()
    }
  }, [isClient, usageCount, isAuthenticated])

  const handleUse = () => {
    // Don't count uses for authenticated users
    if (isAuthenticated) return
    const newCount = incrementUsage()
    setUsageCount(newCount)
  }

  if (!isClient) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className={`w-20 h-20 rounded-full ${iconBg} animate-pulse`} />
        <p className={`${textMuted} text-sm`}>Loading...</p>
      </div>
    )
  }

  // Check if user has exceeded free uses (only for unauthenticated users)
  if (!isAuthenticated && usageCount >= MAX_FREE_USES) {
    return <UsageLimitReached darkMode={darkMode} />
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <div className={`w-20 h-20 rounded-full ${iconBg} flex items-center justify-center`}>
          <svg className={`w-8 h-8 ${textMuted}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </div>
        <p className={`${textMuted} text-sm`}>Voice assistant unavailable</p>
        <Link href="/chat" className={`${darkMode ? 'text-white' : 'text-purple-600'} underline text-sm`}>Try text chat instead →</Link>
      </div>
    )
  }

  if (!accessToken) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className={`w-20 h-20 rounded-full ${iconBg} flex items-center justify-center`}>
          <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
        <p className={`${textMuted} text-sm`}>Initializing voice...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <VoiceProvider>
        <VoiceInterface
          accessToken={accessToken}
          onUse={handleUse}
          darkMode={darkMode}
          userProfile={mergedProfile}
          onTranscript={onTranscript}
          isAuthenticated={isAuthenticated}
        />
      </VoiceProvider>
      {!isAuthenticated && (
        <p className={`${textMuted} text-xs mt-3`}>
          {MAX_FREE_USES - usageCount} free {MAX_FREE_USES - usageCount === 1 ? 'use' : 'uses'} remaining
        </p>
      )}
    </div>
  )
}
