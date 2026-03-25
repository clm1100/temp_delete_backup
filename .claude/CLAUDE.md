# Project Instructions

## 快速启动

```powershell
powershell -File node_modules/.bin/vite.ps1
```
开发服务器：http://localhost:5173

---

## 技术栈
- React 19 + Vite 8 + TypeScript
- Ant Design 6
- Zustand (状态管理)
- React Router 7

---

## 项目概述
体育场馆管理系统，支持**超级管理员**和**场馆管理员/员工**两种角色。

### 角色与权限
| 角色 | 说明 | 权限码 |
|------|------|--------|
| super_admin | 超级管理员 | venue:view/edit, staff:view/edit, report:view, settings:view/edit |
| venue_admin | 场馆管理员 | venue:view/edit, staff:view/edit, report:view |
| staff | 普通员工 | venue:view, report:view |

### 测试账号
- `super@example.com` — 超级管理员
- `admin@example.com` — 场馆管理员 (venue-1)
- `staff@example.com` — 普通员工 (venue-1)

---

## 目录结构
```
src/
├── components/          # 布局组件
│   ├── AdminLayout.tsx   # 超级管理员布局
│   ├── VenueLayout.tsx   # 场馆运营布局
│   ├── MainLayout.tsx    # 通用布局（未使用）
│   └── ProtectedRoute.tsx
├── config/
│   └── permission.ts     # 角色权限配置
├── hooks/
│   └── usePermission.ts  # 权限 hook
├── pages/                # 页面
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Dashboard.tsx
│   ├── Venues.tsx        # 体育馆管理
│   ├── Staff.tsx
│   ├── Reports.tsx
│   ├── Settings.tsx
│   └── Forbidden.tsx
├── stores/               # Zustand 状态管理
│   ├── authStore.ts      # 认证状态 + mock 用户数据
│   └── venueStore.ts     # 当前场馆状态
└── types/
    └── auth.ts           # 类型定义
```

---

## 路由结构
| 路径 | 布局 | 说明 |
|------|------|------|
| /login | - | 登录页 |
| /register | - | 注册页 |
| /admin/venues | AdminLayout | 体育馆管理 |
| /admin/settings | AdminLayout | 系统设置 |
| /venue/:venueId/dashboard | VenueLayout | 场馆仪表盘 |
| /venue/:venueId/staff | VenueLayout | 员工管理 |
| /venue/:venueId/reports | VenueLayout | 报表中心 |
| /403 | - | 无权限页 |

---

## 状态持久化
- `authStore` → localStorage (`auth-storage`)
- `venueStore` → sessionStorage (`venue-storage`)
