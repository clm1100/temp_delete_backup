import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, Role, PermissionCode } from '@/types/auth'
import { rolePermissions } from '@/config/permission'

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

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  hasPermission: (permission: PermissionCode) => boolean
  hasRole: (role: Role) => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, _password: string): Promise<boolean> => {
        const mockUser = mockUsers[email]
        if (mockUser) {
          set({ user: mockUser, isAuthenticated: true })
          return true
        }
        return false
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },

      hasPermission: (permission: PermissionCode): boolean => {
        const { user } = get()
        if (!user) return false
        return user.permissions.includes(permission)
      },

      hasRole: (role: Role): boolean => {
        const { user } = get()
        if (!user) return false
        return user.role === role
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
