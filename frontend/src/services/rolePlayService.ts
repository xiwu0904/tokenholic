import { RolePlaySession, ChatMessage, SessionScore } from '../types'
import { mockRolePlaySession, mockDelay, generateId } from '../mocks'
import api from './api'

const USE_MOCK = import.meta.env.VITE_MOCK_API === 'true' || !import.meta.env.VITE_API_BASE_URL

// Mock AI responses based on scenario
const getMockCustomerResponse = (scenario: string, _userMessage: string): string => {
  const responses: Record<string, string[]> = {
    discovery: [
      "That's interesting. Can you tell me more about how this would benefit our specific use case?",
      "We've been looking at several options. What makes your solution different from competitors?",
      "Cost is a major concern for us. How does your pricing compare to what we're currently using?",
    ],
    technical: [
      "How does your system handle high concurrency? We're looking at 10k requests per second during peak times.",
      "What about data privacy? We have strict requirements around where our data is stored and processed.",
      "Can you walk me through the integration process? We use a microservices architecture.",
    ],
    objection: [
      "I've heard your service has had some reliability issues. Can you address that?",
      "Your pricing seems higher than what we're paying now. Why should we switch?",
      "We already have a solution in place. Migrating would be a lot of work.",
    ],
    executive: [
      "I have 10 minutes. Give me the key points on ROI.",
      "How quickly can we see results? We need to show progress this quarter.",
      "What's your competitive advantage in one sentence?",
    ],
  }
  
  const scenarioResponses = responses[scenario] || responses.discovery
  return scenarioResponses[Math.floor(Math.random() * scenarioResponses.length)]
}

// Mock evaluation
const getMockEvaluation = (_userMessage: string): SessionScore => {
  const baseScore = 60 + Math.floor(Math.random() * 30)
  const strengths = [
    'Clear and professional communication',
    'Addressed the question directly',
    'Good use of specific examples',
  ].slice(0, 1 + Math.floor(Math.random() * 2))
  
  const improvements = [
    'Consider asking follow-up questions',
    'Could mention specific metrics or case studies',
    'Try to understand their specific pain points',
  ].slice(0, 1 + Math.floor(Math.random() * 2))
  
  return {
    message_index: 0,
    score: baseScore,
    strengths,
    improvements,
  }
}

export const rolePlayService = {
  // Start a new role play session
  async startSession(
    scenario: string,
    difficulty: 'easy' | 'medium' | 'hard',
    context?: string
  ): Promise<RolePlaySession> {
    if (USE_MOCK) {
      await mockDelay(1000)
      const initialMessage: ChatMessage = {
        role: 'assistant',
        content: getMockCustomerResponse(scenario, ''),
        timestamp: new Date().toISOString(),
      }
      
      return {
        id: generateId('session'),
        scenario,
        difficulty,
        context,
        messages: [initialMessage],
        scores: [],
        final_score: 0,
        started_at: new Date().toISOString(),
      }
    }
    
    const response = await api.post<RolePlaySession>('/role-play/start', {
      scenario,
      difficulty,
      context,
    })
    return response as unknown as RolePlaySession
  },

  // Send a response in the role play
  async sendResponse(
    sessionId: string,
    message: string
  ): Promise<{ customerResponse: ChatMessage; evaluation: SessionScore }> {
    if (USE_MOCK) {
      await mockDelay(1500)
      
      const customerResponse: ChatMessage = {
        role: 'assistant',
        content: getMockCustomerResponse('discovery', message),
        timestamp: new Date().toISOString(),
      }
      
      const evaluation = getMockEvaluation(message)
      
      return { customerResponse, evaluation }
    }
    
    const response = await api.post<{ customerResponse: ChatMessage; evaluation: SessionScore }>(
      `/role-play/${sessionId}/respond`,
      { message }
    )
    return response as unknown as { customerResponse: ChatMessage; evaluation: SessionScore }
  },

  // End session and get final summary
  async endSession(sessionId: string): Promise<RolePlaySession> {
    if (USE_MOCK) {
      await mockDelay(1000)
      return {
        ...mockRolePlaySession,
        id: sessionId,
        final_score: 75 + Math.floor(Math.random() * 20),
        ended_at: new Date().toISOString(),
      }
    }
    
    const response = await api.post<RolePlaySession>(`/role-play/${sessionId}/end`)
    return response as unknown as RolePlaySession
  },

  // Get session details
  async getSession(sessionId: string): Promise<RolePlaySession> {
    if (USE_MOCK) {
      await mockDelay(500)
      return { ...mockRolePlaySession, id: sessionId }
    }
    
    const response = await api.get<RolePlaySession>(`/role-play/${sessionId}`)
    return response as unknown as RolePlaySession
  },

  // List past sessions
  async listSessions(): Promise<RolePlaySession[]> {
    if (USE_MOCK) {
      await mockDelay(500)
      return [mockRolePlaySession]
    }
    
    const response = await api.get<RolePlaySession[]>('/role-play/sessions')
    return response as unknown as RolePlaySession[]
  },
}
