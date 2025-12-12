/**
 * Zep Integration for Knowledge Graph Memory
 *
 * Uses Zep Cloud Graph API for:
 * - User graphs: Personal knowledge about each user (skills, experience, preferences)
 * - Jobs graph: Shared graph containing all jobs and their relationships
 * - Semantic search across both
 */

import { ZepClient } from '@getzep/zep-cloud'

// Graph node types for local visualization
export interface GraphNode {
  id: string
  type: 'user' | 'skill' | 'job' | 'company' | 'preference' | 'fact'
  label: string
  data?: Record<string, unknown>
}

export interface GraphEdge {
  source: string
  target: string
  type: string
  weight?: number
  label?: string
}

export interface GraphData {
  nodes: GraphNode[]
  edges: GraphEdge[]
}

// Zep entity types from the graph
export interface ZepNode {
  uuid: string
  name: string
  labels?: string[]
  summary?: string
  createdAt?: string
}

export interface ZepEdge {
  uuid: string
  fact: string
  sourceNodeUuid: string
  targetNodeUuid: string
  validAt?: string
  invalidAt?: string
  createdAt?: string
}

// Singleton Zep client
let zepClient: ZepClient | null = null

const JOBS_GRAPH_ID = 'fractional-jobs-graph'

export function getZepClient(): ZepClient | null {
  const apiKey = process.env.ZEP_API_KEY

  if (!apiKey) {
    console.warn('ZEP_API_KEY not configured - Zep features disabled')
    return null
  }

  if (!zepClient) {
    zepClient = new ZepClient({ apiKey })
  }

  return zepClient
}

// ============================================
// USER MANAGEMENT
// ============================================

/**
 * Create or get a user in Zep
 */
export async function ensureZepUser(
  userId: string,
  metadata?: { email?: string; firstName?: string; lastName?: string }
): Promise<boolean> {
  const client = getZepClient()
  if (!client) return false

  try {
    // Try to get existing user
    await client.user.get(userId)
    return true
  } catch {
    // Create new user if not exists
    try {
      await client.user.add({
        userId,
        email: metadata?.email,
        firstName: metadata?.firstName,
        lastName: metadata?.lastName,
        metadata: {
          source: 'fractional-quest',
          createdAt: new Date().toISOString(),
        },
      })
      console.log(`Created Zep user: ${userId}`)
      return true
    } catch (error) {
      console.error('Error creating Zep user:', error)
      return false
    }
  }
}

// ============================================
// USER GRAPH OPERATIONS
// ============================================

/**
 * Add data to a user's graph in Zep
 * This creates entities and relationships that Zep extracts automatically
 */
export async function addToUserGraph(
  userId: string,
  data: Record<string, unknown>,
  dataType: 'json' | 'text' = 'json'
): Promise<string | null> {
  const client = getZepClient()
  if (!client) return null

  try {
    await ensureZepUser(userId)

    const episode = await client.graph.add({
      userId,
      type: dataType,
      data: dataType === 'json' ? JSON.stringify(data) : String(data),
    })

    console.log(`Added data to user ${userId} graph`)
    return episode?.uuid || null
  } catch (error) {
    console.error('Error adding to user graph:', error)
    return null
  }
}

/**
 * Sync user profile data to their Zep graph
 */
export async function syncUserProfileToZep(
  userId: string,
  profile: {
    skills: Array<{ name: string; category: string; yearsExperience?: number; proficiency?: string }>
    experiences: Array<{ company: string; role: string; startYear?: number; endYear?: number; isCurrent?: boolean }>
    preferences: {
      roleTypes?: string[]
      locations?: string[]
      remotePreference?: string
      dayRateMin?: number
      dayRateMax?: number
      industries?: string[]
    }
  }
): Promise<boolean> {
  const client = getZepClient()
  if (!client) return false

  try {
    await ensureZepUser(userId)

    // Sync skills as structured data
    if (profile.skills.length > 0) {
      const skillsData = {
        type: 'user_skills',
        skills: profile.skills.map(s => ({
          name: s.name,
          category: s.category,
          years_experience: s.yearsExperience,
          proficiency: s.proficiency,
        })),
        user_context: `This person has ${profile.skills.length} professional skills`,
      }
      await client.graph.add({
        userId,
        type: 'json',
        data: JSON.stringify(skillsData),
      })
    }

    // Sync experiences
    if (profile.experiences.length > 0) {
      const experienceData = {
        type: 'work_experience',
        experiences: profile.experiences.map(e => ({
          company_name: e.company,
          role_title: e.role,
          start_year: e.startYear,
          end_year: e.endYear,
          is_current: e.isCurrent,
        })),
        user_context: `This person has worked at ${profile.experiences.length} companies`,
      }
      await client.graph.add({
        userId,
        type: 'json',
        data: JSON.stringify(experienceData),
      })
    }

    // Sync preferences
    if (profile.preferences) {
      const prefsData = {
        type: 'job_preferences',
        ...profile.preferences,
        user_context: 'These are the user\'s job search preferences',
      }
      await client.graph.add({
        userId,
        type: 'json',
        data: JSON.stringify(prefsData),
      })
    }

    console.log(`Synced profile for user ${userId} to Zep`)
    return true
  } catch (error) {
    console.error('Error syncing user profile to Zep:', error)
    return false
  }
}

/**
 * Get nodes from a user's graph
 */
export async function getUserGraphNodes(userId: string): Promise<ZepNode[]> {
  const client = getZepClient()
  if (!client) return []

  try {
    const response = await client.graph.node.getByUserId(userId, {})
    // Response is the array directly, not an object with nodes property
    return (response || []) as ZepNode[]
  } catch (error) {
    console.error('Error getting user graph nodes:', error)
    return []
  }
}

/**
 * Get edges (facts/relationships) from a user's graph
 */
export async function getUserGraphEdges(userId: string): Promise<ZepEdge[]> {
  const client = getZepClient()
  if (!client) return []

  try {
    const response = await client.graph.edge.getByUserId(userId, {})
    // Response is the array directly, not an object with edges property
    return (response || []) as ZepEdge[]
  } catch (error) {
    console.error('Error getting user graph edges:', error)
    return []
  }
}

/**
 * Search a user's graph for relevant information
 */
export async function searchUserGraph(
  userId: string,
  query: string,
  options?: { limit?: number; scope?: 'nodes' | 'edges' | 'episodes' }
): Promise<{ nodes: ZepNode[]; edges: ZepEdge[] }> {
  const client = getZepClient()
  if (!client) return { nodes: [], edges: [] }

  try {
    const [nodesResult, edgesResult] = await Promise.all([
      client.graph.search({
        userId,
        query,
        scope: 'nodes',
        limit: options?.limit || 10,
      }),
      client.graph.search({
        userId,
        query,
        scope: 'edges',
        limit: options?.limit || 10,
      }),
    ])

    return {
      nodes: (nodesResult.nodes || []) as ZepNode[],
      edges: (edgesResult.edges || []) as ZepEdge[],
    }
  } catch (error) {
    console.error('Error searching user graph:', error)
    return { nodes: [], edges: [] }
  }
}

// ============================================
// SHARED JOBS GRAPH OPERATIONS
// ============================================

/**
 * Ensure the shared jobs graph exists
 */
export async function ensureJobsGraph(): Promise<boolean> {
  const client = getZepClient()
  if (!client) return false

  try {
    // Try to get existing graph
    await client.graph.get(JOBS_GRAPH_ID)
    return true
  } catch {
    // Create the graph if it doesn't exist
    try {
      await client.graph.create({
        graphId: JOBS_GRAPH_ID,
        name: 'Fractional Jobs Knowledge Graph',
        description: 'Shared graph containing all fractional job opportunities, their required skills, and company relationships',
      })
      console.log(`Created jobs graph: ${JOBS_GRAPH_ID}`)
      return true
    } catch (error) {
      console.error('Error creating jobs graph:', error)
      return false
    }
  }
}

/**
 * Sync a job to the shared jobs graph
 */
export async function syncJobToZep(job: {
  id: string
  title: string
  company: string
  location: string
  skills: string[]
  description?: string
  dayRate?: { min?: number; max?: number }
  roleCategory?: string
}): Promise<boolean> {
  const client = getZepClient()
  if (!client) return false

  try {
    await ensureJobsGraph()

    const jobData = {
      type: 'fractional_job',
      job_id: job.id,
      title: job.title,
      company_name: job.company,
      location: job.location,
      required_skills: job.skills,
      description: job.description,
      day_rate_min: job.dayRate?.min,
      day_rate_max: job.dayRate?.max,
      role_category: job.roleCategory,
      context: `${job.title} role at ${job.company} in ${job.location} requiring skills: ${job.skills.join(', ')}`,
    }

    await client.graph.add({
      graphId: JOBS_GRAPH_ID,
      type: 'json',
      data: JSON.stringify(jobData),
    })

    console.log(`Synced job ${job.id} to Zep jobs graph`)
    return true
  } catch (error) {
    console.error('Error syncing job to Zep:', error)
    return false
  }
}

/**
 * Bulk sync jobs to Zep
 */
export async function syncJobsToZep(jobs: Array<{
  id: string
  title: string
  company: string
  location: string
  skills: string[]
  description?: string
  dayRate?: { min?: number; max?: number }
  roleCategory?: string
}>): Promise<{ success: number; failed: number }> {
  let success = 0
  let failed = 0

  for (const job of jobs) {
    const result = await syncJobToZep(job)
    if (result) {
      success++
    } else {
      failed++
    }
  }

  return { success, failed }
}

/**
 * Search the jobs graph
 */
export async function searchJobsGraph(
  query: string,
  options?: { limit?: number }
): Promise<{ nodes: ZepNode[]; edges: ZepEdge[] }> {
  const client = getZepClient()
  if (!client) return { nodes: [], edges: [] }

  try {
    await ensureJobsGraph()

    const [nodesResult, edgesResult] = await Promise.all([
      client.graph.search({
        graphId: JOBS_GRAPH_ID,
        query,
        scope: 'nodes',
        limit: options?.limit || 20,
      }),
      client.graph.search({
        graphId: JOBS_GRAPH_ID,
        query,
        scope: 'edges',
        limit: options?.limit || 20,
      }),
    ])

    return {
      nodes: (nodesResult.nodes || []) as ZepNode[],
      edges: (edgesResult.edges || []) as ZepEdge[],
    }
  } catch (error) {
    console.error('Error searching jobs graph:', error)
    return { nodes: [], edges: [] }
  }
}

// ============================================
// GRAPH VISUALIZATION HELPERS
// ============================================

/**
 * Convert Zep graph data to visualization format
 */
export function convertZepToGraphData(
  userId: string,
  nodes: ZepNode[],
  edges: ZepEdge[]
): GraphData {
  const graphNodes: GraphNode[] = []
  const graphEdges: GraphEdge[] = []
  const nodeMap = new Map<string, string>() // uuid -> our id

  // Add user as central node
  graphNodes.push({
    id: `user-${userId}`,
    type: 'user',
    label: 'You',
    data: { central: true },
  })

  // Convert Zep nodes
  nodes.forEach((node, i) => {
    const nodeId = `zep-node-${i}`
    nodeMap.set(node.uuid, nodeId)

    // Determine node type from labels
    const labels = node.labels || []
    let nodeType: GraphNode['type'] = 'fact'
    if (labels.some(l => l.toLowerCase().includes('skill'))) nodeType = 'skill'
    else if (labels.some(l => l.toLowerCase().includes('company') || l.toLowerCase().includes('organization'))) nodeType = 'company'
    else if (labels.some(l => l.toLowerCase().includes('job') || l.toLowerCase().includes('role'))) nodeType = 'job'
    else if (labels.some(l => l.toLowerCase().includes('preference'))) nodeType = 'preference'

    graphNodes.push({
      id: nodeId,
      type: nodeType,
      label: node.name,
      data: {
        uuid: node.uuid,
        summary: node.summary,
        labels: node.labels,
      },
    })

    // Connect to user node for user graphs
    graphEdges.push({
      source: `user-${userId}`,
      target: nodeId,
      type: 'related_to',
    })
  })

  // Convert Zep edges (facts)
  edges.forEach((edge, i) => {
    const sourceId = nodeMap.get(edge.sourceNodeUuid)
    const targetId = nodeMap.get(edge.targetNodeUuid)

    if (sourceId && targetId) {
      graphEdges.push({
        source: sourceId,
        target: targetId,
        type: 'fact',
        label: edge.fact?.substring(0, 50) || undefined,
      })
    }
  })

  return { nodes: graphNodes, edges: graphEdges }
}

/**
 * Build a user graph from local data (fallback when Zep unavailable)
 */
export async function buildUserGraph(
  userId: string,
  userSkills: Array<{ id: string; name: string; category: string; confidence: number }>,
  userCompanies: Array<{ id: string; name: string; role?: string }>,
  userPreferences: Array<{ type: string; value: string }>,
  matchedJobs?: Array<{ id: string; title: string; company: string; matchScore: number }>
): Promise<GraphData> {
  const nodes: GraphNode[] = []
  const edges: GraphEdge[] = []

  // Add user as central node
  const userNode: GraphNode = {
    id: `user-${userId}`,
    type: 'user',
    label: 'You',
    data: { central: true },
  }
  nodes.push(userNode)

  // Add skills as nodes
  userSkills.forEach(skill => {
    const skillNode: GraphNode = {
      id: `skill-${skill.id}`,
      type: 'skill',
      label: skill.name,
      data: { category: skill.category, confidence: skill.confidence },
    }
    nodes.push(skillNode)

    edges.push({
      source: userNode.id,
      target: skillNode.id,
      type: 'has_skill',
      weight: skill.confidence,
      label: `${Math.round(skill.confidence * 100)}%`,
    })
  })

  // Add companies as nodes
  userCompanies.forEach(company => {
    const companyNode: GraphNode = {
      id: `company-${company.id}`,
      type: 'company',
      label: company.name,
      data: { role: company.role },
    }
    nodes.push(companyNode)

    edges.push({
      source: userNode.id,
      target: companyNode.id,
      type: 'worked_at',
      label: company.role,
    })
  })

  // Add preferences as nodes
  userPreferences.forEach((pref, i) => {
    const prefNode: GraphNode = {
      id: `pref-${i}`,
      type: 'preference',
      label: pref.value,
      data: { type: pref.type },
    }
    nodes.push(prefNode)

    edges.push({
      source: userNode.id,
      target: prefNode.id,
      type: 'prefers',
      label: pref.type,
    })
  })

  // Add matched jobs if provided
  if (matchedJobs) {
    matchedJobs.forEach(job => {
      const jobNode: GraphNode = {
        id: `job-${job.id}`,
        type: 'job',
        label: job.title,
        data: { company: job.company, matchScore: job.matchScore },
      }
      nodes.push(jobNode)

      edges.push({
        source: userNode.id,
        target: jobNode.id,
        type: 'matches',
        weight: job.matchScore,
        label: `${Math.round(job.matchScore * 100)}% match`,
      })
    })
  }

  return { nodes, edges }
}

/**
 * Build a jobs graph from local data (fallback when Zep unavailable)
 */
export async function buildJobsGraph(
  jobs: Array<{
    id: string
    title: string
    company: string
    skills: string[]
    location: string
  }>,
  limit = 20
): Promise<GraphData> {
  const nodes: GraphNode[] = []
  const edges: GraphEdge[] = []
  const skillsMap = new Map<string, string>()
  const companiesMap = new Map<string, string>()

  const processedJobs = jobs.slice(0, limit)

  processedJobs.forEach(job => {
    const jobNode: GraphNode = {
      id: `job-${job.id}`,
      type: 'job',
      label: job.title,
      data: { company: job.company, location: job.location },
    }
    nodes.push(jobNode)

    // Add or reference company node
    if (!companiesMap.has(job.company)) {
      const companyId = `company-${job.company.toLowerCase().replace(/\s+/g, '-')}`
      companiesMap.set(job.company, companyId)
      nodes.push({
        id: companyId,
        type: 'company',
        label: job.company,
      })
    }

    edges.push({
      source: `job-${job.id}`,
      target: companiesMap.get(job.company)!,
      type: 'at_company',
    })

    // Add or reference skill nodes
    job.skills.forEach(skillName => {
      if (!skillsMap.has(skillName)) {
        const skillId = `skill-${skillName.toLowerCase().replace(/\s+/g, '-')}`
        skillsMap.set(skillName, skillId)
        nodes.push({
          id: skillId,
          type: 'skill',
          label: skillName,
        })
      }

      edges.push({
        source: `job-${job.id}`,
        target: skillsMap.get(skillName)!,
        type: 'requires_skill',
      })
    })
  })

  return { nodes, edges }
}
