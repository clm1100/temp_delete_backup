import { useState, useEffect, useMemo } from 'react'
import { Layout, Menu, Dropdown, Avatar, Space, Typography, Button } from 'antd'
import {
  DashboardOutlined,
  TeamOutlined,
  FileTextOutlined,
  LogoutOutlined,
  UserOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons'
import { useNavigate, useLocation, Outlet, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@/stores/authStore'
import { useVenueStore } from '@/stores/venueStore'
import { mockVenues } from '@/stores/authStore'
import LanguageSwitcher from './LanguageSwitcher'

const { Header, Sider, Content, Footer } = Layout
const { Text } = Typography

const iconMap: Record<string, React.ReactNode> = {
  Dashboard: <DashboardOutlined />,
  Team: <TeamOutlined />,
  FileText: <FileTextOutlined />,
}

export function VenueLayout() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const currentVenueId = useVenueStore((state) => state.currentVenueId)
  const currentVenueName = useVenueStore((state) => state.currentVenueName)
  const exitVenue = useVenueStore((state) => state.exitVenue)
  const enterVenue = useVenueStore((state) => state.enterVenue)
  const [collapsed, setCollapsed] = useState(false)

  // 从 URL 获取 venueId
  const params = useParams()
  const venueId = params.venueId || currentVenueId

  // 自动设置当前场馆（venue_admin/staff 登录后直接进入所属场馆）
  useEffect(() => {
    if (user?.venueId && !currentVenueId) {
      const venue = mockVenues[user.venueId]
      if (venue) {
        enterVenue(venue.id, venue.name)
      } else {
        enterVenue(user.venueId)
      }
    }
  }, [user, currentVenueId, enterVenue])

  // 根据权限过滤菜单
  const hasStaffPermission = user?.permissions.includes('staff:view') || false
  const hasReportPermission = user?.permissions.includes('report:view') || false

  const menuItems = useMemo(() => {
    if (!venueId) return []
    const items = [
      {
        key: `/venue/${venueId}/dashboard`,
        icon: iconMap.Dashboard,
        label: t('menu.dashboard'),
      },
    ]
    if (hasStaffPermission) {
      items.push({
        key: `/venue/${venueId}/staff`,
        icon: iconMap.Team,
        label: t('menu.staff'),
      })
    }
    if (hasReportPermission) {
      items.push({
        key: `/venue/${venueId}/reports`,
        icon: iconMap.FileText,
        label: t('menu.reports'),
      })
    }
    return items
  }, [venueId, hasStaffPermission, hasReportPermission, t])

  const selectedKey = location.pathname

  const userMenuItems = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: t('common.logout'),
    },
  ]

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key)
  }

  const handleUserMenuClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      logout()
      navigate('/login')
    }
  }

  const handleBackToAdmin = () => {
    exitVenue()
    navigate('/admin/venues')
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        theme="light"
      >
        <div
          className="logo"
          style={{
            height: 48,
            margin: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
          }}
        >
          {!collapsed && (
            <span style={{ color: '#000', fontSize: 15, fontWeight: 600, letterSpacing: '0.02em' }}>
              {t('common.systemTitle')}
            </span>
          )}
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Space>
            {user?.role === 'super_admin' && (
              <Button icon={<ArrowLeftOutlined />} onClick={handleBackToAdmin}>
                {t('menu.backToAdmin')}
              </Button>
            )}
            {currentVenueName && (
              <Text strong style={{ fontSize: 16 }}>{currentVenueName}</Text>
            )}
          </Space>
          <Space size="middle">
            <LanguageSwitcher />
            <Dropdown
              menu={{ items: userMenuItems, onClick: handleUserMenuClick }}
              placement="bottomRight"
            >
              <Space style={{ cursor: 'pointer' }}>
                <Avatar icon={<UserOutlined />} />
                <div style={{ lineHeight: 1.3 }}>
                  <Text strong style={{ display: 'block' }}>{user?.email}</Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>{user && t(`roles.${user.role}`)}</Text>
                </div>
              </Space>
            </Dropdown>
          </Space>
        </Header>
        <Content style={{ padding: 24 }}>
          <div className="main-content">
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          {t('footer')} {new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  )
}
