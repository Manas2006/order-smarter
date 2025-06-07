# Order Smarter

A full-stack application that helps users estimate calories in their Uber Eats orders by analyzing cart items and predicting calorie content.

## Project Structure

```
order-smarter/
├── backend/           # Spring Boot orchestrator
│   ├── src/          # Java source code
│   └── pom.xml       # Maven configuration
│
└── frontend/         # React frontend
    ├── src/          # TypeScript source code
    └── package.json  # NPM configuration
```

## Prerequisites

- Java 17+ and Maven
- Node.js 16+ and npm
- Python microservices running locally:
  - `uber-eats-cart-scraper` on port 8000
  - `calorie-nlp-model` on port 8001

## Getting Started

1. Start the Python microservices:
   ```bash
   # Terminal 1
   cd uber-eats-cart-scraper
   uvicorn app:app --port 8000

   # Terminal 2
   cd calorie-nlp-model
   uvicorn app:app --port 8001
   ```

2. Start the Spring Boot backend:
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```

3. Start the React frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8080

## Features

- Modern, responsive UI built with React and Material-UI
- Real-time calorie estimation
- Clean API design with Spring Boot
- Type-safe development with TypeScript
- Reactive programming with Spring WebFlux

## Development

- Backend: See `backend/README.md`
- Frontend: See `frontend/README.md` 