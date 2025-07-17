import React from 'react';
import { PointHistory as PointHistoryType } from '../types';
import { Clock, TrendingUp, User as UserIcon } from 'lucide-react';

interface PointHistoryProps {
  history: PointHistoryType[];
}

export const PointHistory: React.FC<PointHistoryProps> = ({ history }) => {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  if (history.length === 0) {
    return (
      <div className="text-center py-8" style={{ color: 'var(--text-secondary)' }}>
        <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
        <p>No point history yet. Claim some points to see the history!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4 flex items-center space-x-2" style={{ color: 'var(--text-primary)' }}>
        <Clock className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
        <span>Point History</span>
        <span className="text-sm font-normal" style={{ color: 'var(--text-secondary)' }}>({history.length} transactions)</span>
      </h2>
      
      <div className="max-h-96 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        {history.map((entry) => (
          <div
            key={entry.id}
            className="border rounded-lg p-3 transition-all duration-200"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-primary)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <UserIcon className="h-4 w-4" style={{ color: 'var(--color-primary)' }} />
                </div>
                <div>
                  <div className="font-medium" style={{ color: 'var(--text-primary)' }}>{entry.userName}</div>
                  <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{formatTimestamp(entry.timestamp)}</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4" style={{ color: 'var(--color-accent)' }} />
                  <span className="font-bold" style={{ color: 'var(--color-accent)' }}>+{entry.pointsAwarded}</span>
                </div>
                <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Total: {entry.newTotal}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};