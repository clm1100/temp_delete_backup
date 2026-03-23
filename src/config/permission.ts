import type { Role, PermissionCode } from '@/types/auth'
import type { MenuItem } from '@/types/auth'

// 角色对应的权限码
export const rolePermissions: Record<Role, PermissionCode[]> = {
  super_admin: ['venue:view', 'venue:edit', 'staff:view', 'staff:edit', 'report:view', 'settings:view', 'settings:edit'],
  venue_admin: ['venue:view', 'venue:edit', 'staff:view', 'staff:edit', 'report:view'],
  staff: ['venue:view', 'report:view'],
}

// 菜单配置
export const menuConfig: MenuItem[] = [
  {
    key: 'dashboard',
    label: '仪表盘',
    path: '/',
    icon: 'Dashboard',
    allowedRoles: ['super_admin', 'venue_admin', 'staff'],
  },
  {
    key: 'venues',
    label: '体育馆管理',
    path: '/venues',
    icon: 'Home',
    allowedRoles: ['super_admin'],
    permissions: ['venue:view'],
  },
  {
    key: 'staff',
    label: '员工管理',
    path: '/staff',
    icon: 'Team',
    allowedRoles: ['super_admin', 'venue_admin'],
    permissions: ['staff:view'],
  },
  {
    key: 'reports',
    label: '报表中心',
    path: '/reports',
    icon: 'FileText',
    allowedRoles: ['super_admin', 'venue_admin', 'staff'],
    permissions: ['report:view'],
  },
  {
    key: 'settings',
    label: '系统设置',
    path: '/settings',
    icon: 'Setting',
    allowedRoles: ['super_admin'],
    permissions: ['settings:view'],
  },
]

// 检查用户是否有权限访问
export function hasPermission(
  userRole: Role,
  userPermissions: PermissionCode[],
  allowedRoles: Role[],
  allowedPermissions?: PermissionCode[]
): boolean {
  // 先检查角色
  if (!allowedRoles.includes(userRole)) {
    return false
  }

  // 如果没有定义特定权限码要求，直接通过
  if (!allowedPermissions || allowedPermissions.length === 0) {
    return true
  }

  // 检查权限码
  return allowedPermissions.some((perm) => userPermissions.includes(perm))
}
