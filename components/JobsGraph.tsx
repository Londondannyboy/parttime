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
  totalJobs: number
  uniqueSkills: number
  uniqueCompanies: number
  topSkills: Array<{ skill: string; count: number }>
  topCompanies: Array<{ company: string; count: number }>
}

interface JobsGraphProps {
  roleFilter?: string
  limit?: number
}

export function JobsGraph({ roleFilter, limit = 20 }: JobsGraphProps) {
  const [data, setData] = useState<GraphData | null>(null)
  const [stats, setStats] = useState<GraphStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchGraph() {
      setLoading(true)
      setError(null)

      try {
        const params = new URLSearchParams()
        if (roleFilter) params.set('role', roleFilter)
        params.set('limit', String(limit))

        const response = await fetch(`/api/graph/jobs?${params.toString()}`)
        if (!response.ok) {
          throw new Error('Failed to fetch graph')
        }

        const result = await response.json()
        setData(result.graph)
        setStats(result.stats)
      } catch (err) {
        console.error('Error fetching jobs graph:', err)
        setError('Could not load jobs graph')
      } finally {
        setLoading(false)
      }
    }

    fetchGraph()
  }, [roleFilter, limit])

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Jobs Knowledge Graph</h3>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" />
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Jobs Knowledge Graph</h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          {error || 'No jobs data available'}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Jobs Knowledge Graph</h3>
          <p className="text-sm text-gray-500">
            Relationships between jobs, skills, and companies
          </p>
        </div>
        {stats && (
          <div className="flex gap-4 text-sm">
            <div className="text-center">
              <span className="font-semibold text-green-600">{stats.totalJobs}</span>
              <p className="text-gray-500 text-xs">Jobs</p>
            </div>
            <div className="text-center">
              <span className="font-semibold text-blue-600">{stats.uniqueSkills}</span>
              <p className="text-gray-500 text-xs">Skills</p>
            </div>
            <div className="text-center">
              <span className="font-semibold text-amber-600">{stats.uniqueCompanies}</span>
              <p className="text-gray-500 text-xs">Companies</p>
            </div>
          </div>
        )}
      </div>

      <KnowledgeGraph
        data={data}
        width={800}
        height={450}
        onNodeClick={(node) => {
          console.log('Clicked node:', node)
          // Could navigate to job or filter by skill
        }}
      />

      {/* Top Skills and Companies */}
      {stats && (stats.topSkills.length > 0 || stats.topCompanies.length > 0) && (
        <div className="mt-6 grid grid-cols-2 gap-6">
          {/* Top Skills */}
          {stats.topSkills.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Most Requested Skills</h4>
              <div className="space-y-2">
                {stats.topSkills.slice(0, 5).map(({ skill, count }) => (
                  <div key={skill} className="flex items-center gap-2">
                    <div
                      className="h-2 bg-blue-500 rounded-full"
                      style={{
                        width: `${(count / stats.topSkills[0].count) * 100}%`,
                        minWidth: '20px',
                      }}
                    />
                    <span className="text-sm text-gray-600 truncate flex-1">{skill}</span>
                    <span className="text-xs text-gray-400">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top Companies */}
          {stats.topCompanies.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Top Hiring Companies</h4>
              <div className="space-y-2">
                {stats.topCompanies.map(({ company, count }) => (
                  <div key={company} className="flex items-center gap-2">
                    <div
                      className="h-2 bg-amber-500 rounded-full"
                      style={{
                        width: `${(count / stats.topCompanies[0].count) * 100}%`,
                        minWidth: '20px',
                      }}
                    />
                    <span className="text-sm text-gray-600 truncate flex-1">{company}</span>
                    <span className="text-xs text-gray-400">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-4 text-xs text-gray-400 text-center">
        Click on nodes to see details • Jobs are green, skills are blue, companies are amber
      </div>
    </div>
  )
}

export default JobsGraph
