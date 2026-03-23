import { useState, useMemo } from 'react'
import { Layout, Menu, Dropdown, Avatar, Space, Typography } from 'antd'
import {
  DashboardOutlined,
  HomeOutlined,
  TeamOutlined,
  FileTextOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { menuConfig } from '@/config/permission'

const { Header, Sider, Content, Footer } = Layout
const { Text } = Typography

const iconMap: Record<string, React.ReactNode> = {
  Dashboard: <DashboardOutlined />,
  Home: <HomeOutlined />,
  Team: <TeamOutlined />,
  FileText: <FileTextOutlined />,
  Setting: <SettingOutlined />,
}

export function MainLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()
  const [collapsed, setCollapsed] = useState(false)

  // 根据用户权限过滤菜单
  const filteredMenuItems = useMemo(() => {
    if (!user) return []
    return menuConfig
      .filter((item) => {
        if (!item.allowedRoles.includes(user.role)) return false
        if (item.permissions && item.permissions.length > 0) {
          return item.permissions.some((p) => user.permissions.includes(p))
        }
        return true
      })
      .map((item) => ({
        key: item.path,
        icon: iconMap[item.icon || 'Dashboard'],
        label: item.label,
      }))
  }, [user])

  const selectedKey = location.pathname === '/' ? '/' : location.pathname

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
          {!collapsed && <span>体育场馆系统</span>}
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={filteredMenuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Space size="middle">
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
          </Space>
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
