import { Card, Row, Col, Statistic } from 'antd'
import { TeamOutlined, FileTextOutlined, RiseOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useVenueStore } from '@/stores/venueStore'

// 模拟场馆数据
const mockVenueStats: Record<string, { staffCount: number; orderCount: number }> = {
  'venue-1': { staffCount: 28, orderCount: 89 },
  'venue-2': { staffCount: 15, orderCount: 56 },
  'venue-3': { staffCount: 22, orderCount: 103 },
}

export function Dashboard() {
  const { t } = useTranslation()
  const currentVenueId = useVenueStore((state) => state.currentVenueId)
  const currentVenueName = useVenueStore((state) => state.currentVenueName)
  const venueStats = currentVenueId ? mockVenueStats[currentVenueId] : null

  return (
    <div>
      <h2>{currentVenueName}</h2>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title={t('dashboard.staffCount')}
              value={venueStats?.staffCount || 0}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title={t('dashboard.orderCount')}
              value={venueStats?.orderCount || 0}
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
