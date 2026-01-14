# Todo Backend - Spring Boot

A RESTful API backend for the Todo application built with Spring Boot.

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher

## Running the Application

1. Navigate to the project directory
2. Run the following command:

```bash
mvn spring-boot:run
```

The server will start on `http://localhost:8080`

## API Endpoints

### Get all todos
```
GET /api/todos
```

### Get todos by status
```
GET /api/todos?completed=true
GET /api/todos?completed=false
```

### Get a single todo
```
GET /api/todos/{id}
```

### Create a new todo
```
POST /api/todos
Content-Type: application/json

{
  "text": "Buy groceries",
  "completed": false
}
```

### Update a todo
```
PUT /api/todos/{id}
Content-Type: application/json

{
  "text": "Buy groceries",
  "completed": true
}
```

### Delete a todo
```
DELETE /api/todos/{id}
```

### Delete all todos
```
DELETE /api/todos
```

## Database

The application uses H2 in-memory database for development. You can access the H2 console at:
```
http://localhost:8080/h2-console
```

Connection details:
- JDBC URL: `jdbc:h2:mem:tododb`
- Username: `sa`
- Password: (leave empty)

## CORS Configuration

The API is configured to accept requests from:
- http://localhost:3000 (Next.js default)
- http://localhost:5173 (Vite default)

Update `WebConfig.java` to add more origins if needed.
