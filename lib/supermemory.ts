/**
 * Supermemory Integration for Conversational Context
 *
 * Provides persistent memory for conversations with Repo voice agent.
 * Memories are stored per user (containerTag) and can be searched semantically.
 *
 * Using Supermemory v3 API
 */

const SUPERMEMORY_API_URL = 'https://api.supermemory.ai/v3'

interface Memory {
  id: string
  content: string
  metadata?: Record<string, unknown>
  createdAt: string
}

interface AddMemoryResponse {
  id: string
  status: string
}

interface SearchResult {
  id: string
  content: string
  score: number
  metadata?: Record<string, unknown>
}

class SupermemoryClient {
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  /**
   * Add a document/memory for a user (v3 API)
   * Uses containerTag to group memories by user
   */
  async addMemory(
    userId: string,
    content: string,
    metadata?: Record<string, unknown>
  ): Promise<AddMemoryResponse> {
    console.log('[Supermemory] addMemory called for user:', userId)
    console.log('[Supermemory] Content preview:', content.substring(0, 100))

    // v3 API uses /documents endpoint with containerTag
    const response = await fetch(`${SUPERMEMORY_API_URL}/documents`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
        containerTag: userId,  // v3 uses containerTag instead of userId
        metadata: {
          ...metadata,
          source: 'fractional-quest',
          timestamp: new Date().toISOString(),
        },
      }),
    })

    console.log('[Supermemory] Response status:', response.status)

    if (!response.ok) {
      const error = await response.text()
      console.error('[Supermemory] Add FAILED:', response.status, error)
      throw new Error(`Failed to add memory: ${error}`)
    }

    const result = await response.json()
    console.log('[Supermemory] Add SUCCESS, id:', result.id, 'status:', result.status)
    return result
  }

  /**
   * Search memories for a user (v3 API)
   */
  async searchMemories(
    userId: string,
    query: string,
    limit = 10
  ): Promise<SearchResult[]> {
    const response = await fetch(`${SUPERMEMORY_API_URL}/search`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: query,
        containerTag: userId,  // v3 uses containerTag
        topK: limit,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('[Supermemory] Search error:', response.status, error)
      throw new Error(`Failed to search memories: ${error}`)
    }

    const data = await response.json()
    console.log('[Supermemory] Search returned', data.results?.length || 0, 'results')
    return data.results || []
  }

  /**
   * List documents for a user (v3 API)
   */
  async getMemories(userId: string, limit = 50): Promise<Memory[]> {
    const response = await fetch(`${SUPERMEMORY_API_URL}/documents/list`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        containerTag: userId,
        limit,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('[Supermemory] List error:', response.status, error)
      throw new Error(`Failed to get memories: ${error}`)
    }

    const data = await response.json()
    return data.documents || data.memories || []
  }

  /**
   * Delete a document (v3 API)
   */
  async deleteMemory(memoryId: string): Promise<void> {
    const response = await fetch(`${SUPERMEMORY_API_URL}/documents/${memoryId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('[Supermemory] Delete error:', response.status, error)
      throw new Error(`Failed to delete memory: ${error}`)
    }
  }
}

// Singleton instance
let supermemoryClient: SupermemoryClient | null = null

export function getSupermemoryClient(): SupermemoryClient | null {
  const apiKey = process.env.SUPERMEMORY_API_KEY

  if (!apiKey) {
    console.warn('SUPERMEMORY_API_KEY not configured')
    return null
  }

  if (!supermemoryClient) {
    supermemoryClient = new SupermemoryClient(apiKey)
  }

  return supermemoryClient
}

/**
 * Store conversation context for a user
 */
export async function storeConversationMemory(
  userId: string,
  transcript: string,
  extractedData?: {
    skills?: string[]
    companies?: string[]
    preferences?: string[]
  }
): Promise<void> {
  const client = getSupermemoryClient()
  if (!client) return

  try {
    // Store the conversation transcript
    await client.addMemory(userId, transcript, {
      type: 'conversation',
      extractedData,
    })

    // Also store individual extracted items as separate memories for better retrieval
    if (extractedData?.skills?.length) {
      await client.addMemory(
        userId,
        `Skills mentioned: ${extractedData.skills.join(', ')}`,
        { type: 'skills' }
      )
    }

    if (extractedData?.companies?.length) {
      await client.addMemory(
        userId,
        `Companies mentioned: ${extractedData.companies.join(', ')}`,
        { type: 'companies' }
      )
    }

    if (extractedData?.preferences?.length) {
      await client.addMemory(
        userId,
        `Preferences: ${extractedData.preferences.join(', ')}`,
        { type: 'preferences' }
      )
    }
  } catch (error) {
    console.error('Error storing conversation memory:', error)
  }
}

/**
 * Get relevant context for a conversation
 */
export async function getConversationContext(
  userId: string,
  currentQuery: string
): Promise<string> {
  const client = getSupermemoryClient()
  if (!client) return ''

  try {
    const memories = await client.searchMemories(userId, currentQuery, 5)

    if (memories.length === 0) return ''

    const context = memories
      .map(m => m.content)
      .join('\n\n')

    return `Previous context:\n${context}`
  } catch (error) {
    console.error('Error getting conversation context:', error)
    return ''
  }
}

export { SupermemoryClient }
