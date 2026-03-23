import { Table, Button, Space, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { usePermission } from '@/hooks/usePermission'

interface StaffRecord {
  id: string
  name: string
  email: string
  role: string
  status: string
}

export function Staff() {
  const { hasPermission } = usePermission()
  const canEdit = hasPermission('staff:edit')

  const columns: ColumnsType<StaffRecord> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => {
        const tagColor: Record<string, string> = {
          venue_admin: 'blue',
          staff: 'green',
        }
        const roleLabel: Record<string, string> = {
          venue_admin: '场馆管理员',
          staff: '普通员工',
        }
        return <Tag color={tagColor[role]}>{roleLabel[role] || role}</Tag>
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (status === 'active' ? '在职' : '离职'),
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space>
          <Button type="link" disabled={!canEdit}>编辑</Button>
          <Button type="link" danger disabled={!canEdit}>删除</Button>
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
      <h2>员工管理</h2>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" disabled={!canEdit}>新增员工</Button>
      </div>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </div>
  )
}
