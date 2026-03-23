import { Card, Form, Input, Button, Switch, Space } from 'antd'

export function Settings() {
  const [form] = Form.useForm()

  const onFinish = (values: unknown) => {
    console.log('Settings:', values)
  }

  return (
    <div>
      <h2>系统设置</h2>
      <Card title="基本设置">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ systemName: '体育场馆管理系统', allowRegister: true }}
        >
          <Form.Item label="系统名称" name="systemName">
            <Input />
          </Form.Item>
          <Form.Item label="允许新用户注册" name="allowRegister" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">保存</Button>
              <Button>重置</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
