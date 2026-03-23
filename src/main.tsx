import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { AuthProvider } from '@/contexts/AuthContext'
import { VenueProvider } from '@/contexts/VenueContext'
import { AdminLayout } from '@/components/AdminLayout'
import { VenueLayout } from '@/components/VenueLayout'
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
        <VenueProvider>
          <BrowserRouter>
            <Routes>
              {/* 公开路由 */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* 超级管理员系统管理路由 */}
              <Route element={<AdminLayout />}>
                <Route path="/admin/venues" element={<Venues />} />
                <Route path="/admin/settings" element={<Settings />} />
              </Route>

              {/* 场馆运营路由 */}
              <Route element={<VenueLayout />}>
                <Route path="/venue/:venueId/dashboard" element={<Dashboard />} />
                <Route path="/venue/:venueId/staff" element={<Staff />} />
                <Route path="/venue/:venueId/reports" element={<Reports />} />
              </Route>

              {/* 403 页面 */}
              <Route path="/403" element={<Forbidden />} />

              {/* 未匹配路由重定向到登录 */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </BrowserRouter>
        </VenueProvider>
      </AuthProvider>
    </ConfigProvider>
  </StrictMode>,
)