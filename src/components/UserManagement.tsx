'use client';

import { useState, useEffect } from 'react';
import { Table, Button, Input, Modal, message, Tag, Space, Tooltip, Switch } from 'antd';
import { 
  SearchOutlined, 
  DeleteOutlined, 
  EyeOutlined, 
  LockOutlined, 
  UnlockOutlined,
  ReloadOutlined,
  UserOutlined 
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  gender: string;
  dateOfBirth: string;
  role: string;
  profileCompleted: boolean;
  status: 'active' | 'blocked';
  createdAt?: string;
}

interface UsersResponse {
  success: boolean;
  data: {
    data: User[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
  error?: string;
}

export default function AdminUsersManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Fetch users
  const fetchUsers = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/users?page=${page}&limit=${limit}`);
      const data: UsersResponse = await response.json();

      if (data.success) {
        setUsers(data.data.data);
        setPagination({
          current: data.data.pagination.page,
          pageSize: data.data.pagination.limit,
          total: data.data.pagination.total,
        });
      } else {
        message.error(data.error || 'Failed to fetch users');
      }
    } catch (error) {
      message.error('Failed to fetch users');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch single user by ID
  const fetchUserById = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`);
      const data = await response.json();

      if (data.success) {
        setSelectedUser(data.data);
        setIsViewModalOpen(true);
      } else {
        message.error(data.error || 'User not found');
      }
    } catch (error) {
      message.error('Failed to fetch user details');
      console.error(error);
    }
  };

  // Toggle user status (active/blocked)
  const toggleUserStatus = async (userId: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'active' ? 'blocked' : 'active';
      const response = await fetch(`/api/admin/users/${userId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (data.success) {
        message.success(`User ${newStatus === 'blocked' ? 'blocked' : 'activated'} successfully`);
        fetchUsers(pagination.current, pagination.pageSize);
      } else {
        message.error(data.error || 'Failed to update user status');
      }
    } catch (error) {
      message.error('Failed to update user status');
      console.error(error);
    }
  };

  // Delete user
  const deleteUser = async (userId: string, userEmail: string) => {
    Modal.confirm({
      title: 'Delete User Account',
      content: `Are you sure you want to permanently delete ${userEmail}? This action cannot be undone.`,
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          const response = await fetch(`/api/admin/users/${userId}`, {
            method: 'DELETE',
          });

          const data = await response.json();

          if (data.success) {
            message.success('User deleted successfully');
            fetchUsers(pagination.current, pagination.pageSize);
          } else {
            message.error(data.error || 'Failed to delete user');
          }
        } catch (error) {
          message.error('Failed to delete user');
          console.error(error);
        }
      },
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users based on search
  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchText.toLowerCase()) ||
      user.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
      user.id.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<User> = [
    {
      title: 'User ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      render: (id: string) => (
        <Tooltip title={id}>
          <span className="font-mono text-xs">{id.substring(0, 8)}...</span>
        </Tooltip>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (name: string, record: User) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
            <UserOutlined className="text-orange-600" />
          </div>
          <div>
            <div className="font-medium text-slate-800">{name}</div>
            <div className="text-xs text-slate-500">{record.gender}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <Tag color={role === 'admin' ? 'red' : 'blue'}>
          {role.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Profile',
      dataIndex: 'profileCompleted',
      key: 'profileCompleted',
      render: (completed: boolean) => (
        <Tag color={completed ? 'green' : 'orange'}>
          {completed ? 'Complete' : 'Incomplete'}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string, record: User) => (
        <Switch
          checked={status === 'active'}
          checkedChildren="Active"
          unCheckedChildren="Blocked"
          onChange={() => toggleUserStatus(record.id, status)}
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 180,
      render: (_, record: User) => (
        <Space size="small">
          <Tooltip title="View Details">
            <Button
              type="primary"
              icon={<EyeOutlined />}
              size="small"
              onClick={() => fetchUserById(record.id)}
              className="bg-blue-500 hover:bg-blue-600"
            />
          </Tooltip>
          <Tooltip title={record.status === 'active' ? 'Block User' : 'Activate User'}>
            <Button
              type="default"
              icon={record.status === 'active' ? <LockOutlined /> : <UnlockOutlined />}
              size="small"
              onClick={() => toggleUserStatus(record.id, record.status)}
            />
          </Tooltip>
          <Tooltip title="Delete User">
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              size="small"
              onClick={() => deleteUser(record.id, record.email)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold mb-1">User Management</h1>
        <p className="text-orange-100">Manage all user accounts and permissions</p>
      </div>

      {/* Search and Actions */}
      <div className="bg-white rounded-xl p-4 shadow-md border border-slate-200">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <Input
            placeholder="Search by name, email, or user ID"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="md:w-96"
            size="large"
          />
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            onClick={() => fetchUsers(pagination.current, pagination.pageSize)}
            className="bg-gradient-to-r from-orange-500 to-orange-600 border-0"
            size="large"
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey="id"
          loading={loading}
          pagination={{
            ...pagination,
            showTotal: (total) => `Total ${total} users`,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50', '100'],
          }}
          onChange={(newPagination) => {
            fetchUsers(newPagination.current, newPagination.pageSize);
          }}
        />
      </div>

      {/* View User Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <UserOutlined className="text-orange-500" />
            <span>User Details</span>
          </div>
        }
        open={isViewModalOpen}
        onCancel={() => {
          setIsViewModalOpen(false);
          setSelectedUser(null);
        }}
        footer={[
          <Button key="close" onClick={() => setIsViewModalOpen(false)}>
            Close
          </Button>,
        ]}
        width={600}
      >
        {selectedUser && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-slate-500 text-sm">User ID</p>
                <p className="font-mono text-xs bg-slate-100 p-2 rounded">{selectedUser.id}</p>
              </div>
              <div>
                <p className="text-slate-500 text-sm">Role</p>
                <p className="font-medium">
                  <Tag color={selectedUser.role === 'admin' ? 'red' : 'blue'}>
                    {selectedUser.role.toUpperCase()}
                  </Tag>
                </p>
              </div>
              <div>
                <p className="text-slate-500 text-sm">Full Name</p>
                <p className="font-medium">{selectedUser.fullName}</p>
              </div>
              <div>
                <p className="text-slate-500 text-sm">Email</p>
                <p className="font-medium">{selectedUser.email}</p>
              </div>
              <div>
                <p className="text-slate-500 text-sm">Gender</p>
                <p className="font-medium capitalize">{selectedUser.gender}</p>
              </div>
              <div>
                <p className="text-slate-500 text-sm">Date of Birth</p>
                <p className="font-medium">{selectedUser.dateOfBirth}</p>
              </div>
              <div>
                <p className="text-slate-500 text-sm">Profile Status</p>
                <p className="font-medium">
                  <Tag color={selectedUser.profileCompleted ? 'green' : 'orange'}>
                    {selectedUser.profileCompleted ? 'Complete' : 'Incomplete'}
                  </Tag>
                </p>
              </div>
              <div>
                <p className="text-slate-500 text-sm">Account Status</p>
                <p className="font-medium">
                  <Tag color={selectedUser.status === 'active' ? 'green' : 'red'}>
                    {selectedUser.status?.toUpperCase() || 'ACTIVE'}
                  </Tag>
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}