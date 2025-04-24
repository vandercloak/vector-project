# Patient Portal

A full-stack application for viewing patient medical reports with visual alerts for critical conditions.

## Demo

View the live demo: [https://vector-project.vercel.app/](https://vector-project.vercel.app/)

## Project Structure

- **Frontend**: Vue 3 + Vite + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **Database**: MySQL
- **Containerization**: Docker + docker-compose
- **Cloud**: Heroku SQL/API + Vercel for frontend

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

Switch the local .env to use DB_HOST=localhost to use the local mysql instance when running the backend outside of docker.

## Features

- View patient medical reports with filtering capability
- Visual alerts for critical conditions (tachycardia, arrhythmia)
- Responsive design using Tailwind CSS
- Backend API with caching for improved performance

## Testing

The project includes both frontend and backend tests.

### Backend Testing with Jest

Run the backend tests:

```bash
cd backend
npm test
```

### Frontend Testing

#### Unit Testing with Vitest

Run the unit tests:

```

```
