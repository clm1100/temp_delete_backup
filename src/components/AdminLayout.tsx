import { useState } from 'react'
import { Layout, Menu, Dropdown, Avatar, Space, Typography } from 'antd'
import {
  HomeOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@/stores/authStore'
import LanguageSwitcher from './LanguageSwitcher'

const { Header, Sider, Content, Footer } = Layout
const { Text } = Typography

const iconMap: Record<string, React.ReactNode> = {
  Home: <HomeOutlined />,
  Setting: <SettingOutlined />,
}

export function AdminLayout() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const [collapsed, setCollapsed] = useState(false)

  const adminMenuItems = [
    {
      key: '/admin/venues',
      icon: iconMap.Home,
      label: t('menu.venues'),
    },
    {
      key: '/admin/settings',
      icon: iconMap.Setting,
      label: t('menu.settings'),
    },
  ]

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

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        theme="light"
      >
        <div className="logo" style={{ height: 32, margin: 16, textAlign: 'center' }}>
          {!collapsed && <span>{t('menu.systemAdmin')}</span>}
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
