'use client';

import { Table, Button, Popconfirm, Tag, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Employee, EmployeeRole, EmployeeStatus } from '../types/employee';

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
}

export function EmployeeTable({
  employees,
  onEdit,
  onDelete,
  loading = false,
}: EmployeeTableProps) {
  const columns: ColumnsType<Employee> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      width: '20%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
      width: '25%',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      filters: [
        { text: 'Developer', value: 'Developer' },
        { text: 'Lead', value: 'Lead' },
        { text: 'Designer', value: 'Designer' },
      ],
      onFilter: (value, record) => record.role === value,
      sorter: (a, b) => a.role.localeCompare(b.role),
      width: '15%',
      render: (role: EmployeeRole) => {
        const colorMap: Record<EmployeeRole, string> = {
          Developer: 'blue',
          Lead: 'purple',
          Designer: 'green',
        };
        return <Tag color={colorMap[role]}>{role}</Tag>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Active', value: 'Active' },
        { text: 'Inactive', value: 'Inactive' },
      ],
      onFilter: (value, record) => record.status === value,
      sorter: (a, b) => a.status.localeCompare(b.status),
      width: '15%',
      render: (status: EmployeeStatus) => {
        return (
          <Tag color={status === 'Active' ? 'success' : 'default'}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '25%',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
            size="small"
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete Employee"
            description="Are you sure you want to delete this employee?"
            onConfirm={() => onDelete(record.id)}
            okText="Yes"
            cancelText="No"
            okType="danger"
          >
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              size="small"
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={employees}
      rowKey="id"
      loading={loading}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showTotal: (total) => `Total ${total} employees`,
        pageSizeOptions: ['5', '10', '20', '50'],
      }}
      scroll={{ x: 'max-content' }}
    />
  );
}



