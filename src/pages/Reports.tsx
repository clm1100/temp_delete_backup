import { Card, Row, Col, Statistic, DatePicker, Table } from 'antd'
import { BarChartOutlined, LineChartOutlined } from '@ant-design/icons'

export function Reports() {
  return (
    <div>
      <h2>报表中心</h2>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card>
            <Statistic
              title="本月收入"
              value={123456}
              prefix="¥"
              suffix={<BarChartOutlined />}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title="本月订单数"
              value={589}
              prefix={<LineChartOutlined />}
            />
          </Card>
        </Col>
      </Row>
      <Card title="近期订单" style={{ marginBottom: 24 }}>
        <Table
          dataSource={[
            { id: '1', customer: '张三', venue: '朝阳区体育馆', amount: 299, date: '2026-03-20' },
            { id: '2', customer: '李四', venue: '海淀区体育中心', amount: 199, date: '2026-03-19' },
            { id: '3', customer: '王五', venue: '朝阳区体育馆', amount: 399, date: '2026-03-18' },
          ]}
          columns={[
            { title: 'ID', dataIndex: 'id', key: 'id' },
            { title: '客户', dataIndex: 'customer', key: 'customer' },
            { title: '场馆', dataIndex: 'venue', key: 'venue' },
            { title: '金额', dataIndex: 'amount', key: 'amount', render: (v: number) => `¥${v}` },
            { title: '日期', dataIndex: 'date', key: 'date' },
          ]}
          rowKey="id"
          pagination={false}
        />
      </Card>
    </div>
  )
}
