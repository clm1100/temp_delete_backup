import { Card, Row, Col, Statistic } from 'antd'
import { TeamOutlined, HomeOutlined, FileTextOutlined, RiseOutlined } from '@ant-design/icons'
import { useAuth } from '@/contexts/AuthContext'

export function Dashboard() {
  const { user } = useAuth()

  const roleWelcome: Record<string, string> = {
    super_admin: '欢迎使用超级管理员后台',
    venue_admin: '欢迎使用场馆管理后台',
    staff: '欢迎使用员工工作台',
  }

  return (
    <div>
      <h2>{roleWelcome[user?.role || 'staff']}</h2>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="体育馆数量"
              value={user?.role === 'super_admin' ? 12 : 1}
              prefix={<HomeOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="员工总数"
              value={user?.role === 'super_admin' ? 156 : 28}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="本月订单"
              value={user?.role === 'super_admin' ? 1234 : 89}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="较上月增长"
              value={12.5}
              prefix={<RiseOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
