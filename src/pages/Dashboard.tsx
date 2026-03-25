import { Card, Row, Col, Statistic } from 'antd'
import { TeamOutlined, HomeOutlined, FileTextOutlined, RiseOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@/stores/authStore'

export function Dashboard() {
  const { t } = useTranslation()
  const user = useAuthStore((state) => state.user)

  return (
    <div>
      <h2>{t(`dashboard.welcome.${user?.role || 'staff'}`)}</h2>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title={t('dashboard.venueCount')}
              value={user?.role === 'super_admin' ? 12 : 1}
              prefix={<HomeOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title={t('dashboard.staffCount')}
              value={user?.role === 'super_admin' ? 156 : 28}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title={t('dashboard.orderCount')}
              value={user?.role === 'super_admin' ? 1234 : 89}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title={t('dashboard.growth')}
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
