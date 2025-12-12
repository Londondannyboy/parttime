'use client'

import { useState, useEffect } from 'react'
import { VoiceProvider, useVoice } from '@humeai/voice-react'

const CONFIG_ID = 'd57ceb71-4cf5-47e9-87cd-6052445a031c'

function VoiceTest() {
  const { connect, disconnect, status, messages, sendSessionSettings, isMuted, mute, unmute } = useVoice()
  const [token, setToken] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [logs, setLogs] = useState<string[]>([])
  const [userName, setUserName] = useState('Dan')
  const [micPermission, setMicPermission] = useState<string>('unknown')

  const log = (msg: string) => {
    console.log(msg)
    setLogs(prev => [...prev, `${new Date().toISOString().slice(11, 19)} - ${msg}`])
  }

  useEffect(() => {
    log('Fetching access token...')
    fetch('/api/hume-token')
      .then(res => res.json())
      .then(data => {
        if (data.accessToken) {
          log('✅ Got access token: ' + data.accessToken.slice(0, 20) + '...')
          setToken(data.accessToken)
        } else {
          log('❌ Error: No access token in response')
          setError('No access token')
        }
      })
      .catch(err => {
        log('❌ Error fetching token: ' + err.message)
        setError(err.message)
      })

    // Check mic permission
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(() => {
        log('✅ Microphone permission granted')
        setMicPermission('granted')
      })
      .catch((err) => {
        log('❌ Microphone error: ' + err.message)
        setMicPermission('denied: ' + err.message)
      })
  }, [])

  // Log all incoming messages to catch warnings
  useEffect(() => {
    if (messages.length > 0) {
      const lastMsg = messages[messages.length - 1] as any
      if (lastMsg.type === 'error' || lastMsg.type === 'warning' || lastMsg.code) {
        log(`⚠️ MESSAGE: type=${lastMsg.type}, code=${lastMsg.code || 'n/a'}`)
      }
      // Log chat_metadata specifically
      if (lastMsg.type === 'chat_metadata') {
        log(`📋 chat_metadata received: ${JSON.stringify(lastMsg).slice(0, 100)}...`)
      }
    }
  }, [messages])

  // Method 1: Connect WITHOUT sessionSettings (this worked before)
  const handleConnectBasic = async () => {
    if (!token) {
      log('❌ No token available')
      return
    }

    log('🔄 METHOD 1: Connecting WITHOUT sessionSettings...')
    log(`Config ID: ${CONFIG_ID}`)

    try {
      await connect({
        auth: { type: 'accessToken', value: token },
        configId: CONFIG_ID
      })
      log('✅ Connected successfully (basic)!')
    } catch (err: any) {
      log('❌ Connect error: ' + (err?.message || JSON.stringify(err)))
      setError(err?.message || String(err))
    }
  }

  // Method 2: Connect WITH variables (EXACT format from working relocation app)
  const handleConnectWithVars = async () => {
    if (!token) {
      log('❌ No token available')
      return
    }

    // Variables to match system prompt placeholders
    // Try BOTH 'name' (Hume example) and 'first_name' (your config)
    const variables: Record<string, string> = {
      is_authenticated: 'true',
      first_name: userName,
      name: userName,
      current_country: 'United Kingdom'
    }

    // Filter out empty values
    const filteredVariables = Object.fromEntries(
      Object.entries(variables).filter(([, v]) => v !== undefined && v !== '')
    ) as Record<string, string>

    // Build sessionSettings - type IS required by Hume SDK (use 'as const')
    const sessionSettings = {
      type: 'session_settings' as const,
      variables: filteredVariables,
    }

    log('🔄 METHOD 2: Connecting (relocation app format)...')
    log(`Config ID: ${CONFIG_ID}`)
    log(`SessionSettings: ${JSON.stringify(sessionSettings)}`)

    try {
      await connect({
        auth: { type: 'accessToken', value: token },
        configId: CONFIG_ID,
        sessionSettings,
      })
      log('✅ Connected successfully!')
    } catch (err: any) {
      log('❌ Connect error: ' + (err?.message || JSON.stringify(err)))
      setError(err?.message || String(err))
    }
  }

  // Method 3: Connect, wait for chat_metadata, THEN send session_settings
  const handleConnectThenSend = async () => {
    if (!token) {
      log('❌ No token available')
      return
    }

    log('🔄 METHOD 3: Connect, wait for chat_metadata, then send variables...')
    log(`Config ID: ${CONFIG_ID}`)
    log(`User name: ${userName}`)

    try {
      await connect({
        auth: { type: 'accessToken', value: token },
        configId: CONFIG_ID
      })
      log('✅ Connected! Waiting for chat_metadata message...')

      // Wait for chat_metadata (first message after connection)
      // Poll the messages array for up to 3 seconds
      let foundMetadata = false
      for (let i = 0; i < 30; i++) {
        await new Promise(resolve => setTimeout(resolve, 100))
        const hasMetadata = messages.some((m: any) => m.type === 'chat_metadata')
        if (hasMetadata) {
          foundMetadata = true
          log('✅ Received chat_metadata!')
          break
        }
      }

      if (!foundMetadata) {
        log('⚠️ No chat_metadata received, sending anyway...')
      }

      // Send session_settings message with EXPLICIT type field
      // This is the exact format from Hume docs
      const settings = {
        type: 'session_settings' as const,
        variables: {
          first_name: userName,
          is_authenticated: 'true',
          current_country: 'United Kingdom'
        }
      }
      log(`Sending: ${JSON.stringify(settings)}`)

      // Note: sendSessionSettings might strip the type, so log what we're sending
      sendSessionSettings(settings as any)
      log('✅ Session settings sent! Check for W0106 warning...')
    } catch (err: any) {
      log('❌ Connect error: ' + (err?.message || JSON.stringify(err)))
      setError(err?.message || String(err))
    }
  }

  const handleDisconnect = () => {
    log('🔄 Disconnecting...')
    disconnect()
    log('✅ Disconnected')
  }

  const clearLogs = () => setLogs([])

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Hume Voice Debug Test</h1>

        {/* Status Panel */}
        <div className="bg-gray-800 rounded-lg p-4 mb-4">
          <h2 className="font-semibold mb-2 text-yellow-400">Status</h2>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>Connection: <span className={`font-mono ${status.value === 'connected' ? 'text-green-400' : 'text-red-400'}`}>{status.value}</span></div>
            <div>Token: <span className="font-mono">{token ? '✅ Ready' : '⏳ Loading...'}</span></div>
            <div>Microphone: <span className={`font-mono ${micPermission === 'granted' ? 'text-green-400' : 'text-red-400'}`}>{micPermission}</span></div>
            <div>Muted: <span className={`font-mono ${isMuted ? 'text-yellow-400' : 'text-green-400'}`}>{isMuted ? 'YES' : 'NO'}</span></div>
            <div>Config: <span className="font-mono text-xs">{CONFIG_ID}</span></div>
            <div>Messages: <span className="font-mono">{messages.length}</span></div>
          </div>
          {error && <p className="text-red-400 mt-2">Error: {error}</p>}
        </div>

        {/* User Name Input */}
        <div className="bg-gray-800 rounded-lg p-4 mb-4">
          <label className="block text-sm mb-2">Test User Name:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="bg-gray-700 px-3 py-2 rounded text-white w-48"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={handleConnectBasic}
            disabled={!token || status.value === 'connected'}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 hover:bg-blue-700"
          >
            1. Connect (No Vars)
          </button>
          <button
            onClick={handleConnectWithVars}
            disabled={!token || status.value === 'connected'}
            className="px-4 py-2 bg-purple-600 text-white rounded disabled:opacity-50 hover:bg-purple-700"
          >
            2. Connect (With Vars)
          </button>
          <button
            onClick={handleConnectThenSend}
            disabled={!token || status.value === 'connected'}
            className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50 hover:bg-green-700"
          >
            3. Connect Then Send Vars
          </button>
          <button
            onClick={handleDisconnect}
            disabled={status.value !== 'connected'}
            className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50 hover:bg-red-700"
          >
            Disconnect
          </button>
          <button
            onClick={clearLogs}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Clear Logs
          </button>
        </div>

        {/* Logs Panel - FULL WIDTH */}
        <div className="bg-black rounded-lg p-4 font-mono text-sm mb-4">
          <h2 className="text-yellow-400 mb-2">Logs ({logs.length}):</h2>
          <div className="h-80 overflow-auto space-y-1">
            {logs.map((log, i) => (
              <div key={i} className="text-green-400 whitespace-pre-wrap break-all">{log}</div>
            ))}
            {logs.length === 0 && <div className="text-gray-500">No logs yet...</div>}
          </div>
        </div>

        {/* Messages Panel */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="font-semibold mb-2 text-yellow-400">Messages ({messages.length})</h2>
          <div className="max-h-48 overflow-auto text-sm space-y-2">
            {messages.slice(-10).map((msg: any, i) => (
              <div key={i} className="bg-gray-700 p-2 rounded">
                <span className="font-mono text-xs text-purple-400">{msg.type}</span>
                {msg.message?.content && (
                  <p className="text-gray-300 mt-1">{msg.message.content}</p>
                )}
              </div>
            ))}
            {messages.length === 0 && <div className="text-gray-500">No messages yet...</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TestHumePage() {
  return (
    <VoiceProvider>
      <VoiceTest />
    </VoiceProvider>
  )
}
