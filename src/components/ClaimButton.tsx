import React, { useState } from 'react';
import { Gift, Sparkles, Zap } from 'lucide-react';
import { ClaimResult } from '../types';

interface ClaimButtonProps {
  selectedUserId: string | null;
  onClaim: (userId: string) => ClaimResult;
  disabled?: boolean;
}

export const ClaimButton: React.FC<ClaimButtonProps> = ({
  selectedUserId,
  onClaim,
  disabled = false,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [lastResult, setLastResult] = useState<ClaimResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleClaim = () => {
    if (!selectedUserId || disabled || isAnimating) return;

    setIsAnimating(true);
    
    // Add a small delay for better UX
    setTimeout(() => {
      const result = onClaim(selectedUserId);
      setLastResult(result);
      setShowResult(true);
      setIsAnimating(false);
      
      // Hide result after 3 seconds
      setTimeout(() => setShowResult(false), 3000);
    }, 500);
  };

  const isDisabled = !selectedUserId || disabled || isAnimating;

  return (
    <div className="space-y-4">
      <button
        onClick={handleClaim}
        disabled={isDisabled}
        className={`w-full px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 focus:outline-none focus:ring-2 flex items-center justify-center space-x-3 shadow-lg transform ${
          isDisabled
            ? 'cursor-not-allowed opacity-50'
            : 'hover:scale-105 active:scale-95'
        } ${isAnimating ? 'animate-pulse' : ''}`}
        style={{
          backgroundColor: isDisabled ? 'var(--bg-tertiary)' : 'var(--color-accent)',
          color: isDisabled ? 'var(--text-muted)' : 'var(--text-inverse)',
          borderColor: 'var(--border-focus)'
        }}
      >
        {isAnimating ? (
          <>
            <Zap className="h-6 w-6 animate-bounce" />
            <span>Claiming Points...</span>
            <Sparkles className="h-6 w-6 animate-spin" />
          </>
        ) : (
          <>
            <Gift className="h-6 w-6" />
            <span>Claim Random Points</span>
            <Sparkles className="h-6 w-6" />
          </>
        )}
      </button>

      {showResult && lastResult && (
        <div className="p-4 rounded-xl animate-fadeIn" style={{ 
          backgroundColor: 'var(--bg-secondary)', 
          border: '1px solid var(--color-accent)' 
        }}>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1 animate-bounce" style={{ color: 'var(--color-accent)' }}>
              +{lastResult.pointsAwarded} Points! 🎉
            </div>
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              New total: {lastResult.newTotal} points
            </div>
          </div>
        </div>
      )}
    </div>
  );
};