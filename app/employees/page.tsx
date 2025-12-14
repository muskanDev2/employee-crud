'use client';

import { useState, useMemo } from 'react';
import { Button, Input, Space, Card, message } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { EmployeeTable } from '../components/EmployeeTable';
import { EmployeeFormModal } from '../components/EmployeeFormModal';
import { useEmployees } from '../hooks/useEmployees';
import { Employee, EmployeeFormData, EmployeeRole, EmployeeStatus } from '../types/employee';

const { Search } = Input;

export default function EmployeesPage() {
  const {
    employees,
    loading,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeById,
  } = useEmployees();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [searchText, setSearchText] = useState('');
  const [roleFilter, setRoleFilter] = useState<EmployeeRole | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<EmployeeStatus | 'all'>('all');

  // Filter and search employees Feature
  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch =
        searchText === '' ||
        employee.name.toLowerCase().includes(searchText.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchText.toLowerCase());

      const matchesRole = roleFilter === 'all' || employee.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [employees, searchText, roleFilter, statusFilter]);

  const handleAdd = () => {
    setModalMode('add');
    setEditingEmployee(null);
    setIsModalOpen(true);
  };

  const handleEdit = (employee: Employee) => {
    setModalMode('edit');
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteEmployee(id);
    message.success('Employee deleted successfully!');
  };

  const handleModalSubmit = (values: EmployeeFormData) => {
    const employeeData: Omit<Employee, 'id'> = {
      name: values.name,
      email: values.email,
      role: values.role,
      status: values.status ? 'Active' : 'Inactive',
    };

    if (modalMode === 'add') {
      addEmployee(employeeData);
    } else if (editingEmployee) {
      updateEmployee(editingEmployee.id, employeeData);
    }

    setIsModalOpen(false);
    setEditingEmployee(null);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
  };

  return (
    <div style={{ padding: '24px', minHeight: '100vh', background: '#f0f2f5' }}>
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* Header Section */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 600 }}>
              Employee Management
            </h1>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAdd}
              size="large"
            >
              Add Employee
            </Button>
          </div>

          {/* Search and Filter Section (bonous also implemented )*/}
          <Space
            direction="vertical"
            size="middle"
            style={{ width: '100%' }}
          >
            <Search
              placeholder="Search by name or email"
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ maxWidth: '400px' }}
            />

            <Space wrap>
              <span style={{ fontWeight: 500 }}>Filter by Role:</span>
              <Button
                type={roleFilter === 'all' ? 'primary' : 'default'}
                onClick={() => setRoleFilter('all')}
              >
                All
              </Button>
              <Button
                type={roleFilter === 'Developer' ? 'primary' : 'default'}
                onClick={() => setRoleFilter('Developer')}
              >
                Developer
              </Button>
              <Button
                type={roleFilter === 'Lead' ? 'primary' : 'default'}
                onClick={() => setRoleFilter('Lead')}
              >
                Lead
              </Button>
              <Button
                type={roleFilter === 'Designer' ? 'primary' : 'default'}
                onClick={() => setRoleFilter('Designer')}
              >
                Designer
              </Button>
            </Space>

            <Space wrap>
              <span style={{ fontWeight: 500 }}>Filter by Status:</span>
              <Button
                type={statusFilter === 'all' ? 'primary' : 'default'}
                onClick={() => setStatusFilter('all')}
              >
                All
              </Button>
              <Button
                type={statusFilter === 'Active' ? 'primary' : 'default'}
                onClick={() => setStatusFilter('Active')}
              >
                Active
              </Button>
              <Button
                type={statusFilter === 'Inactive' ? 'primary' : 'default'}
                onClick={() => setStatusFilter('Inactive')}
              >
                Inactive
              </Button>
            </Space>
          </Space>

          {/* Employee Table as per Requiremnet */}
          <EmployeeTable
            employees={filteredEmployees}
            onEdit={handleEdit}
            onDelete={handleDelete}
            loading={loading}
          />
        </Space>
      </Card>

      {/* Employee Form Modal as per Requirement*/}
      <EmployeeFormModal
        open={isModalOpen}
        onCancel={handleModalCancel}
        onSubmit={handleModalSubmit}
        initialValues={editingEmployee}
        mode={modalMode}
      />
    </div>
  );
}
