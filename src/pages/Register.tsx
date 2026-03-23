import { Form, Input, Button, Card, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const onFinish = (values: unknown) => {
    console.log('Register:', values)
    message.success('注册成功，请登录')
    navigate('/login')
  }

  return (
    <div className="auth-page">
      <Card className="auth-card">
        <h2 style={{ textAlign: 'center', marginBottom: 24 }}>注册</h2>
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
            <Input.Password placeholder="Create a password" />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="confirm"
            rules={[
              { required: true },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('密码不匹配'))
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm your password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              注册
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: 'center' }}>
          已有账号? <Link to="/login">登录</Link>
        </div>
      </Card>
    </div>
  )
}

export default Register