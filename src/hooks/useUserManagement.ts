'use client';
import { useState } from 'react';
import { UserManagementData } from '@/types/dashboard';
import { MOCK_USERS, MockUser } from '@/lib/mock-data';

export function useUserManagement() {
  // Use the MockUser type so the state 'remembers' passwords
  const [users, setUsers] = useState<MockUser[]>(MOCK_USERS);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState<MockUser | null>(null);

  const toggleStatus = (id: string) => {
    setUsers(prev => prev.map(u => 
      u.id === id ? { ...u, status: u.status === 'active' ? 'disabled' : 'active' } : u
    ));
  };

  const approveUser = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: 'active' } : u));
  };

  /**
   * updateUserDetails
   * This is where the Admin saves changes to Name, Email, or Password.
   */
  const updateUserDetails = (updatedUser: MockUser) => {
    setUsers(prev => prev.map(u => 
      u.id === updatedUser.id ? { ...u, ...updatedUser } : u
    ));
    closeEdit();
  };

  const openEdit = (user: MockUser) => {
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
    updateUserDetails, // Now supports password updates
    openEdit,
    closeEdit
  };
}