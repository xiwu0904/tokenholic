// Common types
export interface ApiResponse<T> {
  data: T
  message?: string
  status: string
}

// Customer types
export interface Customer {
  id: string
  name: string
  industry?: string
  website?: string
  description?: string
  created_at: string
  updated_at: string
}

// Token Map types
export interface TokenMapData {
  id: string
  customer_id: string
  customer_name: string
  layers: TokenMapLayer[]
  providers: ProviderDistribution[]
  total_tokens: number
  created_at: string
  updated_at: string
}

export interface TokenMapLayer {
  name: string
  use_cases: UseCase[]
}

export interface UseCase {
  id: string
  name: string
  description: string
  token_estimate: number
  provider: string
  confidence: number
}

export interface ProviderDistribution {
  name: string
  token_count: number
  percentage: number
}

// Solution types
export interface Solution {
  id: string
  customer_id?: string
  requirements: string
  recommendation: string
  products: RecommendedProduct[]
  sources: string[]
  versions: SolutionVersion[]
  created_at: string
  updated_at: string
}

export interface RecommendedProduct {
  name: string
  description: string
  relevance_score: number
}

export interface SolutionVersion {
  version: number
  content: string
  created_at: string
  feedback?: string
}

// Role Play types
export interface RolePlaySession {
  id: string
  scenario: string
  difficulty: 'easy' | 'medium' | 'hard'
  context?: string
  messages: ChatMessage[]
  scores: SessionScore[]
  final_score: number
  started_at: string
  ended_at?: string
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export interface SessionScore {
  message_index: number
  score: number
  strengths: string[]
  improvements: string[]
}
