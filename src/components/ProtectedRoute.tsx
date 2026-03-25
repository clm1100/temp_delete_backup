import { Navigate } from 'react-router-dom'
import type { Role, PermissionCode } from '@/types/auth'
import { useAuthStore } from '@/stores/authStore'
import { hasPermission } from '@/config/permission'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles: Role[]
  allowedPermissions?: PermissionCode[]
}

export function ProtectedRoute({
  children,
  allowedRoles,
  allowedPermissions,
}: ProtectedRouteProps) {
  const user = useAuthStore((state) => state.user)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  // 未登录，跳转登录页
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />
  }

  // 检查权限
  if (!hasPermission(user.role, user.permissions, allowedRoles, allowedPermissions)) {
    return <Navigate to="/403" replace />
  }

  return <>{children}</>
}
