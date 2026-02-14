import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// UI Store
interface UIState {
  sidebarCollapsed: boolean
  toggleSidebar: () => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
    }),
    {
      name: 'ui-storage',
    }
  )
)

// Token Map Store
interface TokenMapState {
  currentMapId: string | null
  isLoading: boolean
  setCurrentMapId: (id: string | null) => void
  setLoading: (loading: boolean) => void
}

export const useTokenMapStore = create<TokenMapState>()(
  persist(
    (set) => ({
      currentMapId: null,
      isLoading: false,
      setCurrentMapId: (id) => set({ currentMapId: id }),
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'token-map-storage',
    }
  )
)

// Solution Store
interface SolutionState {
  currentSolutionId: string | null
  versionHistory: string[]
  setCurrentSolutionId: (id: string | null) => void
  addVersion: (versionId: string) => void
}

export const useSolutionStore = create<SolutionState>()(
  persist(
    (set) => ({
      currentSolutionId: null,
      versionHistory: [],
      setCurrentSolutionId: (id) => set({ currentSolutionId: id }),
      addVersion: (versionId) => set((state) => ({ versionHistory: [...state.versionHistory, versionId] })),
    }),
    {
      name: 'solution-storage',
    }
  )
)

// Role Play Store
interface RolePlayState {
  sessionId: string | null
  scenario: string | null
  difficulty: 'easy' | 'medium' | 'hard'
  score: number
  setSessionId: (id: string | null) => void
  setScenario: (scenario: string | null) => void
  setDifficulty: (difficulty: 'easy' | 'medium' | 'hard') => void
  setScore: (score: number) => void
}

export const useRolePlayStore = create<RolePlayState>()(
  persist(
    (set) => ({
      sessionId: null,
      scenario: null,
      difficulty: 'medium',
      score: 0,
      setSessionId: (id) => set({ sessionId: id }),
      setScenario: (scenario) => set({ scenario }),
      setDifficulty: (difficulty) => set({ difficulty }),
      setScore: (score) => set({ score }),
    }),
    {
      name: 'role-play-storage',
    }
  )
)
