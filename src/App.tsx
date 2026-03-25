import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ConfigProvider, App as AntApp } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import enUS from 'antd/locale/en_US'
import i18n from './i18n'
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

const getAntdLocale = (locale: string) => {
  return locale === 'en' ? enUS : zhCN
}

function App() {
  const [locale, setLocale] = useState(() => i18n.language)

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      setLocale(lng)
    }
    i18n.on('languageChanged', handleLanguageChange)
    return () => {
      i18n.off('languageChanged', handleLanguageChange)
    }
  }, [])

  return (
    <ConfigProvider locale={getAntdLocale(locale)}>
      <AntApp>
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
      </AntApp>
    </ConfigProvider>
  )
}

export default App
