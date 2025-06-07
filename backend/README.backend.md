# Uber Calorie Estimator — Spring Boot Orchestrator

This Spring Boot application serves as the orchestrator backend for the Uber Calorie Estimator. It coordinates between two Python microservices to provide calorie estimates for Uber Eats cart items.

## Prerequisites

- Java 17 or higher
- Maven
- Python microservices running locally:
  - `uber-eats-cart-scraper` on port 8000
  - `calorie-nlp-model` on port 8001

## Getting Started

1. Ensure both Python microservices are running:
   ```bash
   # Terminal 1
   cd uber-eats-cart-scraper
   uvicorn app:app --port 8000

   # Terminal 2
   cd calorie-nlp-model
   uvicorn app:app --port 8001
   ```

2. Build and run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```

The application will start on port 8080.

## API Endpoints

### POST /api/analyze-cart

Analyzes an Uber Eats cart and returns calorie estimates for each item.

**Request:**
```json
{
  "url": "https://eats.uber.com/group-orders/<your-id>/join"
}
```

**Response:**
```json
{
  "items": [
    {
      "name": "Lamb Over Rice",
      "quantity": 1,
      "price": 15.36,
      "person": "Manas",
      "caloriesPer100g": 305.94
    }
  ],
  "totalCalories": 305.94
}
```

## Architecture

The application uses Spring WebFlux for reactive programming and communicates with the Python microservices using WebClient. The flow is:

1. Frontend sends cart URL to `/api/analyze-cart`
2. Orchestrator calls scraper service to get cart items
3. Orchestrator sends items to calorie prediction service
4. Results are combined and returned to frontend

## Configuration

Service URLs can be configured in `src/main/resources/application.properties`:

```properties
scraper.service.url=http://localhost:8000
calorie.service.url=http://localhost:8001
``` 