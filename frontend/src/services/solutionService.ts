import { Solution, SolutionVersion } from '../types'
import { mockSolution, mockDelay, generateId } from '../mocks'
import api from './api'

const USE_MOCK = import.meta.env.VITE_MOCK_API === 'true' || !import.meta.env.VITE_API_BASE_URL

export const solutionService = {
  // Get AI-powered solution recommendation
  async recommend(requirements: string, customerId?: string): Promise<Solution> {
    if (USE_MOCK) {
      await mockDelay(3000) // Simulate AI processing time
      return {
        ...mockSolution,
        id: generateId('sol'),
        customer_id: customerId,
        requirements,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    }
    
    const response = await api.post<Solution>('/solution/recommend', {
      requirements,
      customer_id: customerId,
    })
    return response as unknown as Solution
  },

  // Get a specific solution
  async getById(id: string): Promise<Solution> {
    if (USE_MOCK) {
      await mockDelay(500)
      return { ...mockSolution, id }
    }
    
    const response = await api.get<Solution>(`/solution/${id}`)
    return response as unknown as Solution
  },

  // Refine a solution with feedback
  async refine(id: string, feedback: string): Promise<Solution> {
    if (USE_MOCK) {
      await mockDelay(2500)
      const newVersion: SolutionVersion = {
        version: mockSolution.versions.length + 1,
        content: `Refined based on feedback: ${feedback}`,
        created_at: new Date().toISOString(),
        feedback,
      }
      return {
        ...mockSolution,
        id,
        versions: [...mockSolution.versions, newVersion],
        updated_at: new Date().toISOString(),
      }
    }
    
    const response = await api.post<Solution>(`/solution/${id}/refine`, { feedback })
    return response as unknown as Solution
  },

  // Get version history
  async getHistory(id: string): Promise<SolutionVersion[]> {
    if (USE_MOCK) {
      await mockDelay(500)
      return mockSolution.versions
    }
    
    const response = await api.get<SolutionVersion[]>(`/solution/${id}/history`)
    return response as unknown as SolutionVersion[]
  },
}
