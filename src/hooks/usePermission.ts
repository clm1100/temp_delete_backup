import { useCallback } from 'react'
import type { Role, PermissionCode } from '@/types/auth'
import { useAuthStore } from '@/stores/authStore'
import { hasPermission } from '@/config/permission'

export function usePermission() {
  const user = useAuthStore((state) => state.user)
  const checkAuthPermission = useAuthStore((state) => state.hasPermission)
  const checkAuthRole = useAuthStore((state) => state.hasRole)

  const hasPermissionCode = useCallback(
    (permission: PermissionCode): boolean => {
      return checkAuthPermission(permission)
    },
    [checkAuthPermission]
  )

  const hasAnyPermission = useCallback(
    (permissions: PermissionCode[]): boolean => {
      if (!user) return false
      return permissions.some((perm) => user.permissions.includes(perm))
    },
    [user]
  )

  const hasAllPermissions = useCallback(
    (permissions: PermissionCode[]): boolean => {
      if (!user) return false
      return permissions.every((perm) => user.permissions.includes(perm))
    },
    [user]
  )

  const hasAnyRole = useCallback(
    (roles: Role[]): boolean => {
      if (!user) return false
      return roles.includes(user.role)
    },
    [user]
  )

  const canAccess = useCallback(
    (allowedRoles: Role[], allowedPermissions?: PermissionCode[]): boolean => {
      if (!user) return false
      return hasPermission(user.role, user.permissions, allowedRoles, allowedPermissions)
    },
    [user]
  )

  return {
    hasPermission: hasPermissionCode,
    hasAnyPermission,
    hasAllPermissions,
    hasRole: checkAuthRole,
    hasAnyRole,
    canAccess,
  }
}
