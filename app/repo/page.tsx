'use client'

import { useState, useEffect, useCallback } from 'react'
import { useUser } from '@stackframe/stack'
import { VoiceProvider, useVoice } from '@humeai/voice-react'
import Link from 'next/link'

const CONFIG_ID = 'd57ceb71-4cf5-47e9-87cd-6052445a031c'

interface Message {
  type: string
  message?: { content?: string }
}

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

  // Filter to user and assistant messages
  const conversationMessages = messages.filter(
    (m: Message) => m.type === 'user_message' || m.type === 'assistant_message'
  )

  return (
    <div className="flex-1 flex flex-col">
      {/* Main Voice Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-purple-50 to-white">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {profile?.first_name ? `Hi ${profile.first_name}` : 'Your Repo'}
          </h1>
          <p className="text-gray-600">
            Talk to Quest about your experience, skills, and career goals
          </p>
        </div>

        {/* Mic Button */}
        <button
          onClick={isConnected ? disconnect : handleConnect}
          disabled={isConnecting}
          className={`w-32 h-32 rounded-full text-white font-bold text-lg shadow-xl transition-all ${
            isConnected
              ? 'bg-green-500 hover:bg-green-600 animate-pulse'
              : isConnecting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700'
          }`}
        >
          {isConnected ? (
            <span className="flex flex-col items-center">
              <MicIcon className="w-10 h-10 mb-1" />
              <span className="text-sm">Stop</span>
            </span>
          ) : isConnecting ? (
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto" />
          ) : (
            <span className="flex flex-col items-center">
              <MicIcon className="w-10 h-10 mb-1" />
              <span className="text-sm">Speak</span>
            </span>
          )}
        </button>

        <p className="mt-4 text-sm text-gray-500">
          {isConnected ? (isPlaying ? 'Quest is speaking...' : 'Listening...') : 'Tap to start'}
        </p>
      </div>

      {/* Conversation Panel */}
      {conversationMessages.length > 0 && (
        <div className="border-t border-gray-200 bg-white p-6 max-h-80 overflow-y-auto">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Conversation</h3>
          <div className="space-y-4">
            {conversationMessages.map((msg: Message, i: number) => (
              <div
                key={i}
                className={`flex ${msg.type === 'user_message' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.type === 'user_message'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{msg.message?.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function RepoPage() {
  const user = useUser({ or: 'redirect' })
  const [token, setToken] = useState<string | null>(null)
  const [profile, setProfile] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)

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

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-72' : 'w-20'} bg-white border-r border-gray-200 flex flex-col transition-all duration-300 shadow-sm`}>
        {/* Logo */}
        <div className="p-5 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            {sidebarOpen && (
              <div>
                <span className="text-gray-900 font-bold">Fractional</span>
                <span className="text-purple-600">.Quest</span>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <NavItem icon={<MicIcon />} label="Repo" href="/repo" active collapsed={!sidebarOpen} />
          <NavItem icon={<BriefcaseIcon />} label="Jobs" href="/fractionaljobsuk" collapsed={!sidebarOpen} />
          <NavItem icon={<ArticleIcon />} label="Articles" href="/fractional-jobs-articles" collapsed={!sidebarOpen} />
          <NavItem icon={<ChatIcon />} label="Chat" href="/chat" collapsed={!sidebarOpen} />
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-100">
          <div className={`flex items-center gap-3 p-3 rounded-xl bg-gray-50 ${sidebarOpen ? '' : 'justify-center'}`}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-semibold">
                {profile?.first_name?.charAt(0) || user.displayName?.charAt(0) || 'U'}
              </span>
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 text-sm font-medium truncate">
                  {profile?.first_name || user.displayName || 'User'}
                </p>
                <p className="text-gray-500 text-xs truncate">{user.primaryEmail}</p>
              </div>
            )}
          </div>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-4 border-t border-gray-100 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
        >
          {sidebarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {error ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-red-500 text-2xl">!</span>
              </div>
              <p className="text-gray-600">Voice service unavailable</p>
              <p className="text-red-500 text-sm mt-2">{error}</p>
            </div>
          </div>
        ) : !token ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading voice assistant...</p>
            </div>
          </div>
        ) : (
          <VoiceProvider
            onError={(err) => console.error('[Hume Error]', err)}
            onClose={(e) => console.warn('[Hume Close]', e?.code, e?.reason)}
          >
            <VoiceInterface
              token={token}
              userId={user.id}
              profile={profile}
            />
          </VoiceProvider>
        )}
      </main>
    </div>
  )
}

// Components
function NavItem({ icon, label, href, active, collapsed }: {
  icon: React.ReactNode
  label: string
  href: string
  active?: boolean
  collapsed?: boolean
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        active
          ? 'bg-purple-50 text-purple-700 font-medium'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
      } ${collapsed ? 'justify-center' : ''}`}
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </Link>
  )
}

// Icons
function MicIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
    </svg>
  )
}

function BriefcaseIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  )
}

function ArticleIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
    </svg>
  )
}

function ChevronLeftIcon() {
  return (
    <svg className="w-5 h-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg className="w-5 h-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
    </svg>
  )
}
