export interface User {
  id: string;
  name: string;
  totalPoints: number;
  dateAdded: string;
}

export interface PointHistory {
  id: string;
  userId: string;
  userName: string;
  pointsAwarded: number;
  timestamp: string;
  newTotal: number;
}

export interface ClaimResult {
  pointsAwarded: number;
  newTotal: number;
}