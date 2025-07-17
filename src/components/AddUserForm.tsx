import React, { useState } from 'react';
import { UserPlus, AlertCircle } from 'lucide-react';

interface AddUserFormProps {
  existingUsers: string[];
  onAddUser: (name: string) => void;
}

export const AddUserForm: React.FC<AddUserFormProps> = ({ existingUsers, onAddUser }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedName = name.trim();
    
    // Validation
    if (!trimmedName) {
      setError('Name is required');
      return;
    }
    
    if (trimmedName.length < 2) {
      setError('Name must be at least 2 characters');
      return;
    }
    
    if (existingUsers.some(existing => existing.toLowerCase() === trimmedName.toLowerCase())) {
      setError('A user with this name already exists');
      return;
    }
    
    // Success
    onAddUser(trimmedName);
    setName('');
    setError('');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (error) setError(''); // Clear error when user starts typing
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
        Add New User
      </label>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter user name..."
            className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all duration-200 input ${
              error 
                ? 'focus:ring-red-400' 
                : 'focus:ring-blue-400 focus:border-transparent'
            }`}
            style={{
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              borderColor: error ? 'var(--color-error)' : 'var(--border-primary)'
            }}
            maxLength={50}
          />
          
          {error && (
            <div className="mt-2 flex items-center space-x-2 text-sm animate-fadeIn" style={{ color: 'var(--color-error)' }}>
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}
        </div>
        
        <button
          type="submit"
          disabled={!name.trim()}
          className="w-full px-4 py-3 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transform hover:scale-105 active:scale-95 button"
          style={{
            backgroundColor: 'var(--color-secondary)',
            color: 'var(--text-inverse)'
          }}
        >
          <UserPlus className="h-4 w-4" />
          <span>Add User</span>
        </button>
      </form>
    </div>
  );
};