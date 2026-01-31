# Tennis Management System - Frontend

Angular 17 frontend for the Tennis Team Management and Match Lineup Application with drag & drop functionality.

## 🚀 Technology Stack

- **Angular**: 17 (standalone components)
- **Angular Material**: UI component library
- **Angular CDK**: Drag & Drop functionality
- **TypeScript**: Strict mode enabled
- **SCSS**: Styling
- **html2canvas**: Image export functionality

## 📋 Prerequisites

- Node.js 18+ or 20+
- npm 9+ or 10+
- Angular CLI 17

## 🛠️ Installation & Setup

### 1. Navigate to frontend directory

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure API endpoint

Update the API URL in `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

### 4. Run development server

```bash
npm start
```

The application will be available at `http://localhost:4200`

### 5. Build for production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 🎨 Features

### Player Management Screen

- **Material Table** displaying all players
- **Sortable columns**: First Name, Last Name, Skill Level, Gender, Matches Played, Won, Lost, Win %
- **Advanced filtering**:
  - Text search for player names
  - Dropdown filter for Skill Level (All, A+, A, B, C, D)
  - Dropdown filter for Gender (All, Male, Female)
- **Color-coded skill badges**:
  - A+: Purple (#9c27b0)
  - A: Blue (#2196f3)
  - B: Green (#4caf50)
  - C: Orange (#ff9800)
  - D: Red (#f44336)
- **Win percentage** calculated and displayed

### Lineup Builder Screen

- **Drag & Drop Interface**: Powered by Angular CDK
- **Fixed Match Structure**:
  ```
  Match 1: A+ Male + A+ Female
  Match 2: A Male + A Female
  Match 3: A Male + B Male
  Match 4: B Male + B Female
  Match 5: B Male + B Female
  Match 6: C Male + C Female
  Match 7: C Male + C Female
  Match 8: D Male + D Female
  Match 9: D Male + D Female
  ```

#### Player Pool

- Players grouped by skill level and gender
- 10 groups displayed in order
- Draggable player cards
- Already-used players are grayed out

#### Match Lineup Grid

- 9 matches with 2 slots each (18 total slots)
- Drop zones with validation
- Visual feedback on drag over
- Remove button for filled slots
- Placeholder text when empty

#### Validation Rules

- ✅ Skill level must match slot requirement
- ✅ Gender must match slot requirement
- ✅ Player cannot be used twice in same lineup
- ✅ All 18 slots must be filled before saving

#### Actions

- **Save Lineup**: Save current lineup with custom name
- **Load Lineup**: Load previously saved lineups
- **Clear Lineup**: Reset all slots
- **Export as PNG**: Download lineup as PNG image
- **Export as JPEG**: Download lineup as JPEG image

## 🎯 Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Redirects to `/players` | Default route |
| `/players` | PlayerListComponent | Player management screen |
| `/lineup-builder` | LineupBuilderComponent | Lineup builder with drag & drop |

## 🎨 Theme & Styling

The application uses a custom Angular Material theme with tennis-inspired colors:

- **Primary Color**: Green (#4caf50) - Tennis court
- **Accent Color**: Yellow (#ffc107) - Tennis ball
- **Warn Color**: Red - Error states

## 🔧 Scripts

```bash
# Development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## 🌐 API Integration

The frontend communicates with the backend REST API at `http://localhost:8080/api`

## 📄 License

MIT
