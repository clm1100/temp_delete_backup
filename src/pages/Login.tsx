import { Form, Input, Button, Card, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@/stores/authStore'
import { EnvironmentOutlined, MailOutlined, LockOutlined } from '@ant-design/icons'
import LanguageSwitcher from '@/components/LanguageSwitcher'

const { Title, Text } = Typography

function Login() {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  const onFinish = async (values: { email: string; password: string }) => {
    const success = await login(values.email, values.password)
    if (success) {
      // 根据角色跳转
      const { user } = useAuthStore.getState()
      if (user?.role === 'super_admin') {
        navigate('/admin/venues')
      } else if (user?.venueId) {
        navigate(`/venue/${user.venueId}/dashboard`)
      } else {
        navigate('/')
      }
    }
  }

  return (
    <div className="login-page">
      <div className="login-background">
        <div className="login-gradient" />
        <div className="login-pattern" />
      </div>
      <div className="login-container">
        <Card className="login-card">
          <div className="login-header">
            <div className="login-icon">
              <EnvironmentOutlined />
            </div>
            <Title level={3} style={{ margin: '16px 0 8px', fontWeight: 600 }}>
              {t('common.systemTitle')}
            </Title>
            <Text type="secondary">{t('auth.loginTitle')}</Text>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="login-form"
          >
            <Form.Item
              name="email"
              rules={[{ required: true, type: 'email', message: t('auth.emailRequired') }]}
            >
              <Input
                size="large"
                prefix={<MailOutlined style={{ color: '#1890ff' }} />}
                placeholder={t('auth.email')}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, min: 6, message: t('auth.passwordRequired') }]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined style={{ color: '#1890ff' }} />}
                placeholder={t('auth.password')}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large" className="login-button">
                {t('common.login')}
              </Button>
            </Form.Item>
            <div className="login-lang">
              <LanguageSwitcher />
            </div>
          </Form>

          <div className="login-footer">
            <Text type="secondary">{t('auth.noAccount')}</Text>
            <Link to="/register">{t('auth.register')}</Link>
          </div>

          <div className="login-test-accounts">
            <Text type="secondary" style={{ fontSize: 12 }}>{t('auth.testAccounts')}</Text>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Login