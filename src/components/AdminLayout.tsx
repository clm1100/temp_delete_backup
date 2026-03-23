import { useState } from 'react'
import { Layout, Menu, Dropdown, Avatar, Space, Typography } from 'antd'
import {
  HomeOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

const { Header, Sider, Content, Footer } = Layout
const { Text } = Typography

const iconMap: Record<string, React.ReactNode> = {
  Home: <HomeOutlined />,
  Setting: <SettingOutlined />,
}

const adminMenuItems = [
  {
    key: '/admin/venues',
    icon: iconMap.Home,
    label: '体育馆管理',
  },
  {
    key: '/admin/settings',
    icon: iconMap.Setting,
    label: '系统设置',
  },
]

export function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()
  const [collapsed, setCollapsed] = useState(false)

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
          {!collapsed && <span>系统管理</span>}
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={adminMenuItems}
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
