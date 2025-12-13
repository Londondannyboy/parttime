'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface ExtractedPreference {
  type: 'role' | 'industry' | 'location' | 'availability' | 'day_rate' | 'skill'
  values: string[]
  confidence: 'high' | 'medium' | 'low'
  raw_text: string
}

interface ValidationItem {
  id: string
  preference: ExtractedPreference
  status: 'extracting' | 'soft' | 'hard' | 'confirmed' | 'fading'
  opacity: number
}

interface RepoBuilderProps {
  userId?: string
  voiceTranscript?: string  // From Hume voice
  onPreferenceSaved?: (pref: ExtractedPreference, validated: boolean) => void
}

const TYPE_LABELS: Record<string, string> = {
  role: 'Role',
  industry: 'Industry',
  location: 'Location',
  availability: 'Availability',
  day_rate: 'Day Rate',
  skill: 'Skill'
}

const TYPE_ICONS: Record<string, string> = {
  role: '👔',
  industry: '🏢',
  location: '📍',
  availability: '📅',
  day_rate: '💷',
  skill: '⚡'
}

export default function RepoBuilder({ userId, voiceTranscript, onPreferenceSaved }: RepoBuilderProps) {
  const [textInput, setTextInput] = useState('')
  const [fullTranscript, setFullTranscript] = useState('')
  const [validations, setValidations] = useState<ValidationItem[]>([])
  const [isExtracting, setIsExtracting] = useState(false)

  const lastProcessedText = useRef('')
  const extractionTimeout = useRef<NodeJS.Timeout | null>(null)

  // Combine voice transcript with any typed text
  useEffect(() => {
    const combined = [voiceTranscript, textInput].filter(Boolean).join('\n')
    setFullTranscript(combined)
  }, [voiceTranscript, textInput])

  // Extract preferences when transcript changes (debounced)
  useEffect(() => {
    if (!fullTranscript || fullTranscript === lastProcessedText.current) return

    // Clear existing timeout
    if (extractionTimeout.current) {
      clearTimeout(extractionTimeout.current)
    }

    // Debounce extraction by 1.5 seconds
    extractionTimeout.current = setTimeout(async () => {
      await extractPreferences(fullTranscript)
      lastProcessedText.current = fullTranscript
    }, 1500)

    return () => {
      if (extractionTimeout.current) {
        clearTimeout(extractionTimeout.current)
      }
    }
  }, [fullTranscript])

  // Extract preferences from text
  const extractPreferences = async (text: string) => {
    setIsExtracting(true)

    try {
      // Call Pydantic AI extraction endpoint
      const response = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: text })
      })

      if (!response.ok) return

      const { preferences, should_confirm } = await response.json()

      // Add new validations
      for (const pref of preferences as ExtractedPreference[]) {
        const id = `${pref.type}:${pref.values.join(',')}`

        // Skip if already exists
        if (validations.some(v => v.id === id)) continue

        // Use Pydantic AI's requires_hard_validation field
        const isHard = (pref as any).requires_hard_validation === true

        const newValidation: ValidationItem = {
          id,
          preference: pref,
          status: isHard ? 'hard' : 'soft',
          opacity: 1
        }

        setValidations(prev => [...prev, newValidation])

        // If soft, start fading after 5 seconds
        if (!isHard) {
          startFading(id)
        }
      }
    } catch (error) {
      console.error('[RepoBuilder] Extraction error:', error)
    } finally {
      setIsExtracting(false)
    }
  }

  // Start fading a soft validation
  const startFading = (id: string) => {
    // Wait 5 seconds, then start fade
    setTimeout(() => {
      setValidations(prev => prev.map(v =>
        v.id === id ? { ...v, status: 'fading' as const, opacity: 0.6 } : v
      ))

      // After another 3 seconds, save as unvalidated and remove
      setTimeout(() => {
        setValidations(prev => {
          const item = prev.find(v => v.id === id)
          if (item && item.status === 'fading') {
            // Save as unvalidated
            savePreference(item.preference, false)
            return prev.filter(v => v.id !== id)
          }
          return prev
        })
      }, 3000)
    }, 5000)
  }

  // Confirm a validation
  const confirmValidation = (id: string) => {
    const item = validations.find(v => v.id === id)
    if (!item) return

    setValidations(prev => prev.map(v =>
      v.id === id ? { ...v, status: 'confirmed' as const } : v
    ))

    savePreference(item.preference, true)

    // Remove after animation
    setTimeout(() => {
      setValidations(prev => prev.filter(v => v.id !== id))
    }, 1000)
  }

  // Dismiss a validation
  const dismissValidation = (id: string) => {
    setValidations(prev => prev.filter(v => v.id !== id))
  }

  // Save preference to backend
  const savePreference = async (pref: ExtractedPreference, validated: boolean) => {
    if (!userId) return

    try {
      await fetch('/api/save-repo-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          preference_type: pref.type,
          values: pref.values,
          validated,
          raw_text: pref.raw_text
        })
      })

      onPreferenceSaved?.(pref, validated)
    } catch (error) {
      console.error('[RepoBuilder] Save error:', error)
    }
  }

  // Handle text input submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!textInput.trim()) return

    // Text is already in fullTranscript via useEffect
    // Clear input after processing starts
    // setTextInput('') // Keep it so user can see what they typed
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-purple-50 to-amber-50 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <h3 className="text-sm font-semibold text-gray-800">Building your Repo</h3>
          {isExtracting && (
            <span className="text-xs text-gray-500 ml-auto">Analyzing...</span>
          )}
        </div>
      </div>

      {/* Transcript Display */}
      {fullTranscript && (
        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
          <p className="text-xs text-gray-500 mb-1">Transcript</p>
          <p className="text-sm text-gray-700 leading-relaxed">
            "{fullTranscript}"
          </p>
        </div>
      )}

      {/* Validation Items */}
      {validations.length > 0 && (
        <div className="px-4 py-3 space-y-2">
          <p className="text-xs text-gray-500 mb-2">Extracting preferences...</p>

          {validations.map((item) => (
            <div
              key={item.id}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-500 ${
                item.status === 'confirmed'
                  ? 'bg-green-50 border border-green-200'
                  : item.status === 'hard'
                  ? 'bg-amber-50 border border-amber-200'
                  : 'bg-gray-50 border border-gray-200'
              }`}
              style={{ opacity: item.opacity }}
            >
              {/* Icon */}
              <span className="text-lg">{TYPE_ICONS[item.preference.type] || '📌'}</span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500">{TYPE_LABELS[item.preference.type]}</p>
                <p className="text-sm font-medium text-gray-900 truncate">
                  {item.preference.values.join(', ')}
                </p>
              </div>

              {/* Actions */}
              {item.status === 'confirmed' ? (
                <span className="text-green-600 text-sm">✓ Added</span>
              ) : item.status === 'hard' ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => confirmValidation(item.id)}
                    className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-full transition-colors"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => dismissValidation(item.id)}
                    className="px-2 py-1 text-gray-400 hover:text-gray-600 text-xs"
                  >
                    ✕
                  </button>
                </div>
              ) : item.status === 'fading' ? (
                <span className="text-xs text-gray-400">Adding...</span>
              ) : (
                <button
                  onClick={() => confirmValidation(item.id)}
                  className="px-3 py-1 bg-gray-200 hover:bg-green-100 text-gray-600 hover:text-green-700 text-xs font-medium rounded-full transition-colors"
                >
                  ✓
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Text Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Type to add or correct..."
            className="flex-1 px-4 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-full transition-colors"
          >
            Add
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">
          Say "yes" to confirm, or type corrections
        </p>
      </form>
    </div>
  )
}
