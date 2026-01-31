# Tennis Management System - Backend

Spring Boot backend for the Tennis Team Management and Match Lineup Application.

## 🚀 Technology Stack

- **Java**: 17
- **Spring Boot**: 3.2.1
- **Database**: H2 (development), PostgreSQL (production)
- **Build Tool**: Maven
- **ORM**: JPA/Hibernate

## 📋 Prerequisites

- Java JDK 17 or higher
- Maven 3.6 or higher
- PostgreSQL 14+ (for production)

## 🛠️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/utkuunalCS/tennisManagementSystem.git
cd tennisManagementSystem/backend
```

### 2. Build the project

```bash
mvn clean install
```

### 3. Run the application

**Development Mode (H2 Database):**
```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

**Production Mode (PostgreSQL):**

Update `application.properties` to uncomment PostgreSQL configuration and set environment variables:

```bash
export DB_URL=jdbc:postgresql://localhost:5432/tennisdb
export DB_USERNAME=your_username
export DB_PASSWORD=your_password
mvn spring-boot:run
```

### 4. Access H2 Console (Development Only)

- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:tennisdb`
- Username: `sa`
- Password: (leave empty)

## 📡 API Endpoints

### Player Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/players` | Get all players (supports filtering by skillLevel and gender) |
| GET | `/api/players/{id}` | Get player by ID |
| POST | `/api/players` | Create new player |
| PUT | `/api/players/{id}` | Update player |
| DELETE | `/api/players/{id}` | Delete player |
| GET | `/api/players/statistics` | Get all players with win percentage |

#### Query Parameters for GET /api/players
- `skillLevel` (optional): Filter by skill level (A_PLUS, A, B, C, D)
- `gender` (optional): Filter by gender (MALE, FEMALE)

#### Example Request Body (POST/PUT Player)
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "skillLevel": "A_PLUS",
  "gender": "MALE",
  "matchesPlayed": 10,
  "matchesWon": 7,
  "matchesLost": 3
}
```

### Lineup Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/lineups` | Get all lineups |
| GET | `/api/lineups/{id}` | Get lineup by ID with all players |
| POST | `/api/lineups` | Create/save new lineup |
| PUT | `/api/lineups/{id}` | Update existing lineup |
| DELETE | `/api/lineups/{id}` | Delete lineup |

#### Example Request Body (POST/PUT Lineup)
```json
{
  "name": "Saturday Tournament",
  "lineupPlayers": [
    {
      "playerId": 1,
      "matchNumber": 1,
      "position": 1
    },
    {
      "playerId": 2,
      "matchNumber": 1,
      "position": 2
    }
  ]
}
```

## 🗄️ Database Schema

### Players Table
- `id`: Long (Primary Key)
- `first_name`: String
- `last_name`: String
- `skill_level`: Enum (A_PLUS, A, B, C, D)
- `gender`: Enum (MALE, FEMALE)
- `matches_played`: Integer
- `matches_won`: Integer
- `matches_lost`: Integer
- `created_at`: Timestamp
- `updated_at`: Timestamp

### Lineups Table
- `id`: Long (Primary Key)
- `name`: String
- `created_at`: Timestamp
- `updated_at`: Timestamp

### Lineup_Players Table (Join Table)
- `id`: Long (Primary Key)
- `lineup_id`: Foreign Key → Lineups
- `player_id`: Foreign Key → Players
- `match_number`: Integer (1-9)
- `position`: Integer (1-2)
- `created_at`: Timestamp

## 🌱 Sample Data

The application comes with pre-loaded sample data:
- 44 players distributed across all skill levels and genders
- Realistic match statistics
- Ready for testing lineup builder functionality

## 🧪 Running Tests

```bash
mvn test
```

## 📦 Building for Production

```bash
mvn clean package
```

The executable JAR will be in `target/tennis-management-1.0.0.jar`

Run it with:
```bash
java -jar target/tennis-management-1.0.0.jar
```

## 🔧 Configuration

### Environment Variables

For production deployment, set these environment variables:

- `DB_URL`: PostgreSQL connection URL
- `DB_USERNAME`: Database username
- `DB_PASSWORD`: Database password

### Application Properties

Key configurations in `application.properties`:
- Server port: `server.port=8080`
- Database configuration
- JPA/Hibernate settings
- Logging levels

## 📝 Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/tennis/management/
│   │   │   ├── TennisManagementApplication.java
│   │   │   ├── config/
│   │   │   │   └── WebConfig.java
│   │   │   ├── entity/
│   │   │   │   ├── Player.java
│   │   │   │   ├── Lineup.java
│   │   │   │   ├── LineupPlayer.java
│   │   │   │   └── enums/
│   │   │   │       ├── SkillLevel.java
│   │   │   │       └── Gender.java
│   │   │   ├── repository/
│   │   │   │   ├── PlayerRepository.java
│   │   │   │   ├── LineupRepository.java
│   │   │   │   └── LineupPlayerRepository.java
│   │   │   ├── service/
│   │   │   │   ├── PlayerService.java
│   │   │   │   └── LineupService.java
│   │   │   ├── controller/
│   │   │   │   ├── PlayerController.java
│   │   │   │   └── LineupController.java
│   │   │   └── dto/
│   │   │       ├── PlayerDTO.java
│   │   │       ├── LineupDTO.java
│   │   │       └── LineupPlayerDTO.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── data.sql
│   └── test/
└── pom.xml
```

## 🐛 Troubleshooting

### Common Issues

1. **Port 8080 already in use**
   - Change the port in `application.properties`: `server.port=8081`

2. **Database connection failed**
   - Verify PostgreSQL is running
   - Check database credentials
   - Ensure database exists

3. **Build failures**
   - Verify Java 17+ is installed: `java -version`
   - Clean Maven cache: `mvn clean`

## 📄 License

MIT
