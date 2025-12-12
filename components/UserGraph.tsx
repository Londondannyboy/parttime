'use client'

import { useEffect, useState } from 'react'
import { KnowledgeGraph } from './KnowledgeGraph'

interface GraphNode {
  id: string
  type: 'user' | 'skill' | 'job' | 'company' | 'preference' | 'fact'
  label: string
  data?: Record<string, unknown>
}

interface GraphEdge {
  source: string
  target: string
  type: string
  weight?: number
  label?: string
}

interface GraphData {
  nodes: GraphNode[]
  edges: GraphEdge[]
}

interface GraphStats {
  skillCount: number
  companyCount: number
  preferenceCount: number
  matchedJobCount: number
  nodeCount?: number
  edgeCount?: number
}

interface UserGraphProps {
  userId: string
  refreshTrigger?: number
}

export function UserGraph({ userId, refreshTrigger = 0 }: UserGraphProps) {
  const [data, setData] = useState<GraphData | null>(null)
  const [stats, setStats] = useState<GraphStats | null>(null)
  const [source, setSource] = useState<'zep' | 'local' | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchGraph() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/graph/user?userId=${userId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch graph')
        }

        const result = await response.json()
        setData(result.graph)
        setStats(result.stats)
        setSource(result.source || 'local')
      } catch (err) {
        console.error('Error fetching user graph:', err)
        setError('Could not load your knowledge graph')
      } finally {
        setLoading(false)
      }
    }

    fetchGraph()
  }, [userId, refreshTrigger])

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Knowledge Graph</h3>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Knowledge Graph</h3>
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
          </div>
          <p className="text-gray-500 mb-2">No graph data yet</p>
          <p className="text-sm text-gray-400">
            Talk to Quest to build your professional profile
          </p>
        </div>
      </div>
    )
  }

  // Check if we have meaningful data
  const hasData = data.nodes.length > 1 // More than just the user node

  if (!hasData) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Knowledge Graph</h3>
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mb-4">
            <span className="text-4xl">🧠</span>
          </div>
          <p className="text-gray-600 mb-2">Start Building Your Graph</p>
          <p className="text-sm text-gray-500 max-w-xs">
            Your knowledge graph will show your skills, experience, and how they connect to opportunities. Speak with Quest to populate it.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900">Your Knowledge Graph</h3>
            {source === 'zep' && (
              <span className="px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
                Zep Cloud
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500">
            Visual map of your skills, experience, and opportunities
          </p>
        </div>
        {stats && (
          <div className="flex gap-4 text-sm">
            {source === 'zep' ? (
              <>
                <div className="text-center">
                  <span className="font-semibold text-purple-600">{stats.nodeCount || 0}</span>
                  <p className="text-gray-500 text-xs">Entities</p>
                </div>
                <div className="text-center">
                  <span className="font-semibold text-blue-600">{stats.edgeCount || 0}</span>
                  <p className="text-gray-500 text-xs">Facts</p>
                </div>
              </>
            ) : (
              <>
                <div className="text-center">
                  <span className="font-semibold text-blue-600">{stats.skillCount}</span>
                  <p className="text-gray-500 text-xs">Skills</p>
                </div>
                <div className="text-center">
                  <span className="font-semibold text-amber-600">{stats.companyCount}</span>
                  <p className="text-gray-500 text-xs">Companies</p>
                </div>
                <div className="text-center">
                  <span className="font-semibold text-green-600">{stats.matchedJobCount}</span>
                  <p className="text-gray-500 text-xs">Matches</p>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <KnowledgeGraph
        data={data}
        width={800}
        height={400}
        onNodeClick={(node) => {
          console.log('Clicked node:', node)
        }}
      />

      <div className="mt-4 text-xs text-gray-400 text-center">
        {source === 'zep' ? (
          'Powered by Zep Knowledge Graph • Click nodes for details'
        ) : (
          'Click on nodes to see details • Hover to highlight connections'
        )}
      </div>
    </div>
  )
}

export default UserGraph
