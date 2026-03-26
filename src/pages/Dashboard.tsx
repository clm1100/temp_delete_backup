import { Card, Row, Col, Typography } from 'antd'
import { TeamOutlined, FileTextOutlined, RiseOutlined, CalendarOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useVenueStore } from '@/stores/venueStore'

const { Title, Text } = Typography

// 模拟场馆数据
const mockVenueStats: Record<string, { staffCount: number; orderCount: number }> = {
  'venue-1': { staffCount: 28, orderCount: 89 },
  'venue-2': { staffCount: 15, orderCount: 56 },
  'venue-3': { staffCount: 22, orderCount: 103 },
}

// 模拟本周预约数据
const mockWeeklyBookings = 24

// 模拟待处理事项
const mockPendingTasks = 5

interface StatCardProps {
  title: string
  value: number | string
  prefix: React.ReactNode
  suffix?: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  color?: string
}

function StatCard({ title, value, prefix, suffix, trend = 'neutral', trendValue, color = '#1890ff' }: StatCardProps) {
  return (
    <Col xs={24} sm={12} lg={8}>
      <Card
        style={{
          borderRadius: 16,
          transition: 'all 0.25s ease',
          cursor: 'default',
          border: '1px solid rgba(0, 0, 0, 0.06)',
        }}
        styles={{ body: { padding: '24px' } }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div style={{ flex: 1 }}>
            <Text
              type="secondary"
              style={{ fontSize: 14, display: 'block', marginBottom: 12, letterSpacing: '0.02em' }}
            >
              {title}
            </Text>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <Text
                style={{
                  fontSize: 36,
                  fontWeight: 700,
                  color: 'rgba(0, 0, 0, 0.88)',
                  lineHeight: 1,
                }}
              >
                {value}
              </Text>
              {suffix && (
                <Text style={{ fontSize: 16, color: 'rgba(0, 0, 0, 0.45)', fontWeight: 500 }}>{suffix}</Text>
              )}
            </div>
            {trendValue && (
              <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                <Text style={{ fontSize: 12, color: trend === 'up' ? '#52c41a' : trend === 'down' ? '#ff4d4f' : 'rgba(0, 0, 0, 0.45)' }}>
                  {trend === 'up' ? '↑' : trend === 'down' ? '↓' : ''} {trendValue}
                </Text>
              </div>
            )}
          </div>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: `linear-gradient(135deg, ${color}15 0%, ${color}25 100%)`,
              border: `1px solid ${color}30`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: color,
              fontSize: 24,
            }}
          >
            {prefix}
          </div>
        </div>
      </Card>
    </Col>
  )
}

export function Dashboard() {
  const { t } = useTranslation()
  const currentVenueId = useVenueStore((state) => state.currentVenueId)
  const venueStats = currentVenueId ? mockVenueStats[currentVenueId] : null

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: 32 }}>
        <Title level={3} style={{ marginBottom: 4, fontWeight: 600, fontSize: 22 }}>
          {t('dashboard.overview')}
        </Title>
      </div>

      {/* Stats Cards */}
      <Row gutter={[20, 20]}>
        <StatCard
          title={t('dashboard.staffCount') || '员工总数'}
          value={venueStats?.staffCount || 0}
          prefix={<TeamOutlined />}
          trend="neutral"
          trendValue="较上月无变化"
          color="#722ed1"
        />
        <StatCard
          title={t('dashboard.orderCount') || '本月订单'}
          value={venueStats?.orderCount || 0}
          prefix={<FileTextOutlined />}
          trend="up"
          trendValue="较上月 +12%"
          color="#1890ff"
        />
        <StatCard
          title={t('dashboard.growth') || '增长率'}
          value={12.5}
          prefix={<RiseOutlined />}
          suffix="%"
          trend="up"
          trendValue="较上月 +3.2%"
          color="#52c41a"
        />
      </Row>

      {/* Quick Stats Row */}
      <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{
              borderRadius: 16,
              border: '1px solid rgba(0, 0, 0, 0.06)',
              background: 'linear-gradient(135deg, #fafafa 0%, #f0f0f0 100%)',
            }}
            styles={{ body: { padding: '20px 24px' } }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <CalendarOutlined style={{ fontSize: 28, color: '#1890ff' }} />
              <div>
                <Text type="secondary" style={{ fontSize: 13 }}>本周预约</Text>
                <div style={{ fontSize: 24, fontWeight: 600, lineHeight: 1.3 }}>{mockWeeklyBookings}</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{
              borderRadius: 16,
              border: '1px solid rgba(0, 0, 0, 0.06)',
              background: 'linear-gradient(135deg, #fff7e6 0%, #ffe7ba 100%)',
            }}
            styles={{ body: { padding: '20px 24px' } }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <FileTextOutlined style={{ fontSize: 28, color: '#fa8c16' }} />
              <div>
                <Text type="secondary" style={{ fontSize: 13 }}>待处理事项</Text>
                <div style={{ fontSize: 24, fontWeight: 600, lineHeight: 1.3 }}>{mockPendingTasks}</div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
