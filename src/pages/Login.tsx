import { Form, Input, Button, Card, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

function Login() {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { login } = useAuth()

  const onFinish = async (values: { email: string; password: string }) => {
    const success = await login(values.email, values.password)
    if (success) {
      message.success('登录成功')
      // 根据角色跳转
      // 注意：实际跳转时需要在 AuthContext 中获取用户信息，这里通过 localStorage 获取
      const stored = localStorage.getItem('user')
      if (stored) {
        const user = JSON.parse(stored)
        if (user.role === 'super_admin') {
          navigate('/admin/venues')
        } else if (user.venueId) {
          navigate(`/venue/${user.venueId}/dashboard`)
        } else {
          navigate('/')
        }
      } else {
        navigate('/')
      }
    } else {
      message.error('邮箱或密码错误')
    }
  }

  return (
    <div className="auth-page">
      <Card className="auth-card">
        <h2 style={{ textAlign: 'center', marginBottom: 24 }}>登录</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="邮箱"
            name="email"
            rules={[{ required: true, type: 'email' }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, min: 6 }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: 'center' }}>
          还没有账号? <Link to="/register">注册</Link>
        </div>
        <div style={{ marginTop: 16, fontSize: 12, color: '#999', textAlign: 'center' }}>
          测试账号: super@example.com / admin@example.com / staff@example.com
        </div>
      </Card>
    </div>
  )
}

export default Login