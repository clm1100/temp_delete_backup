import { Table, Button, Space } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useVenueStore } from '@/stores/venueStore'

interface VenueRecord {
  id: string
  name: string
  address: string
  status: 'active' | 'inactive'
}

export function Venues() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const enterVenue = useVenueStore((state) => state.enterVenue)

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
      title: t('venue.venueList'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('venue.address'),
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: t('venue.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (status === 'active' ? t('venue.active') : t('venue.inactive')),
    },
    {
      title: t('common.edit'),
      key: 'action',
      render: (_: unknown, record: VenueRecord) => (
        <Space>
          <Button type="primary" onClick={() => handleEnterVenue(record)}>
            {t('menu.venueManagement')}
          </Button>
          <Button type="link">{t('common.edit')}</Button>
          <Button type="link" danger>{t('common.delete')}</Button>
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
      <h2>{t('menu.venues')}</h2>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary">{t('venue.addVenue')}</Button>
      </div>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </div>
  )
}
