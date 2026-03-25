import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface VenueState {
  currentVenueId: string | null
  currentVenueName: string | null
  enterVenue: (venueId: string, venueName?: string) => void
  exitVenue: () => void
}

// 自定义 sessionStorage 适配器
const sessionStorageAdapter = {
  getItem: (name: string): string | null => {
    return sessionStorage.getItem(name)
  },
  setItem: (name: string, value: string): void => {
    sessionStorage.setItem(name, value)
  },
  removeItem: (name: string): void => {
    sessionStorage.removeItem(name)
  },
}

export const useVenueStore = create<VenueState>()(
  persist(
    (set) => ({
      currentVenueId: null,
      currentVenueName: null,

      enterVenue: (venueId: string, venueName?: string) => {
        set({ currentVenueId: venueId, currentVenueName: venueName || null })
      },

      exitVenue: () => {
        set({ currentVenueId: null, currentVenueName: null })
      },
    }),
    {
      name: 'venue-storage',
      storage: sessionStorageAdapter,
    }
  )
)
