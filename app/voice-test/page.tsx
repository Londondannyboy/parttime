'use client'

import { useState, useEffect, useCallback } from 'react'
import { useUser } from '@stackframe/stack'
import { VoiceProvider, useVoice } from '@humeai/voice-react'

const CONFIG_ID = 'd57ceb71-4cf5-47e9-87cd-6052445a031c'

// Minimal voice component - exact same as working test-hume
function Voice({ token, profile }: { token: string; profile: any }) {
  const { connect, disconnect, status, messages } = useVoice()
  const [logs, setLogs] = useState<string[]>([])

  const log = (msg: string) => {
    console.log('[Voice]', msg)
    setLogs(p => [...p.slice(-9), `${new Date().toLocaleTimeString()} ${msg}`])
  }

  useEffect(() => { log(`Status: ${status.value}`) }, [status.value])

  useEffect(() => {
    if (messages.length === 0) return
    const last = messages[messages.length - 1] as any
    if (last.type === 'assistant_message' && last.message?.content) {
      log(`🤖 ${last.message.content.slice(0, 60)}...`)
    }
  }, [messages])

  const handleConnect = useCallback(async () => {
    const vars = {
      first_name: profile?.first_name || '',
      is_authenticated: 'true',
      current_country: profile?.current_country || '',
      interests: '',
      timeline: '',
      budget: ''
    }

    log(`Connecting with: ${vars.first_name}`)
    console.log('[Voice] Variables:', vars)

    try {
      await connect({
        auth: { type: 'accessToken', value: token },
        configId: CONFIG_ID,
        sessionSettings: {
          type: 'session_settings' as const,
          variables: vars
        }
      })
      log('Connected!')
    } catch (e: any) {
      log(`Error: ${e?.message || e}`)
    }
  }, [connect, token, profile])

  const isConnected = status.value === 'connected'

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <h1 className="text-2xl font-bold">Fresh Voice Test</h1>
      <p className="text-gray-600">Profile: {profile?.first_name || 'Loading...'}</p>

      <button
        onClick={isConnected ? disconnect : handleConnect}
        className={`w-24 h-24 rounded-full text-white font-bold ${
          isConnected ? 'bg-green-500 animate-pulse' : 'bg-purple-600 hover:bg-purple-700'
        }`}
      >
        {isConnected ? 'Stop' : 'Start'}
      </button>

      <p className="text-lg">{isConnected ? '🎤 Listening...' : 'Tap to talk'}</p>

      {/* Messages */}
      {messages.filter((m: any) => m.message?.content).slice(-3).map((m: any, i) => (
        <div key={i} className={`p-3 rounded-lg max-w-md ${
          m.type === 'user_message' ? 'bg-purple-100' : 'bg-gray-100'
        }`}>
          {m.message.content}
        </div>
      ))}

      {/* Debug */}
      <div className="w-full max-w-md bg-black text-green-400 p-4 rounded font-mono text-xs">
        <div className="text-yellow-400 mb-2">Status: {status.value}</div>
        {logs.map((l, i) => <div key={i}>{l}</div>)}
      </div>
    </div>
  )
}

export default function VoiceTestPage() {
  const user = useUser()
  const [token, setToken] = useState<string | null>(null)
  const [profile, setProfile] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  // Fetch token
  useEffect(() => {
    fetch('/api/hume-token')
      .then(r => r.json())
      .then(d => d.accessToken ? setToken(d.accessToken) : setError('No token'))
      .catch(e => setError(e.message))
  }, [])

  // Fetch profile if logged in
  useEffect(() => {
    if (!user) return
    fetch('/api/user-profile')
      .then(r => r.ok ? r.json() : null)
      .then(p => { setProfile(p); console.log('Profile:', p) })
      .catch(console.error)
  }, [user])

  if (error) return <div className="p-8 text-red-500">Error: {error}</div>
  if (!token) return <div className="p-8">Loading token...</div>

  return (
    <VoiceProvider>
      <Voice token={token} profile={profile} />
    </VoiceProvider>
  )
}
