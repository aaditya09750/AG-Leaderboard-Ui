import React from 'react';
import { User } from '../types';
import { ChevronDown, User as UserIcon } from 'lucide-react';

interface UserSelectorProps {
  users: User[];
  selectedUserId: string | null;
  onSelectUser: (userId: string) => void;
}

export const UserSelector: React.FC<UserSelectorProps> = ({
  users,
  selectedUserId,
  onSelectUser,
}) => {
  const selectedUser = users.find(user => user.id === selectedUserId);

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-white/90">
        Select User to Award Points
      </label>
      
      <div className="relative">
        <select
          value={selectedUserId || ''}
          onChange={(e) => onSelectUser(e.target.value)}
          className="w-full appearance-none rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 transition-all duration-200 input"
          style={{ 
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            borderColor: 'var(--border-primary)'
          }}
        >
          <option value="" disabled style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
            Choose a user...
          </option>
          {users.map((user) => (
            <option key={user.id} value={user.id} style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
              {user.name} ({user.totalPoints} points)
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDown className="h-5 w-5" style={{ color: 'var(--text-secondary)' }} />
        </div>
      </div>
      
      {selectedUser && (
        <div className="p-3 rounded-lg animate-fadeIn" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-primary)' }}>
          <div className="flex items-center space-x-2">
            <UserIcon className="h-4 w-4" style={{ color: 'var(--color-primary)' }} />
            <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{selectedUser.name}</span>
            <span className="text-sm" style={{ color: 'var(--color-primary)' }}>
              Current: {selectedUser.totalPoints} points
            </span>
          </div>
        </div>
      )}
    </div>
  );
};