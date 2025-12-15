'use client';

import { useState, useEffect } from 'react';
import { Table, Button, Input, message, Tag, Space, Tooltip, Switch } from 'antd';
import { 
  SearchOutlined, 
  DeleteOutlined, 
  EyeOutlined, 
  LockOutlined, 
  UnlockOutlined,
  ReloadOutlined,
  UserOutlined,
  CloseOutlined,
  ExclamationCircleOutlined
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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<{ id: string; email: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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

  // Open delete modal
  const openDeleteModal = (userId: string, userEmail: string) => {
    setUserToDelete({ id: userId, email: userEmail });
    setIsDeleteModalOpen(true);
  };

  // Handle delete confirmation
  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/admin/users/${userToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success || response.ok) {
        message.success('User deleted successfully');
        fetchUsers(pagination.current, pagination.pageSize);
        setIsDeleteModalOpen(false);
        setUserToDelete(null);
      } else {
        message.error(data.error || data.message || 'Failed to delete user');
      }
    } catch (error) {
      message.error('Failed to delete user');
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Close delete modal
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
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
              onClick={(e) => {
                e.stopPropagation();
                fetchUserById(record.id);
              }}
              className="bg-blue-500 hover:bg-blue-600"
            />
          </Tooltip>
          <Tooltip title={record.status === 'active' ? 'Block User' : 'Activate User'}>
            <Button
              type="default"
              icon={record.status === 'active' ? <LockOutlined /> : <UnlockOutlined />}
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                toggleUserStatus(record.id, record.status);
              }}
            />
          </Tooltip>
          <Tooltip title="Delete User">
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                openDeleteModal(record.id, record.email);
              }}
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
      {isViewModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 sticky top-0 bg-white">
              <div className="flex items-center gap-2">
                <UserOutlined className="text-orange-500 text-xl" />
                <h2 className="text-xl font-bold text-slate-800">User Details</h2>
              </div>
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setSelectedUser(null);
                }}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <CloseOutlined className="text-slate-600" />
              </button>
            </div>

            {/* Modal Content */}
            {selectedUser && (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-500 text-sm mb-1">User ID</p>
                    <p className="font-mono text-xs bg-slate-100 p-2 rounded">{selectedUser.id}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm mb-1">Role</p>
                    <p className="font-medium">
                      <Tag color={selectedUser.role === 'admin' ? 'red' : 'blue'}>
                        {selectedUser.role.toUpperCase()}
                      </Tag>
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm mb-1">Full Name</p>
                    <p className="font-medium text-slate-800">{selectedUser.fullName}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm mb-1">Email</p>
                    <p className="font-medium text-slate-800">{selectedUser.email}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm mb-1">Gender</p>
                    <p className="font-medium text-slate-800 capitalize">{selectedUser.gender}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm mb-1">Date of Birth</p>
                    <p className="font-medium text-slate-800">{selectedUser.dateOfBirth}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm mb-1">Profile Status</p>
                    <p className="font-medium">
                      <Tag color={selectedUser.profileCompleted ? 'green' : 'orange'}>
                        {selectedUser.profileCompleted ? 'Complete' : 'Incomplete'}
                      </Tag>
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm mb-1">Account Status</p>
                    <p className="font-medium">
                      <Tag color={selectedUser.status === 'active' ? 'green' : 'red'}>
                        {selectedUser.status?.toUpperCase() || 'ACTIVE'}
                      </Tag>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setSelectedUser(null);
                }}
                className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <div className="flex items-center gap-2 text-red-600">
                <ExclamationCircleOutlined className="text-2xl" />
                <h2 className="text-xl font-bold">Delete User Account</h2>
              </div>
              <button
                onClick={closeDeleteModal}
                disabled={isDeleting}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
              >
                <CloseOutlined className="text-slate-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              <p className="text-slate-700">Are you sure you want to permanently delete:</p>
              
              {userToDelete && (
                <>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <p className="font-semibold text-orange-700">{userToDelete.email}</p>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                    <span className="text-red-600 text-xl flex-shrink-0">⚠️</span>
                    <p className="text-red-700 text-sm">
                      This action cannot be undone. All user data will be permanently removed from the system.
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
              <button
                onClick={closeDeleteModal}
                disabled={isDeleting}
                className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Deleting...
                  </>
                ) : (
                  'Yes, Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}