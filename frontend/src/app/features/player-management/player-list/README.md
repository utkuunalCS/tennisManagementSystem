# Player List Component

Angular 17 standalone component for displaying and filtering the list of tennis players.

## Features

### Display
- Material Design table with sortable columns
- Responsive layout for mobile, tablet, and desktop
- Color-coded skill level badges
- Gender icons
- Win/loss statistics with percentage calculation

### Filtering
1. **Text Search**: Search players by first name or last name
2. **Skill Level Filter**: Filter by A+, A, B, C, D, or All
3. **Gender Filter**: Filter by Male, Female, or All

### Columns
- First Name (sortable)
- Last Name (sortable)
- Skill Level (sortable, color-coded badge)
- Gender (sortable, with icon)
- Matches Played (sortable)
- Matches Won (sortable, green text)
- Matches Lost (sortable, red text)
- Win Percentage (sortable, calculated)

### Skill Level Color Coding
- **A+**: Purple (#9c27b0)
- **A**: Blue (#2196f3)
- **B**: Green (#4caf50)
- **C**: Orange (#ff9800)
- **D**: Red (#f44336)

## Usage

### Import in Routes
```typescript
import { PlayerListComponent } from './features/player-management/player-list/player-list.component';

export const routes: Routes = [
  {
    path: 'players',
    component: PlayerListComponent
  }
];
```

### Standalone Component
```typescript
import { PlayerListComponent } from './features/player-management/player-list/player-list.component';

@Component({
  // ...
  imports: [PlayerListComponent]
})
```

### In Template
```html
<app-player-list></app-player-list>
```

## Dependencies

### Angular Material Modules
- MatTableModule
- MatSortModule
- MatFormFieldModule
- MatSelectModule
- MatInputModule
- MatButtonModule
- MatIconModule
- MatChipModule
- MatCardModule

### Services
- PlayerService from `core/services/player.service`

### Models & Enums
- Player model from `core/models/player.model`
- SkillLevel enum from `core/enums/skill-level.enum`
- Gender enum from `core/enums/gender.enum`

## Responsive Breakpoints
- **Desktop**: > 1024px - Full layout
- **Tablet**: 768px - 1024px - Condensed padding
- **Mobile**: < 768px - Stacked filters, smaller fonts
- **Small Mobile**: < 480px - Minimal spacing

## API Integration
The component fetches player data using `PlayerService.getPlayersWithStatistics()` which returns players with match statistics.

## Testing
Run tests with:
```bash
npm test
```

The component includes comprehensive unit tests covering:
- Component creation
- Player loading
- Win percentage calculation
- Filtering by skill level, gender, and search text
- UI element rendering
