import { TokenMapData } from '../types'
import { mockTokenMapData, mockDelay, generateId } from '../mocks'
import api from './api'

const USE_MOCK = import.meta.env.VITE_MOCK_API === 'true' || !import.meta.env.VITE_API_BASE_URL

export const tokenMapService = {
  // Generate a new token map
  async generate(companyName: string, context?: string): Promise<TokenMapData> {
    if (USE_MOCK) {
      await mockDelay(2000) // Simulate generation time
      return {
        ...mockTokenMapData,
        id: generateId('map'),
        customer_name: companyName,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    }
    
    const response = await api.post<TokenMapData>('/token-map/generate', {
      company_name: companyName,
      context,
    })
    return response as unknown as TokenMapData
  },

  // Get a specific token map
  async getById(id: string): Promise<TokenMapData> {
    if (USE_MOCK) {
      await mockDelay(500)
      return { ...mockTokenMapData, id }
    }
    
    const response = await api.get<TokenMapData>(`/token-map/${id}`)
    return response as unknown as TokenMapData
  },

  // Update a token map
  async update(id: string, data: Partial<TokenMapData>): Promise<TokenMapData> {
    if (USE_MOCK) {
      await mockDelay(500)
      return {
        ...mockTokenMapData,
        ...data,
        id,
        updated_at: new Date().toISOString(),
      }
    }
    
    const response = await api.put<TokenMapData>(`/token-map/${id}`, data)
    return response as unknown as TokenMapData
  },

  // List token maps for a customer
  async listByCustomer(customerId: string): Promise<TokenMapData[]> {
    if (USE_MOCK) {
      await mockDelay(500)
      return [{ ...mockTokenMapData, customer_id: customerId }]
    }
    
    const response = await api.get<TokenMapData[]>(`/token-map/customer/${customerId}`)
    return response as unknown as TokenMapData[]
  },

  // Export token map
  async export(id: string, format: 'json' | 'png' | 'pdf'): Promise<Blob> {
    if (USE_MOCK) {
      await mockDelay(1000)
      const data = JSON.stringify(mockTokenMapData, null, 2)
      return new Blob([data], { type: 'application/json' })
    }
    
    const response = await api.get(`/token-map/${id}/export`, {
      params: { format },
      responseType: 'blob',
    })
    return response as unknown as Blob
  },
}
