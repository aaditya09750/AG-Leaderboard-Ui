import React from 'react';
import { User } from '../types';
import { Trophy, Medal, Award, Crown, Trash2 } from 'lucide-react';

interface LeaderboardProps {
  users: User[];
  onDeleteUser: (userId: string) => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ users, onDeleteUser }) => {
  // Sort users by total points (descending), then by name (ascending) for tie-breaking
  const sortedUsers = [...users].sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }
    return a.name.localeCompare(b.name);
  });

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-400" />;
      case 2:
        return <Trophy className="h-6 w-6 text-gray-300" />;
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />;
      default:
        return (
          <div className="h-6 w-6 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
            <span className="text-xs font-bold text-blue-300">{rank}</span>
          </div>
        );
    }
  };

  const getRankStyles = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-400/30 shadow-yellow-400/20';
      case 2:
        return 'bg-gradient-to-r from-gray-400/20 to-slate-400/20 border-gray-300/30 shadow-gray-400/20';
      case 3:
        return 'bg-gradient-to-r from-amber-600/20 to-orange-500/20 border-amber-500/30 shadow-amber-400/20';
      default:
        return 'bg-white/10 border-white/20 shadow-blue-400/10';
    }
  };

  if (users.length === 0) {
    return (
      <div className="text-center py-8" style={{ color: 'var(--text-secondary)' }}>
        <Award className="h-12 w-12 mx-auto mb-3 opacity-50" />
        <p>No users yet. Add some users to see the leaderboard!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold mb-4 flex items-center space-x-2" style={{ color: 'var(--text-primary)' }}>
        <Trophy className="h-6 w-6" style={{ color: 'var(--color-warning)' }} />
        <span>Leaderboard</span>
      </h2>
      
      <div className="space-y-2">
        {sortedUsers.map((user, index) => {
          const rank = index + 1;
          return (
            <div
              key={user.id}
              className={`border rounded-xl p-4 transition-all duration-200 hover:shadow-lg shadow-md group`}
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-primary)'
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center">
                    {getRankIcon(rank)}
                  </div>
                  
                  <div>
                    <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{user.name}</h3>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {user.totalPoints} points
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                      #{rank}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => onDeleteUser(user.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 rounded-lg transition-all duration-200"
                    style={{ 
                      color: 'var(--color-error)',
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-error)';
                      e.currentTarget.style.color = 'var(--text-inverse)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'var(--color-error)';
                    }}
                    title="Delete user"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};