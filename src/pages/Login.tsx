import { Form, Input, Button, Card, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@/stores/authStore'

function Login() {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  const onFinish = async (values: { email: string; password: string }) => {
    const success = await login(values.email, values.password)
    if (success) {
      message.success(t('auth.loginSuccess'))
      // 根据角色跳转
      const { user } = useAuthStore.getState()
      if (user?.role === 'super_admin') {
        navigate('/admin/venues')
      } else if (user?.venueId) {
        navigate(`/venue/${user.venueId}/dashboard`)
      } else {
        navigate('/')
      }
    } else {
      message.error(t('auth.loginFailed'))
    }
  }

  return (
    <div className="auth-page">
      <Card className="auth-card">
        <h2 style={{ textAlign: 'center', marginBottom: 24 }}>{t('common.login')}</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label={t('auth.email')}
            name="email"
            rules={[{ required: true, type: 'email' }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            label={t('auth.password')}
            name="password"
            rules={[{ required: true, min: 6 }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {t('common.login')}
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: 'center' }}>
          {t('auth.noAccount')} <Link to="/register">{t('auth.register')}</Link>
        </div>
        <div style={{ marginTop: 16, fontSize: 12, color: '#999', textAlign: 'center' }}>
          {t('auth.testAccounts')}
        </div>
      </Card>
    </div>
  )
}

export default Login