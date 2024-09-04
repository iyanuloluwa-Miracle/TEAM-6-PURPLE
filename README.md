# Team-6-Purple API Documentation

This is a Node.js API for managing travel itineraries, hotel bookings, and local attractions.

## Features

- **Itinerary Planning**: Create, update, and delete travel itineraries.
- **Hotel Booking**: Integrates with external hotel booking services.
- **Local Attractions**: Provides information on nearby attractions and events.
- **Travel Advisory Updates**:  Offer real-time updates on travel advisories and safety information.

## Technologies Used

- Node.js
- Express
- Sequelize(ORM) 
- PostgreSQL(Database)
- JWT for Authentication

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/TEAM-6-PURPLE.git
   cd TEAM-6-PURPLE
```


2. Navigate to the project directory:

   ```bash
   cd TEAM-6-PURPLE.git 
   ```
3. Install the project dependencies:

   ```bash
   npm install
   ```

### Running the API

1. Start the PostgreSQL server if not already running.

2. Start the API by running:

   ```bash
   node app.js
   ```

   The API will be available at `http://localhost:5000`.

## API Endpoints

### User Registration

- **URL:** `/api/v1/user/registers`
- **Method:** `POST`
- **Request Body:**

  ```json

  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doeexample.com",
  "password": "StrongPassword123!"

  ```

- **Response:**

  ```json
  {
    "message": "User created",
    "user": {
        "id": 37,
        "email": "john.doeexample@gmail.com",
        "password": "$2b$10$BO5urj6CMaszCqtlXvRWdOt5YAdYYDljnqPeZAuxCfajBIIeWiPu2",
        "firstName": "Johnny",
        "lastName": "Doui",
        "updatedAt": "2024-09-03T14:51:57.622Z",
        "createdAt": "2024-09-03T14:51:57.622Z"
    }
   }
  ```

### User Login

- **URL:** `/api/v1/users/login`
- **Method:** `POST`
- **Request Body:**

  ```json
  {
    "email": "john.doe@example.com",
    "password": "john.doe@example.com"
  }
  ```

  **Response:**

  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcyNTM2OTUxMSwiZXhwIjoxNzI1Mzc2NzExfQ.cmSLnJiUNWi9r9-RUy6bafB6SFUu6K7m528IBSqgq9o",
    "user": {
        "id": 1,
        "email": "john.doe@example.com",
        "password": "$2b$10$xDXh7BAAg80HXSCZ.SGeG.267/QVdxVqqMh1lmoxcFfOFrjo6US7.",
        "firstName": "John",
        "lastName": "Doe",
        "createdAt": "2024-08-30T13:19:31.820Z",
        "updatedAt": "2024-08-30T13:19:31.820Z"
    }
   }
  ```

### User Logout

- **URL:** `/api/v1/users/logout`
- **Method:** `POST`
- **Header:** `Authorization: Bearer <token>`

  ```json
  {
    "message": "Logged out successfully"
  }
  ```



### Itinerary Planning Endpoints


### CREATE ITINERARY PLAN

- **URL:** `/api/v1/itineraries`
- **Method:** `POST`
- **Request Body:**
- **Header:** `Authorization: Bearer <token>`

  ```json
  {
    "title": "Vacation in Nigeria",
    "destination": "Lagos,Nigeria ",
    "startDate": "2024-09-10",
    "endDate": "2024-09-20"
   }
  ```

- **Response:**

  ```json
  {
    "id": 16,
    "title": "Vacation in SouthAfrica",
    "destination": "jOHNNA,SouthAfrica ",
    "startDate": "2024-09-10T00:00:00.000Z",
    "endDate": "2024-09-20T00:00:00.000Z",
    "userId": 1,
    "updatedAt": "2024-09-03T15:32:21.558Z",
    "createdAt": "2024-09-03T15:32:21.558Z"
   }
  ```

### List Posts

- **URL:** `/api/v1/post/list`
- **Method:** `GET`
- **Header:** `Authorization: Bearer <token>`
  **Response:**
