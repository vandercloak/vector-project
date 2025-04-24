# Patient Portal

A full-stack application for viewing patient medical reports with visual alerts for critical conditions.

## Project Structure

- **Frontend**: Vue 3 + Vite + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **Database**: MySQL
- **Containerization**: Docker + docker-compose

## Requirements Checklist

### 🏆 Project Requirements Completed

#### Backend

- ✅ Implemented endpoint that returns a list of patient reports
- ✅ Reports include id, patientName, date, and summary fields
- ✅ API supports filtering by patientName
- ✅ MySQL database implementation for reports data

#### Frontend

- ✅ Created web page that fetches reports via API
- ✅ Implemented filtering reports by patientName
- ✅ Added visual alerts for "tachycardia" and "arrhythmia" keywords
- ✅ Responsive design with Tailwind CSS

#### Bonus

- ✅ Used TypeScript throughout the application
- ✅ Added comprehensive unit and E2E tests
- ✅ Implemented API response caching
- ✅ Dockerized the solution with docker-compose

#### Other Requirements

- ✅ Clear instructions for running the project
- ✅ No authentication required as specified
- ✅ Clean, readable code following modern best practices
- ✅ Efficient queries with proper indexing

## Setup Instructions

### Prerequisites

- Docker and docker-compose installed on your system
- Node.js 16+ (for local development)

### Running with Docker

1. Clone this repository
2. Run the application:

```bash
docker-compose up
```

3. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

### Local Development

#### Backend

```bash
cd backend
npm install
npm run dev
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

#### Database (in docker)

```bash
docker-compose up -d mysql
```

#### Env

Switch the local .env to use DB_HOST=localhost to use the local mysql instance.

## Features

- View patient medical reports with filtering capability
- Visual alerts for critical conditions (tachycardia, arrhythmia)
- Responsive design using Tailwind CSS
- Backend API with caching for improved performance

## Testing

The project includes both unit tests (Vitest) and end-to-end tests (Playwright).

### Unit Testing with Vitest

Run the unit tests:

```bash
cd frontend
npm run test:unit
```

To run tests in watch mode:

```bash
npm run test:unit -- --watch
```

### End-to-End Testing with Playwright

Before running E2E tests for the first time, install the required browsers:

```bash
cd frontend
npx playwright install
```

Then run the E2E tests:

```bash
npm run test:e2e
```

Additional Playwright options:

```bash
# Run tests only on Chromium
npm run test:e2e -- --project=chromium

# Run specific test file
npm run test:e2e -- tests/example.spec.ts

# Run tests in debug mode
npm run test:e2e -- --debug
```

### Example Component Tests

Unit test examples for components can be found in the `frontend/src/components/__tests__/` directory.

E2E test examples for components can be found in the `frontend/tests/` directory.

## API Endpoints

- `GET /api/reports` - List all reports with optional filtering
- `GET /api/reports/:id` - Get a specific report

## Database Schema

The application uses a MySQL database with the following schema:

```sql
CREATE TABLE reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patientName VARCHAR(255) NOT NULL,
  date DATETIME NOT NULL,
  summary TEXT NOT NULL,
  hasTachycardia BOOLEAN GENERATED ALWAYS AS (summary LIKE '%tachycardia%') STORED,
  hasArrhythmia BOOLEAN GENERATED ALWAYS AS (summary LIKE '%arrhythmia%') STORED,
  INDEX idx_patientName (patientName),
  INDEX idx_tachycardia (hasTachycardia),
  INDEX idx_arrhythmia (hasArrhythmia)
);
```

## Improvements / Future Work

- Add pagination to the reports list
- Add an ORM
- Add debounce to the report filter
- It felt like the requirements desired filtering via backend sql queries on patient name so I implemented it that way. Since we are getting all the data at once, it would be more effient to filter on the client since we already have the data in the frontend. This would not work if there were plans for pagination.
