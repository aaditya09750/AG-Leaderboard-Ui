import React, { useState } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { ThemeToggle } from './components/ThemeToggle';
import { Navbar } from './components/Navbar';
import { User, PointHistory, ClaimResult } from './types';
import { UserSelector } from './components/UserSelector';
import { AddUserForm } from './components/AddUserForm';
import { ClaimButton } from './components/ClaimButton';
import { Leaderboard } from './components/Leaderboard';
import { PointHistory as PointHistoryComponent } from './components/PointHistory';
import { Gamepad2, Users, History } from 'lucide-react';
import './styles/themes.css';
import './styles/navbar.css';

const initialUsers: User[] = [
  { id: '1', name: 'Aaditya Gunjal', totalPoints: 0, dateAdded: new Date().toISOString() },
  { id: '2', name: 'Yash Hule', totalPoints: 0, dateAdded: new Date().toISOString() },
  { id: '3', name: 'Harsh Jadhav', totalPoints: 0, dateAdded: new Date().toISOString() },
  { id: '4', name: 'Suyash Korgaonkar', totalPoints: 0, dateAdded: new Date().toISOString() },
  { id: '5', name: 'Shubham Dalvi', totalPoints: 0, dateAdded: new Date().toISOString() },
  { id: '6', name: 'Sarvesh Ghadi', totalPoints: 0, dateAdded: new Date().toISOString() },
  { id: '7', name: 'George Wilson', totalPoints: 0, dateAdded: new Date().toISOString() },
  { id: '8', name: 'Hannah Moore', totalPoints: 0, dateAdded: new Date().toISOString() },
  { id: '9', name: 'Ian Thompson', totalPoints: 0, dateAdded: new Date().toISOString() },
  { id: '10', name: 'Julia Garcia', totalPoints: 0, dateAdded: new Date().toISOString() },
];

function App() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [pointHistory, setPointHistory] = useState<PointHistory[]>([]);
  const [activeTab, setActiveTab] = useState<'game' | 'leaderboard' | 'history'>('game');

  const generateRandomPoints = (): number => {
    return Math.floor(Math.random() * 10) + 1;
  };

  const handleAddUser = (name: string): void => {
    const newUser: User = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name,
      totalPoints: 0,
      dateAdded: new Date().toISOString(),
    };
    setUsers(prev => [...prev, newUser]);
  };

  const handleDeleteUser = (userId: string): void => {
    setUsers(prev => prev.filter(user => user.id !== userId));
    if (selectedUserId === userId) {
      setSelectedUserId(null);
    }
  };

  const handleClaimPoints = (userId: string): ClaimResult => {
    const pointsAwarded = generateRandomPoints();
    const user = users.find(u => u.id === userId);
    if (!user) {
      throw new Error('User not found');
    }

    const newTotal = user.totalPoints + pointsAwarded;

    setUsers(prev =>
      prev.map(u =>
        u.id === userId ? { ...u, totalPoints: newTotal } : u
      )
    );

    const historyEntry: PointHistory = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      userId,
      userName: user.name,
      pointsAwarded,
      timestamp: new Date().toISOString(),
      newTotal,
    };

    setPointHistory(prev => [historyEntry, ...prev]);

    return { pointsAwarded, newTotal };
  };

  const existingUserNames = users.map(user => user.name);

  const tabs = [
    { id: 'game', label: 'Game', icon: Gamepad2 },
    { id: 'leaderboard', label: 'Leaderboard', icon: Users },
    { id: 'history', label: 'History', icon: History },
  ] as const;

  return (
    <ThemeProvider>
      <div className="glassmorphism-app">
        <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="glassmorphism-background">
          <div className="gradient-orb gradient-orb-1"></div>
          <div className="gradient-orb gradient-orb-2"></div>
          <div className="gradient-orb gradient-orb-3"></div>
          <div className="gradient-orb gradient-orb-4"></div>
        </div>

        <div className="glass-particles">
          <div className="glass-particle glass-particle-1"></div>
          <div className="glass-particle glass-particle-2"></div>
          <div className="glass-particle glass-particle-3"></div>
          <div className="glass-particle glass-particle-4"></div>
          <div className="glass-particle glass-particle-5"></div>
          <div className="glass-particle glass-particle-6"></div>
        </div>

        <div className="glassmorphism-content">
          <div className="text-center mb-8">
            <div className="glassmorphism-card glassmorphism-card-header">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 glassmorphism-title">
                AG Leaderboard UI
              </h1>
              <p className="text-xl max-w-2xl mx-auto glassmorphism-subtitle">
                One click can change the leaderboard. Who's climbing next?
              </p>
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            {activeTab === 'game' && (
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="glassmorphism-card">
                    <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2 glassmorphism-heading">
                      <Gamepad2 className="h-6 w-6" />
                      <span>Game Controls</span>
                    </h2>

                    <div className="space-y-6">
                      <UserSelector
                        users={users}
                        selectedUserId={selectedUserId}
                        onSelectUser={setSelectedUserId}
                      />
                      <ClaimButton
                        selectedUserId={selectedUserId}
                        onClaim={handleClaimPoints}
                      />
                    </div>
                  </div>

                  <div className="glassmorphism-card">
                    <h2 className="text-2xl font-bold mb-6 glassmorphism-heading">Add New User</h2>
                    <AddUserForm
                      existingUsers={existingUserNames}
                      onAddUser={handleAddUser}
                    />
                  </div>

                  <div className="glassmorphism-card">
                    <h2 className="text-2xl font-bold mb-6 glassmorphism-heading">Theme Settings</h2>
                    <ThemeToggle />
                  </div>
                </div>

                <div className="glassmorphism-card">
                  <Leaderboard users={users} onDeleteUser={handleDeleteUser} />
                </div>
              </div>
            )}

            {activeTab === 'leaderboard' && (
              <div className="glassmorphism-card">
                <Leaderboard users={users} onDeleteUser={handleDeleteUser} />
              </div>
            )}

            {activeTab === 'history' && (
              <div className="glassmorphism-card">
                <PointHistoryComponent history={pointHistory} />
              </div>
            )}
          </div>

          {/* Stats Footer */}
          <div className="mt-12 text-center">
            <div className="glassmorphism-card glassmorphism-stats">
              <div className="text-center">
                <div className="text-2xl font-bold glassmorphism-stat-number">
                  {users.length}
                </div>
                <div className="text-sm glassmorphism-stat-label">Total Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold glassmorphism-stat-number">
                  {pointHistory.length}
                </div>
                <div className="text-sm glassmorphism-stat-label">Point Claims</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold glassmorphism-stat-number">
                  {pointHistory.reduce((sum, entry) => sum + entry.pointsAwarded, 0)}
                </div>
                <div className="text-sm glassmorphism-stat-label">Total Points Awarded</div>
              </div>
            </div>
          </div>
        </div> {/* ✅ This line was missing */}
      </div>
    </ThemeProvider>
  );
}

export default App;
