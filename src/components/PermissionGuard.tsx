import { ReactNode } from 'react'
import { Role, PermissionCode } from '@/types/auth'
import { usePermission } from '@/hooks/usePermission'

interface PermissionGuardProps {
  children: ReactNode
  allowedRoles: Role[]
  allowedPermissions?: PermissionCode[]
  fallback?: ReactNode
  mode?: 'all' | 'any' // all: 需要满足所有条件, any: 满足任一条件即可
}

export function PermissionGuard({
  children,
  allowedRoles,
  allowedPermissions,
  fallback = null,
  mode = 'all',
}: PermissionGuardProps) {
  const { canAccess, hasAnyRole, hasAnyPermission } = usePermission()

  if (mode === 'any') {
    // 满足角色或权限之一即可
    const hasRoleAccess = hasAnyRole(allowedRoles)
    const hasPermissionAccess = allowedPermissions ? hasAnyPermission(allowedPermissions) : true

    if (hasRoleAccess && hasPermissionAccess) {
      return <>{children}</>
    }
  } else {
    // 需要同时满足角色和权限
    if (canAccess(allowedRoles, allowedPermissions)) {
      return <>{children}</>
    }
  }

  return <>{fallback}</>
}
