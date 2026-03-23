import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { AuthProvider } from '@/contexts/AuthContext'
import { MainLayout } from '@/components/MainLayout'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { Dashboard } from '@/pages/Dashboard'
import { Venues } from '@/pages/Venues'
import { Staff } from '@/pages/Staff'
import { Reports } from '@/pages/Reports'
import { Settings } from '@/pages/Settings'
import { Forbidden } from '@/pages/Forbidden'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import '@/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider locale={zhCN}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* 公开路由 */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* 受保护的路由 */}
            <Route
              element={
                <ProtectedRoute allowedRoles={['super_admin', 'venue_admin', 'staff']}>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<Dashboard />} />
              <Route
                path="/venues"
                element={
                  <ProtectedRoute allowedRoles={['super_admin']} allowedPermissions={['venue:view']}>
                    <Venues />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/staff"
                element={
                  <ProtectedRoute allowedRoles={['super_admin', 'venue_admin']} allowedPermissions={['staff:view']}>
                    <Staff />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports"
                element={
                  <ProtectedRoute allowedRoles={['super_admin', 'venue_admin', 'staff']} allowedPermissions={['report:view']}>
                    <Reports />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute allowedRoles={['super_admin']} allowedPermissions={['settings:view']}>
                    <Settings />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* 403 页面 */}
            <Route path="/403" element={<Forbidden />} />

            {/* 未匹配路由重定向到首页 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ConfigProvider>
  </StrictMode>,
)