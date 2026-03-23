import { Navigate } from 'react-router-dom'
import { Role, PermissionCode } from '@/types/auth'
import { useAuth } from '@/contexts/AuthContext'
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
  const { user, isAuthenticated } = useAuth()

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
