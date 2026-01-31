# Tennis Management System

A comprehensive Tennis Team Management and Match Lineup application built with Angular 17 and Spring Boot.

## 🎾 Features

- **Player Management**: Track players with skill levels (A+, A, B, C, D) and match statistics
- **Drag & Drop Lineup Builder**: Create match lineups with intuitive drag & drop interface
- **Fixed Match Structure**: Predefined 9-match format for tennis tournaments
- **Export Lineups**: Download lineups as PNG or JPEG images
- **Match Statistics**: Track wins, losses, and win percentages
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🚀 Technology Stack

### Frontend
- Angular 17 (Standalone Components)
- Angular Material & CDK
- TypeScript
- SCSS
- html2canvas

### Backend
- Spring Boot 3.2.1
- Java 17
- Spring Data JPA
- H2 Database (Development)
- PostgreSQL (Production)
- REST API

## 📋 Prerequisites

### Backend
- Java JDK 17+
- Maven 3.6+
- PostgreSQL 14+ (for production)

### Frontend
- Node.js 18+ or 20+
- npm 9+ or 10+
- Angular CLI 17

## 🛠️ Quick Start

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Build the project:
```bash
mvn clean install
```

3. Run the application:
```bash
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

**Access H2 Console** (Development):
- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:tennisdb`
- Username: `sa`
- Password: (leave empty)

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

The frontend will be available at `http://localhost:4200`

## 📡 API Endpoints

### Player Management
- `GET /api/players` - Get all players (supports filtering)
- `GET /api/players/{id}` - Get player by ID
- `POST /api/players` - Create new player
- `PUT /api/players/{id}` - Update player
- `DELETE /api/players/{id}` - Delete player
- `GET /api/players/statistics` - Get players with win percentages

### Lineup Management
- `GET /api/lineups` - Get all lineups
- `GET /api/lineups/{id}` - Get lineup by ID
- `POST /api/lineups` - Create new lineup
- `PUT /api/lineups/{id}` - Update lineup
- `DELETE /api/lineups/{id}` - Delete lineup

## 🎯 Fixed Match Structure

The application enforces a specific 9-match structure:

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

## 🗄️ Database Schema

### Players
- ID, First Name, Last Name
- Skill Level (A+, A, B, C, D)
- Gender (Male, Female)
- Matches Played, Won, Lost
- Timestamps

### Lineups
- ID, Name
- Timestamps

### Lineup Players (Join Table)
- ID, Lineup ID, Player ID
- Match Number (1-9)
- Position (1-2)
- Timestamp

## 🌱 Sample Data

The application comes pre-loaded with 44 sample players:
- 4 A+ Male, 4 A+ Female
- 5 A Male, 5 A Female
- 5 B Male, 5 B Female
- 4 C Male, 4 C Female
- 4 D Male, 4 D Female

All with realistic match statistics for testing.

## 📁 Project Structure

```
tennisManagementSystem/
├── backend/                 # Spring Boot backend
│   ├── src/main/java/
│   │   └── com/tennis/management/
│   │       ├── entity/     # JPA entities
│   │       ├── repository/ # Data repositories
│   │       ├── service/    # Business logic
│   │       ├── controller/ # REST controllers
│   │       └── dto/        # Data transfer objects
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── data.sql       # Sample data
│   └── pom.xml
│
├── frontend/               # Angular 17 frontend
│   ├── src/app/
│   │   ├── core/          # Models, services, enums
│   │   ├── features/
│   │   │   ├── player-management/
│   │   │   └── lineup-builder/
│   │   ├── app.routes.ts
│   │   └── app.config.ts
│   └── package.json
│
└── README.md
```

## 🎨 Features in Detail

### Player Management Screen
- Material table with sorting on all columns
- Filter by skill level and gender
- Text search for player names
- Color-coded skill level badges
- Win percentage calculations
- Responsive design

### Lineup Builder
- **Drag & Drop**: Intuitive player selection
- **Player Pool**: Grouped by skill and gender
- **Validation**: Ensures correct player placement
- **Visual Feedback**: Highlights valid/invalid drops
- **Actions**:
  - Save lineup with custom name
  - Load previously saved lineups
  - Clear all slots
  - Export as PNG/JPEG

## 🔧 Configuration

### Backend (Production)

Update `application.properties` for PostgreSQL:

```properties
spring.datasource.url=${DB_URL:jdbc:postgresql://localhost:5432/tennisdb}
spring.datasource.username=${DB_USERNAME:postgres}
spring.datasource.password=${DB_PASSWORD:postgres}
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
```

### Frontend (Production)

Update `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-api-domain.com/api'
};
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
mvn test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📦 Building for Production

### Backend
```bash
cd backend
mvn clean package
java -jar target/tennis-management-1.0.0.jar
```

### Frontend
```bash
cd frontend
npm run build
# Serve from dist/frontend
```

## 🐛 Troubleshooting

### Backend Issues
- **Port 8080 in use**: Change in `application.properties`
- **Database errors**: Check PostgreSQL is running
- **Build failures**: Verify Java 17+ with `java -version`

### Frontend Issues
- **Port 4200 in use**: Use `ng serve --port 4201`
- **CORS errors**: Ensure backend CORS is configured
- **Module errors**: Run `npm install`

## 📝 Documentation

- [Backend README](./backend/README.md) - Detailed backend documentation
- [Frontend README](./frontend/README.md) - Detailed frontend documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT

## 👥 Authors

- utkuunalCS

## 🙏 Acknowledgments

- Angular Material for UI components
- Spring Boot for backend framework
- html2canvas for image export functionality