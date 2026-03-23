import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

interface VenueContextType {
  currentVenueId: string | null
  currentVenueName: string | null
  enterVenue: (venueId: string, venueName?: string) => void
  exitVenue: () => void
}

const VenueContext = createContext<VenueContextType | undefined>(undefined)

export function VenueProvider({ children }: { children: ReactNode }) {
  const [currentVenueId, setCurrentVenueId] = useState<string | null>(() => {
    return sessionStorage.getItem('currentVenueId')
  })
  const [currentVenueName, setCurrentVenueName] = useState<string | null>(() => {
    return sessionStorage.getItem('currentVenueName')
  })

  const enterVenue = useCallback((venueId: string, venueName?: string) => {
    setCurrentVenueId(venueId)
    setCurrentVenueName(venueName || null)
    sessionStorage.setItem('currentVenueId', venueId)
    if (venueName) {
      sessionStorage.setItem('currentVenueName', venueName)
    }
  }, [])

  const exitVenue = useCallback(() => {
    setCurrentVenueId(null)
    setCurrentVenueName(null)
    sessionStorage.removeItem('currentVenueId')
    sessionStorage.removeItem('currentVenueName')
  }, [])

  return (
    <VenueContext.Provider value={{ currentVenueId, currentVenueName, enterVenue, exitVenue }}>
      {children}
    </VenueContext.Provider>
  )
}

export function useVenue(): VenueContextType {
  const context = useContext(VenueContext)
  if (!context) {
    throw new Error('useVenue must be used within VenueProvider')
  }
  return context
}
