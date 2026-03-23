// 用户角色
export type Role = 'super_admin' | 'venue_admin' | 'staff'

// 权限码
export type PermissionCode =
  | 'venue:view'
  | 'venue:edit'
  | 'staff:view'
  | 'staff:edit'
  | 'report:view'
  | 'settings:view'
  | 'settings:edit'

// 用户信息
export interface User {
  id: string
  email: string
  role: Role
  venueId?: string // 场馆管理员和员工必填
  permissions: PermissionCode[]
}

// 菜单项配置
export interface MenuItem {
  key: string
  label: string
  path: string
  icon?: string
  allowedRoles: Role[]
  permissions?: PermissionCode[]
}

// 路由配置
export interface RouteConfig {
  path: string
  component: React.ComponentType
  allowedRoles: Role[]
  permissions?: PermissionCode[]
}
