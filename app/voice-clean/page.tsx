'use client'

import { useState, useEffect, useCallback } from 'react'
import { useUser } from '@stackframe/stack'
import { VoiceProvider, useVoice } from '@humeai/voice-react'

const CONFIG_ID = 'd57ceb71-4cf5-47e9-87cd-6052445a031c'

function VoiceInterface({ token, userId, profile }: { token: string; userId?: string; profile?: any }) {
  const { connect, disconnect, status, messages, isPlaying } = useVoice()

  const handleConnect = useCallback(async () => {
    const vars = {
      user_id: userId || '',
      first_name: profile?.first_name || '',
      last_name: profile?.last_name || '',
      is_authenticated: userId ? 'true' : 'false',
      current_country: profile?.current_country || '',
      interests: profile?.interests || '',
      timeline: profile?.timeline || '',
      budget: profile?.budget_monthly ? `£${profile.budget_monthly}/day` : '',
    }

    console.log('[Hume] Connecting with profile:', vars)

    try {
      await connect({
        auth: { type: 'accessToken', value: token },
        configId: CONFIG_ID,
        sessionSettings: {
          type: 'session_settings' as const,
          variables: vars
        }
      })
    } catch (e) {
      console.error('Connection error:', e)
    }
  }, [connect, token, userId, profile])

  const isConnected = status.value === 'connected'
  const isConnecting = status.value === 'connecting'

  // Simple message display
  const lastMessage = messages.find(m => m.type === 'assistant_message')

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold mb-4">Voice Test (Clean)</h1>

      <button
        onClick={isConnected ? disconnect : handleConnect}
        disabled={isConnecting}
        className={`w-32 h-32 rounded-full text-white font-bold text-lg shadow-xl ${
          isConnected
            ? 'bg-green-500 hover:bg-green-600'
            : isConnecting
            ? 'bg-gray-400'
            : 'bg-purple-600 hover:bg-purple-700'
        }`}
      >
        {isConnected ? 'Stop' : isConnecting ? '...' : 'Speak'}
      </button>

      <p className="mt-4 text-gray-600">
        Status: {status.value} | Playing: {isPlaying ? 'Yes' : 'No'}
      </p>

      {lastMessage && (
        <div className="mt-4 p-4 bg-gray-100 rounded max-w-md">
          <p>{(lastMessage as any).message?.content}</p>
        </div>
      )}
    </div>
  )
}

export default function VoiceCleanPage() {
  const user = useUser()
  const [token, setToken] = useState<string | null>(null)
  const [profile, setProfile] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  // Fetch Hume token
  useEffect(() => {
    fetch('/api/hume-token')
      .then(r => r.json())
      .then(d => d.accessToken ? setToken(d.accessToken) : setError('No token'))
      .catch(e => setError(e.message))
  }, [])

  // Fetch profile from Neon
  useEffect(() => {
    if (!user) return
    fetch('/api/user-profile')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        console.log('[Profile from Neon]', data)
        setProfile(data)
      })
      .catch(console.error)
  }, [user])

  if (error) return <div className="p-8 text-red-500">Error: {error}</div>
  if (!token) return <div className="p-8">Loading...</div>

  return (
    <VoiceProvider
      onError={(err) => console.error('[Hume Error]', err)}
      onClose={(e) => console.warn('[Hume Close]', e?.code, e?.reason)}
    >
      <VoiceInterface
        token={token}
        userId={user?.id}
        profile={profile}
      />
    </VoiceProvider>
  )
}
