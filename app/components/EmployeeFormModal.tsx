'use client';

import { Modal, Form, Input, Select, Switch, message } from 'antd';
import { useEffect } from 'react';
import { Employee, EmployeeFormData, EmployeeRole } from '../types/employee';

const { Option } = Select;

interface EmployeeFormModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: EmployeeFormData) => void;
  initialValues?: Employee | null;
  mode: 'add' | 'edit';
}

export function EmployeeFormModal({
  open,
  onCancel,
  onSubmit,
  initialValues,
  mode,
}: EmployeeFormModalProps) {
  const [form] = Form.useForm<EmployeeFormData>();

  useEffect(() => {
    if (open) {
      if (mode === 'edit' && initialValues) {
        form.setFieldsValue({
          name: initialValues.name,
          email: initialValues.email,
          role: initialValues.role,
          status: initialValues.status === 'Active',
        });
      } else {
        form.resetFields();
      }
    }
  }, [open, initialValues, mode, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
      form.resetFields();
      message.success(
        mode === 'add' ? 'Employee added successfully!' : 'Employee updated successfully!'
      );
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title={mode === 'add' ? 'Add Employee' : 'Edit Employee'}
      open={open}
      onOk={handleSubmit}
      onCancel={handleCancel}
      okText={mode === 'add' ? 'Add' : 'Update'}
      cancelText="Cancel"
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: 'Please enter employee name' },
            { min: 2, message: 'Name must be at least 2 characters' },
            { max: 50, message: 'Name must not exceed 50 characters' },
          ]}
        >
          <Input placeholder="Enter employee name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter email address' },
            { type: 'email', message: 'Please enter a valid email address' },
          ]}
        >
          <Input placeholder="Enter email address" type="email" />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: 'Please select a role' }]}
        >
          <Select placeholder="Select role">
            <Option value="Developer">Developer</Option>
            <Option value="Lead">Lead</Option>
            <Option value="Designer">Designer</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch
            checkedChildren="Active"
            unCheckedChildren="Inactive"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}



