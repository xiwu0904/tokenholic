import { TokenMapData, Solution, RolePlaySession, Customer } from '../types'

// Mock Customers
export const mockCustomers: Customer[] = [
  {
    id: 'cust-001',
    name: 'ByteDance',
    industry: 'Technology',
    website: 'https://www.bytedance.com',
    description: 'Global technology company operating platforms like TikTok and Douyin',
    created_at: '2026-01-15T08:00:00Z',
    updated_at: '2026-02-01T10:30:00Z',
  },
  {
    id: 'cust-002',
    name: 'Ant Group',
    industry: 'Fintech',
    website: 'https://www.antgroup.com',
    description: 'Digital payment and financial services technology company',
    created_at: '2026-01-20T09:00:00Z',
    updated_at: '2026-02-05T14:20:00Z',
  },
  {
    id: 'cust-003',
    name: 'Meituan',
    industry: 'E-commerce',
    website: 'https://www.meituan.com',
    description: 'Chinese shopping platform for locally found consumer products',
    created_at: '2026-01-25T11:00:00Z',
    updated_at: '2026-02-10T16:45:00Z',
  },
]

// Mock Token Map Data
export const mockTokenMapData: TokenMapData = {
  id: 'map-001',
  customer_id: 'cust-001',
  customer_name: 'ByteDance',
  layers: [
    {
      name: 'External-Facing',
      use_cases: [
        {
          id: 'uc-001',
          name: 'Content Moderation',
          description: 'AI-powered content review for user-generated content',
          token_estimate: 50000000,
          provider: 'Azure OpenAI',
          confidence: 0.85,
        },
        {
          id: 'uc-002',
          name: 'Recommendation Engine',
          description: 'Personalized content recommendations for users',
          token_estimate: 120000000,
          provider: 'In-house',
          confidence: 0.95,
        },
        {
          id: 'uc-003',
          name: 'Translation Service',
          description: 'Multi-language content translation',
          token_estimate: 30000000,
          provider: 'Google Cloud',
          confidence: 0.75,
        },
      ],
    },
    {
      name: 'Internal Operations',
      use_cases: [
        {
          id: 'uc-004',
          name: 'Code Assistant',
          description: 'AI coding assistant for developers',
          token_estimate: 15000000,
          provider: 'GitHub Copilot',
          confidence: 0.90,
        },
        {
          id: 'uc-005',
          name: 'Customer Support',
          description: 'AI chatbot for customer inquiries',
          token_estimate: 8000000,
          provider: 'Azure OpenAI',
          confidence: 0.80,
        },
        {
          id: 'uc-006',
          name: 'Document Processing',
          description: 'Automated document analysis and summarization',
          token_estimate: 5000000,
          provider: 'AWS Bedrock',
          confidence: 0.70,
        },
      ],
    },
    {
      name: 'Data & Analytics',
      use_cases: [
        {
          id: 'uc-007',
          name: 'Data Insights',
          description: 'Natural language queries for business analytics',
          token_estimate: 10000000,
          provider: 'Alibaba Cloud',
          confidence: 0.65,
        },
        {
          id: 'uc-008',
          name: 'Report Generation',
          description: 'Automated business report creation',
          token_estimate: 3000000,
          provider: 'In-house',
          confidence: 0.85,
        },
      ],
    },
  ],
  providers: [
    { name: 'In-house', token_count: 123000000, percentage: 51 },
    { name: 'Azure OpenAI', token_count: 58000000, percentage: 24 },
    { name: 'Google Cloud', token_count: 30000000, percentage: 12 },
    { name: 'GitHub Copilot', token_count: 15000000, percentage: 6 },
    { name: 'Alibaba Cloud', token_count: 10000000, percentage: 4 },
    { name: 'AWS Bedrock', token_count: 5000000, percentage: 2 },
  ],
  total_tokens: 241000000,
  created_at: '2026-02-10T08:00:00Z',
  updated_at: '2026-02-14T15:30:00Z',
}

// Mock Solution Data
export const mockSolution: Solution = {
  id: 'sol-001',
  customer_id: 'cust-001',
  requirements: 'We need a scalable AI content moderation solution that can handle 1M+ daily requests with low latency and high accuracy.',
  recommendation: `## Recommended Solution: Alibaba Cloud AI Content Moderation

Based on your requirements for high-volume content moderation, we recommend the following architecture:

### Core Components

1. **Content Security (绿网)** - Primary moderation service
   - Real-time image and video moderation
   - Text content analysis
   - Multi-language support

2. **PAI-EAS** - Model deployment platform
   - Custom model hosting for domain-specific content
   - Auto-scaling based on request volume
   - Low-latency inference

3. **Function Compute** - Serverless processing
   - Event-driven content processing
   - Cost-effective scaling
   - Integration with OSS for media storage

### Architecture Benefits

- **Scalability**: Auto-scales to handle 10M+ requests/day
- **Latency**: <100ms average response time
- **Accuracy**: 99.5%+ moderation accuracy
- **Cost**: 40% lower TCO compared to current solution`,
  products: [
    {
      name: 'Content Security (绿网)',
      description: 'AI-powered content moderation service',
      relevance_score: 0.95,
    },
    {
      name: 'PAI-EAS',
      description: 'Elastic Algorithm Service for model deployment',
      relevance_score: 0.85,
    },
    {
      name: 'Function Compute',
      description: 'Serverless compute service',
      relevance_score: 0.75,
    },
    {
      name: 'Object Storage Service',
      description: 'Scalable cloud storage',
      relevance_score: 0.70,
    },
  ],
  sources: [
    'Alibaba Cloud Content Moderation Documentation',
    'PAI-EAS Best Practices Guide',
    'Serverless Architecture Whitepaper',
  ],
  versions: [
    {
      version: 1,
      content: 'Initial recommendation based on content moderation requirements.',
      created_at: '2026-02-14T10:00:00Z',
    },
  ],
  created_at: '2026-02-14T10:00:00Z',
  updated_at: '2026-02-14T10:00:00Z',
}

// Mock Role Play Session
export const mockRolePlaySession: RolePlaySession = {
  id: 'session-001',
  scenario: 'technical',
  difficulty: 'medium',
  context: 'Meeting with a senior engineer who is evaluating cloud AI services for their content moderation system.',
  messages: [
    {
      role: 'assistant',
      content: "Hi, I'm the lead engineer at TechCorp. We're evaluating AI content moderation solutions. I've heard about Alibaba Cloud but I'm not sure how it compares to AWS or Azure in terms of accuracy and latency. Can you tell me more?",
      timestamp: '2026-02-14T14:00:00Z',
    },
    {
      role: 'user',
      content: "Great question! Alibaba Cloud's Content Security service actually leads in several benchmarks. For accuracy, we achieve 99.5%+ on standard content moderation tasks. For latency, our average response time is under 100ms. Would you like me to share some specific benchmark comparisons?",
      timestamp: '2026-02-14T14:01:00Z',
    },
    {
      role: 'assistant',
      content: "Those numbers sound impressive, but I'm concerned about integration complexity. We currently use a mix of AWS services. How difficult would it be to migrate or set up a hybrid solution?",
      timestamp: '2026-02-14T14:02:00Z',
    },
  ],
  scores: [
    {
      message_index: 1,
      score: 82,
      strengths: [
        'Provided specific metrics (99.5%, <100ms)',
        'Offered to share more details',
        'Addressed the comparison question directly',
      ],
      improvements: [
        'Could have asked about their specific use case first',
        'Consider mentioning cost advantages',
      ],
    },
  ],
  final_score: 82,
  started_at: '2026-02-14T14:00:00Z',
}

// Helper function to generate random delay
export const mockDelay = (ms: number = 1000): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Generate random ID
export const generateId = (prefix: string = 'id'): string => {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`
}
