# AG-Leaderboard-UI

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-Deployed-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

## Project Overview

AG-Leaderboard-UI is a modern web application designed to showcase agent performance metrics and competitive standings within the Agent-User Interaction Protocol (AG-UI) framework. This application offers real-time tracking, detailed analytics, and an intuitive interface for monitoring agent performance.

## Live Demo

[View Live Application](https://ag-leaderboard-ui.netlify.app/)

## Features

### Real-time Performance Tracking

- Dynamic ranking system with instant updates
- Continuous monitoring of success rates, response times, and interaction counts
- Auto-refresh every 30 seconds

### Comprehensive Analytics

- Visual metrics for performance trends
- Historical data for analysis
- Comparative insights and side-by-side comparisons
- Support for custom KPIs

### Modern User Experience

- Responsive design across all devices
- Interactive interface with smooth transitions
- Light and dark theme modes
- WCAG 2.1 AA compliant accessibility features

### Advanced Filtering and Search

- Filter agents by category, metrics, or custom criteria
- Real-time search with suggestions
- Sorting by multiple criteria
- Export functionality (CSV, JSON)

### Data Visualization

- Interactive charts using Recharts
- Customizable dashboards
- Heatmaps and statistical insights

## Technology Stack

| Category        | Technology     | Version | Purpose                      |
|----------------|----------------|---------|------------------------------|
| Frontend       | React          | 18.x    | Component-based UI library   |
| Language       | TypeScript     | 5.x     | Type-safe development        |
| Styling        | Tailwind CSS   | 3.x     | Utility-first styling        |
| Charts         | Recharts       | 2.x     | Data visualization           |
| Icons          | Lucide React   | Latest  | Icon components              |
| Build Tool     | Vite           | 5.x     | Fast dev and build tool      |
| Testing        | Vitest         | Latest  | Unit testing                 |
| Linting        | ESLint         | Latest  | Code quality and formatting  |

## Prerequisites

- Node.js v16.x or above
- npm v7.x or above
- Git

**Recommended System Requirements:**

- OS: Windows 10+, macOS 10.15+, or Linux
- RAM: 4GB minimum (8GB recommended)
- Storage: At least 500MB free space

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/aaditya09750/AG-Leaderboard-Ui.git
cd AG-Leaderboard-Ui
```

### Install Dependencies

```bash
npm install
```

### Environment Setup

Create a `.env.local` file in the root directory:

```env
VITE_API_URL=https://api.example.com
VITE_AG_UI_ENDPOINT=wss://ag-ui.example.com
VITE_REFRESH_INTERVAL=30000
```

### Run the Development Server

```bash
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

## Project Structure

```
AG-Leaderboard-UI/
├── public/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── types/
│   ├── screens/
│   ├── styles/
│   ├── App.tsx
│   └── main.tsx
├── tests/
├── docs/
├── .env.example
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Available Scripts

| Command               | Description                       |
|-----------------------|-----------------------------------|
| `npm run dev`         | Start development server          |
| `npm run build`       | Build for production              |
| `npm run preview`     | Preview production build          |
| `npm run test`        | Run unit tests                    |
| `npm run test:watch`  | Watch mode for tests              |
| `npm run lint`        | Run ESLint                        |
| `npm run lint:fix`    | Auto-fix linting issues           |
| `npm run type-check`  | Check TypeScript types            |

## API Documentation

### `AgentMetrics` Interface

```ts
interface AgentMetrics {
  id: string;
  name: string;
  rank: number;
  score: number;
  successRate: number;
  responseTime: number;
  interactionCount: number;
  lastActive: Date;
  category: string;
  performance: {
    daily: number[];
    weekly: number[];
    monthly: number[];
  };
}
```

### `LeaderboardEntry` Interface

```ts
interface LeaderboardEntry {
  agent: AgentMetrics;
  position: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  percentile: number;
}
```

## Usage Examples

### Basic Leaderboard

```tsx
import { useLeaderboardData } from './hooks/useLeaderboardData';
import { LeaderboardTable } from './components/LeaderboardTable';

function App() {
  const { agents, loading, error } = useLeaderboardData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <LeaderboardTable agents={agents} />;
}
```

### Filtering Agents

```tsx
const { agents, filterAgents } = useLeaderboardData();

const filteredAgents = filterAgents({
  category: 'chatbot',
  minSuccessRate: 0.8,
  maxResponseTime: 500
});
```

## Configuration

### `.env` Variables

```env
VITE_API_URL=https://api.example.com
VITE_AG_UI_ENDPOINT=wss://ag-ui.example.com
VITE_REFRESH_INTERVAL=30000
VITE_MAX_AGENTS=100
VITE_THEME=light
VITE_ENABLE_REAL_TIME=true
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_EXPORT=true
```

### Tailwind Config

```js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981',
        accent: '#F59E0B',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
    },
  },
  plugins: [],
};
```

## Testing

```bash
npm run test
npm run test:coverage
npm run test AgentCard.test.tsx
npm run test:watch
```

### Test Structure

```
tests/
├── components/
├── hooks/
├── lib/
└── __mocks__/
```

## Deployment

### Netlify

1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Configure environment variables

## Contributing

### How to Contribute

1. Fork the repo
2. Create a branch: `git checkout -b feature/my-feature`
3. Make changes
4. Run tests
5. Commit: `git commit -m 'Add feature'`
6. Push: `git push origin feature/my-feature`
7. Create a pull request

### Guidelines

- Use clear naming conventions
- Include type annotations and comments
- Write tests for new features
- Ensure code style and lint checks pass

## License Information

No license specified. All rights reserved by the author.

## Contact/Support Information

For questions or support, please contact :- aadigunjal0975@gmail.com or open an issue on the GitHub repository.
