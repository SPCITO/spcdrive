'use client';
import { useState } from 'react';
import { UserManagementData } from '@/types/dashboard';

const MOCK_USERS: UserManagementData[] = [
  { id: '1', name: 'John Doe', email: 'john@spc.com', role: 'admin', status: 'active' },
  { id: '2', name: 'Sarah Smith', email: 'sarah@spc.com', role: 'user', status: 'pending' },
  { id: '3', name: 'Mike Ross', email: 'mike@spc.com', role: 'user', status: 'disabled' },
];

export function useUserManagement() {
  const [users, setUsers] = useState<UserManagementData[]>(MOCK_USERS);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserManagementData | null>(null);

  const toggleStatus = (id: string) => {
    setUsers(prev => prev.map(u => 
      u.id === id ? { ...u, status: u.status === 'active' ? 'disabled' : 'active' } : u
    ));
  };

  const approveUser = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: 'active' } : u));
  };

  const openEdit = (user: UserManagementData) => {
    setSelectedUser(user);
    setIsEditing(true);
  };

  const closeEdit = () => {
    setSelectedUser(null);
    setIsEditing(false);
  };

  return {
    users,
    setUsers,
    isEditing,
    selectedUser,
    toggleStatus,
    approveUser,
    openEdit,
    closeEdit
  };
}