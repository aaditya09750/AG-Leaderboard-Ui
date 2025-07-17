import React, { useState } from 'react';
import { useThemeContext } from './ThemeProvider';
import { CompactThemeToggle } from './ThemeToggle';
import { Gamepad2, Users, History, Menu, X, Zap } from 'lucide-react';

interface NavbarProps {
  activeTab: 'game' | 'leaderboard' | 'history';
  onTabChange: (tab: 'game' | 'leaderboard' | 'history') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { resolvedTheme } = useThemeContext();

  // Navigation items configuration
  const navigationItems = [
    { id: 'game', label: 'Game', icon: Gamepad2, description: 'Claim points and manage users' },
    { id: 'leaderboard', label: 'Leaderboard', icon: Users, description: 'View user rankings' },
    { id: 'history', label: 'History', icon: History, description: 'Point transaction history' },
  ] as const;

  const handleTabClick = (tabId: 'game' | 'leaderboard' | 'history') => {
    onTabChange(tabId);
    setIsMobileMenuOpen(false); // Close mobile menu on selection
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Fixed Navigation Bar */}
      <nav 
        className="navbar-container"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar-content">
          {/* Logo/Brand Section - Left */}
          <div className="navbar-brand">
            <div className="brand-icon">
              <Zap className="h-6 w-6" aria-hidden="true" />
            </div>
            <h1 className="brand-title">
              <span className="brand-text">Points</span>
              <span className="brand-accent">Hub</span>
            </h1>
          </div>

          {/* Desktop Navigation - Center */}
          <div className="navbar-nav-desktop" role="menubar">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
                  role="menuitem"
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={`Navigate to ${item.label}: ${item.description}`}
                  title={item.description}
                >
                  <Icon className="nav-icon" aria-hidden="true" />
                  <span className="nav-label">{item.label}</span>
                  {isActive && (
                    <div className="nav-indicator" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Section - Theme Toggle & Mobile Menu */}
          <div className="navbar-actions">
            {/* Theme Toggle */}
            <div className="theme-toggle-wrapper" aria-label="Theme settings">
              <CompactThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="mobile-menu-button"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div 
          id="mobile-navigation"
          className={`mobile-nav ${isMobileMenuOpen ? 'mobile-nav-open' : ''}`}
          role="menu"
          aria-hidden={!isMobileMenuOpen}
        >
          <div className="mobile-nav-content">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`mobile-nav-item ${isActive ? 'mobile-nav-item-active' : ''}`}
                  role="menuitem"
                  aria-current={isActive ? 'page' : undefined}
                  tabIndex={isMobileMenuOpen ? 0 : -1}
                >
                  <div className="mobile-nav-item-content">
                    <Icon className="mobile-nav-icon" aria-hidden="true" />
                    <div className="mobile-nav-text">
                      <span className="mobile-nav-label">{item.label}</span>
                      <span className="mobile-nav-description">{item.description}</span>
                    </div>
                  </div>
                  {isActive && (
                    <div className="mobile-nav-indicator" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="mobile-nav-overlay"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </nav>

      {/* Navbar Spacer - Prevents content from hiding behind fixed navbar */}
      <div className="navbar-spacer" aria-hidden="true" />
    </>
  );
};