'use client'

import { useState, useEffect, useCallback } from 'react'
import { VoiceProvider, useVoice } from '@humeai/voice-react'

const CONFIG_ID = process.env.NEXT_PUBLIC_HUME_CONFIG_ID || 'd57ceb71-4cf5-47e9-87cd-6052445a031c'

interface TestVariables {
  first_name: string
  is_authenticated: string
  current_country: string
  interests: string
  timeline: string
  budget: string
}

function VoiceTestWidget() {
  const { connect, disconnect, status, messages } = useVoice()
  const [token, setToken] = useState<string | null>(null)
  const [tokenError, setTokenError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)
  const [logs, setLogs] = useState<string[]>([])

  // Test variables - editable
  const [testVars, setTestVars] = useState<TestVariables>({
    first_name: 'Dan',
    is_authenticated: 'true',
    current_country: 'United Kingdom',
    interests: 'CFO, CTO',
    timeline: 'Within 3 months',
    budget: '£1000-1500/day'
  })

  const log = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString()
    console.log(`[Hume ${timestamp}]`, msg)
    setLogs(prev => [...prev, `${timestamp} - ${msg}`])
  }

  // Fetch token on mount
  useEffect(() => {
    log('Fetching access token...')
    fetch('/api/hume-token')
      .then(res => res.json())
      .then(data => {
        if (data.accessToken) {
          log(`✅ Token received (${data.accessToken.slice(0, 10)}...)`)
          setToken(data.accessToken)
        } else if (data.error) {
          log(`❌ Token error: ${data.error}`)
          setTokenError(data.error)
        } else {
          log('❌ No token in response')
          setTokenError('No token received')
        }
      })
      .catch(err => {
        log(`❌ Fetch error: ${err.message}`)
        setTokenError(err.message)
      })
  }, [])

  // Log messages
  useEffect(() => {
    if (messages.length > 0) {
      const last = messages[messages.length - 1] as any
      if (last.type === 'assistant_message' && last.message?.content) {
        const content = last.message.content
        const hasName = content.toLowerCase().includes(testVars.first_name.toLowerCase())
        log(`🤖 "${content.slice(0, 60)}..." ${hasName ? '✅ HAS NAME' : '❌ NO NAME'}`)
      } else if (last.type === 'user_message' && last.message?.content) {
        log(`👤 You: "${last.message.content.slice(0, 40)}..."`)
      } else if (last.type === 'chat_metadata') {
        log(`📋 chat_metadata received`)
      }
    }
  }, [messages, testVars.first_name])

  const handleConnect = useCallback(async () => {
    if (!token) {
      log('❌ No token available')
      return
    }

    setIsPending(true)
    log('🔄 Connecting with ALL 6 variables...')
    log(`Variables: ${JSON.stringify(testVars)}`)

    const sessionSettings = {
      type: 'session_settings' as const,
      variables: { ...testVars }
    }

    try {
      await connect({
        auth: { type: 'accessToken', value: token },
        configId: CONFIG_ID,
        sessionSettings
      })
      log('✅ Connected! Listen for greeting...')
    } catch (e: any) {
      log(`❌ Connect error: ${e.message || e}`)
    }
    setIsPending(false)
  }, [token, testVars, connect])

  const handleDisconnect = useCallback(() => {
    log('🔄 Disconnecting...')
    disconnect()
    log('✅ Disconnected')
  }, [disconnect])

  const isConnected = status.value === 'connected'

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Hume Voice Test</h1>
          <p className="text-gray-400">Production debug page - tests variable passing at connect time</p>
        </div>

        {/* Status Panel */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-yellow-400 mb-4">Connection Status</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-gray-700 rounded-lg p-3">
              <div className="text-gray-400">Token</div>
              <div className={token ? 'text-green-400' : 'text-red-400'}>
                {token ? '✅ Ready' : tokenError || '⏳ Loading...'}
              </div>
            </div>
            <div className="bg-gray-700 rounded-lg p-3">
              <div className="text-gray-400">Connection</div>
              <div className={isConnected ? 'text-green-400' : 'text-gray-500'}>
                {status.value}
              </div>
            </div>
            <div className="bg-gray-700 rounded-lg p-3">
              <div className="text-gray-400">Config</div>
              <div className="text-blue-400 font-mono text-xs">{CONFIG_ID.slice(0, 12)}...</div>
            </div>
            <div className="bg-gray-700 rounded-lg p-3">
              <div className="text-gray-400">Messages</div>
              <div className="text-purple-400">{messages.length}</div>
            </div>
          </div>
        </div>

        {/* Variables Panel */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-yellow-400 mb-4">Test Variables (edit before connecting)</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(testVars).map(([key, value]) => (
              <div key={key}>
                <label className="block text-gray-400 text-sm mb-1">{key}</label>
                {key === 'is_authenticated' ? (
                  <select
                    value={value}
                    onChange={(e) => setTestVars(v => ({ ...v, [key]: e.target.value }))}
                    className="w-full bg-gray-700 rounded px-3 py-2 text-white"
                    disabled={isConnected}
                  >
                    <option value="true">true</option>
                    <option value="false">false</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => setTestVars(v => ({ ...v, [key]: e.target.value }))}
                    className="w-full bg-gray-700 rounded px-3 py-2 text-white"
                    disabled={isConnected}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={handleConnect}
            disabled={!token || isConnected || isPending}
            className="px-8 py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-xl font-bold text-lg transition-all"
          >
            {isPending ? '⏳ Connecting...' : '🎤 Connect with Variables'}
          </button>
          <button
            onClick={handleDisconnect}
            disabled={!isConnected}
            className="px-8 py-4 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-xl font-bold text-lg transition-all"
          >
            ⏹️ Disconnect
          </button>
        </div>

        {/* Debug Logs */}
        <div className="bg-black rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-yellow-400">Debug Logs</h2>
            <button
              onClick={() => setLogs([])}
              className="text-sm text-gray-500 hover:text-white"
            >
              Clear
            </button>
          </div>
          <div className="font-mono text-sm space-y-1 max-h-64 overflow-auto">
            {logs.length === 0 ? (
              <div className="text-gray-600">Logs will appear here...</div>
            ) : (
              logs.map((l, i) => (
                <div key={i} className="text-green-400">{l}</div>
              ))
            )}
          </div>
        </div>

        {/* Messages */}
        {messages.length > 0 && (
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-yellow-400 mb-4">Conversation</h2>
            <div className="space-y-3 max-h-64 overflow-auto">
              {messages.filter((m: any) =>
                (m.type === 'user_message' || m.type === 'assistant_message') && m.message?.content
              ).map((msg: any, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg ${
                    msg.type === 'user_message'
                      ? 'bg-purple-900 ml-12'
                      : 'bg-gray-700 mr-12'
                  }`}
                >
                  <div className="text-xs text-gray-400 mb-1">
                    {msg.type === 'user_message' ? '👤 You' : '🤖 Quest'}
                  </div>
                  <div>{msg.message.content}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center text-gray-600 text-sm">
          <p>This page tests that Hume EVI receives variables at connect time.</p>
          <p>If Quest says "Hey {testVars.first_name}!" - the fix is working.</p>
        </div>
      </div>
    </div>
  )
}

export default function VoiceTestPage() {
  return (
    <VoiceProvider>
      <VoiceTestWidget />
    </VoiceProvider>
  )
}
