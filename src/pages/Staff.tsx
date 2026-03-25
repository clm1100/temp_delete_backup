import { Table, Button, Space, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useTranslation } from 'react-i18next'
import { usePermission } from '@/hooks/usePermission'

interface StaffRecord {
  id: string
  name: string
  email: string
  role: string
  status: string
}

export function Staff() {
  const { t } = useTranslation()
  const { hasPermission } = usePermission()
  const canEdit = hasPermission('staff:edit')

  const columns: ColumnsType<StaffRecord> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: t('staff.name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('staff.email'),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: t('staff.role'),
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => {
        const tagColor: Record<string, string> = {
          venue_admin: 'blue',
          staff: 'green',
        }
        return <Tag color={tagColor[role]}>{t(`roles.${role}`)}</Tag>
      },
    },
    {
      title: t('staff.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (status === 'active' ? t('staff.active') : t('staff.inactive')),
    },
    {
      title: t('common.edit'),
      key: 'action',
      render: () => (
        <Space>
          <Button type="link" disabled={!canEdit}>{t('common.edit')}</Button>
          <Button type="link" danger disabled={!canEdit}>{t('common.delete')}</Button>
        </Space>
      ),
    },
  ]

  const data: StaffRecord[] = [
    { id: '1', name: '张三', email: 'zhangsan@example.com', role: 'venue_admin', status: 'active' },
    { id: '2', name: '李四', email: 'lisi@example.com', role: 'staff', status: 'active' },
    { id: '3', name: '王五', email: 'wangwu@example.com', role: 'staff', status: 'inactive' },
  ]

  return (
    <div>
      <h2>{t('menu.staff')}</h2>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" disabled={!canEdit}>{t('staff.addStaff')}</Button>
      </div>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </div>
  )
}
