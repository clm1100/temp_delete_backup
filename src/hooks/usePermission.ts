import { useCallback } from 'react'
import { Role, PermissionCode } from '@/types/auth'
import { useAuth } from '@/contexts/AuthContext'
import { hasPermission } from '@/config/permission'

export function usePermission() {
  const { user, hasPermission: checkAuthPermission, hasRole: checkAuthRole } = useAuth()

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
