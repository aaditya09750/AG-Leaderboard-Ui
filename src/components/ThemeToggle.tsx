import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useThemeContext } from './ThemeProvider';

export const ThemeToggle: React.FC = () => {
  const { theme, resolvedTheme, setTheme } = useThemeContext();

  const themes = [
    { value: 'light' as const, icon: Sun, label: 'Light' },
    { value: 'dark' as const, icon: Moon, label: 'Dark' },
  ];

  return (
    <div className="theme-toggle-container">
      <div className="theme-toggle-group">
        {themes.map(({ value, icon: Icon, label }) => (
          <button
            key={value}
            onClick={() => setTheme(value)}
            className={`theme-toggle-button ${theme === value ? 'active' : ''}`}
            aria-label={`Switch to ${label} theme`}
            title={`${label} theme`}
          >
            <Icon className="theme-toggle-icon" />
            <span className="theme-toggle-label">{label}</span>
          </button>
        ))}
      </div>
      
      {/* Current resolved theme indicator */}
      <div className="theme-indicator">
        <span className="theme-indicator-text">
          Current: {resolvedTheme === 'light' ? 'Light' : 'Dark'}
        </span>
        <div className={`theme-indicator-dot ${resolvedTheme}`}></div>
      </div>
    </div>
  );
};

// Compact toggle button version
export const CompactThemeToggle: React.FC = () => {
  const { resolvedTheme, toggleTheme } = useThemeContext();

  return (
    <button
      onClick={toggleTheme}
      className="compact-theme-toggle"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      <div className="toggle-track">
        <div className="toggle-thumb">
          {resolvedTheme === 'light' ? (
            <Sun className="toggle-icon" />
          ) : (
            <Moon className="toggle-icon" />
          )}
        </div>
      </div>
    </button>
  );
};