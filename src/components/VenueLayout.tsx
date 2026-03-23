import { useState } from 'react'
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
import { useAuth } from '@/contexts/AuthContext'
import { useVenue } from '@/contexts/VenueContext'

const { Header, Sider, Content, Footer } = Layout
const { Text } = Typography

const iconMap: Record<string, React.ReactNode> = {
  Dashboard: <DashboardOutlined />,
  Team: <TeamOutlined />,
  FileText: <FileTextOutlined />,
}

function getVenueMenuItems(venueId: string, hasStaffPermission: boolean, hasReportPermission: boolean) {
  const items = [
    {
      key: `/venue/${venueId}/dashboard`,
      icon: iconMap.Dashboard,
      label: '仪表盘',
    },
  ]

  if (hasStaffPermission) {
    items.push({
      key: `/venue/${venueId}/staff`,
      icon: iconMap.Team,
      label: '员工管理',
    })
  }

  if (hasReportPermission) {
    items.push({
      key: `/venue/${venueId}/reports`,
      icon: iconMap.FileText,
      label: '报表中心',
    })
  }

  return items
}

export function VenueLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()
  const { currentVenueId, currentVenueName, exitVenue } = useVenue()
  const [collapsed, setCollapsed] = useState(false)

  // 从 URL 获取 venueId
  const params = useParams()
  const venueId = params.venueId || currentVenueId

  // 根据权限过滤菜单
  const hasStaffPermission = user?.permissions.includes('staff:view') || false
  const hasReportPermission = user?.permissions.includes('report:view') || false

  const menuItems = venueId
    ? getVenueMenuItems(venueId, hasStaffPermission, hasReportPermission)
    : []

  const selectedKey = location.pathname

  const userMenuItems = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
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

  const roleLabels: Record<string, string> = {
    super_admin: '超级管理员',
    venue_admin: '场馆管理员',
    staff: '普通员工',
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        theme="light"
      >
        <div className="logo" style={{ height: 32, margin: 16, textAlign: 'center' }}>
          {!collapsed && <span>{currentVenueName || '场馆运营'}</span>}
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
                返回系统管理
              </Button>
            )}
            {currentVenueName && (
              <Text strong style={{ fontSize: 16 }}>{currentVenueName}</Text>
            )}
          </Space>
          <Dropdown
            menu={{ items: userMenuItems, onClick: handleUserMenuClick }}
            placement="bottomRight"
          >
            <Space style={{ cursor: 'pointer' }}>
              <Avatar icon={<UserOutlined />} />
              <div style={{ lineHeight: 1.3 }}>
                <Text strong style={{ display: 'block' }}>{user?.email}</Text>
                <Text type="secondary" style={{ fontSize: 12 }}>{user && roleLabels[user.role]}</Text>
              </div>
            </Space>
          </Dropdown>
        </Header>
        <Content style={{ padding: 24 }}>
          <div className="main-content">
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          体育场馆管理系统 ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  )
}
