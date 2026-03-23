import { Table, Button, Space } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useNavigate } from 'react-router-dom'
import { useVenue } from '@/contexts/VenueContext'

interface VenueRecord {
  id: string
  name: string
  address: string
  status: 'active' | 'inactive'
}

export function Venues() {
  const navigate = useNavigate()
  const { enterVenue } = useVenue()

  const handleEnterVenue = (record: VenueRecord) => {
    enterVenue(record.id, record.name)
    navigate(`/venue/${record.id}/dashboard`)
  }

  const columns: ColumnsType<VenueRecord> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '场馆名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (status === 'active' ? '营业中' : '已关闭'),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: unknown, record: VenueRecord) => (
        <Space>
          <Button type="primary" onClick={() => handleEnterVenue(record)}>
            进入场馆
          </Button>
          <Button type="link">编辑</Button>
          <Button type="link" danger>删除</Button>
        </Space>
      ),
    },
  ]

  const data: VenueRecord[] = [
    { id: 'venue-1', name: '朝阳区体育馆', address: '北京市朝阳区建国路88号', status: 'active' },
    { id: 'venue-2', name: '海淀区体育中心', address: '北京市海淀区中关村大街1号', status: 'active' },
    { id: 'venue-3', name: '东城区健身馆', address: '北京市东城区东单大街52号', status: 'inactive' },
  ]

  return (
    <div>
      <h2>体育馆管理</h2>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary">新增场馆</Button>
      </div>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </div>
  )
}
