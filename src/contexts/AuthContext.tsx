import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import type { User, Role, PermissionCode } from '@/types/auth'
import { rolePermissions } from '@/config/permission'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  hasPermission: (permission: PermissionCode) => boolean
  hasRole: (role: Role) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// 模拟用户数据
const mockUsers: Record<string, User> = {
  'super@example.com': {
    id: '1',
    email: 'super@example.com',
    role: 'super_admin',
    permissions: rolePermissions.super_admin,
  },
  'admin@example.com': {
    id: '2',
    email: 'admin@example.com',
    role: 'venue_admin',
    venueId: 'venue-1',
    permissions: rolePermissions.venue_admin,
  },
  'staff@example.com': {
    id: '3',
    email: 'staff@example.com',
    role: 'staff',
    venueId: 'venue-1',
    permissions: rolePermissions.staff,
  },
}

// 模拟场馆数据
export const mockVenues: Record<string, { id: string; name: string; address: string }> = {
  'venue-1': { id: 'venue-1', name: '朝阳区体育馆', address: '北京市朝阳区建国路88号' },
  'venue-2': { id: 'venue-2', name: '海淀区体育中心', address: '北京市海淀区中关村大街1号' },
  'venue-3': { id: 'venue-3', name: '东城区健身馆', address: '北京市东城区东单大街52号' },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  })

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    // 模拟登录验证
    const mockUser = mockUsers[email]
    if (mockUser) {
      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('user')
  }, [])

  const hasPermission = useCallback((permission: PermissionCode): boolean => {
    if (!user) return false
    return user.permissions.includes(permission)
  }, [user])

  const hasRole = useCallback((role: Role): boolean => {
    if (!user) return false
    return user.role === role
  }, [user])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        hasPermission,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
