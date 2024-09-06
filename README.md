# Team-6-Purple API Documentation
This is a Node.js API for managing travel itineraries, hotel bookings, and local attractions.



### POSTMAN DOCUMENTION LINK: https://documenter.getpostman.com/view/32444128/2sAXjRUoWv
### TESTER POSTMAN DOCUMENTATION LINK: https://documenter.getpostman.com/view/32444128/2sAXjRV8zs 
### YOUTUBE LINK: https://www.youtube.com/watch?v=J_mBb-KL6mY

## Features

#### This repository includes functional and performance testing using Newman, Postman, and k6. Tests are configured to run automatically after every pull request (PR).

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

### Setup

  Place your .env file in the root directory of the project. The .env file should contain the following variables:

  #### PORT= 5000
  #### NODE_ENV=production
  #### JWT_SECRET=Team-purple-6
  #### DATABASE_URL="postgres://*********** */"
  #### API_KEY=""
  #### API_HOST=tripadvisor16.p.rapidapi.com 
  #### API_HOST_BOOKINGS=booking-com15.p.rapidapi.com
  #### BOOKINGDOTCOM=https://booking-com15.p.rapidapi.com/api/v1
  #### TRIPADVISOR=https://tripadvisor16.p.rapidapi.com/api/v1 


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
    "title": "Vacation in Nigeria",
    "destination": "Lagos,Nigeria ",
    "startDate": "2024-09-10T00:00:00.000Z",
    "endDate": "2024-09-20T00:00:00.000Z",
    "userId": 1,
    "updatedAt": "2024-09-03T15:32:21.558Z",
    "createdAt": "2024-09-03T15:32:21.558Z"
   }
  ```

### FETCH A USER ITINERARIES

- **URL:** `/api/v1/itineraries/`
- **Method:** `GET`
- **Header:** `Authorization: Bearer <token>`
- **Response:**

  ```json
  {
    "id": 16,
    "title": "Vacation in Nigeria",
    "destination": "Lagos,Nigeria ",
    "startDate": "2024-09-10T00:00:00.000Z",
    "endDate": "2024-09-20T00:00:00.000Z",
    "userId": 1,
    "updatedAt": "2024-09-03T15:32:21.558Z",
    "createdAt": "2024-09-03T15:32:21.558Z"
   },
    {
    "id": 16,
    "title": "Vacation in Ghana",
    "destination": "Accra,Ghana ",
    "startDate": "2024-09-10T00:00:00.000Z",
    "endDate": "2024-09-20T00:00:00.000Z",
    "userId": 1,
    "updatedAt": "2024-09-03T15:32:21.558Z",
    "createdAt": "2024-09-03T15:32:21.558Z"
   }
  ```


### FETCH A SINGLE ITINERARIES

- **URL:** `/api/v1/itineraries/:id`
- **Method:** `GET`
- **Header:** `Authorization: Bearer <token>`
- **Response:**


  ```json
  {
    "id": 16,
    "title": "Vacation in Nigeria",
    "destination": "Lagos,Nigeria ",
    "startDate": "2024-09-10T00:00:00.000Z",
    "endDate": "2024-09-20T00:00:00.000Z",
    "userId": 1,
    "updatedAt": "2024-09-03T15:32:21.558Z",
    "createdAt": "2024-09-03T15:32:21.558Z"
  },

  ```


### UPDATE A USER ITINERARY

- **URL:** `/api/v1/itineraries/update/:id`
- **Method:** `PUT`
- **Header:** `Authorization: Bearer <token>`

  ```json
  {
    "title": "Vacation in Togo",
    "destination": "Togo,Togo ",
    "startDate": "2024-09-10",
    "endDate": "2024-09-20"
   }
  ```

- **Response:**

  ```json
  {
   "message":"Itinerary updated successfully"
  }


  ```

### DELETE A USER ITINERARY

- **URL:** `/api/v1/itineraries/delete/:id`
- **Method:** `DELETE`
- **Header:** `Authorization: Bearer <token>`

- **Response:**

  ```json
  {
   "message":"Itinerary deleted successfully"
  }

  
  ```

### HOTEL BOOKING

### LIST AVAILABLE HOTELS


- **URL:** `/api/v1/hotels`
- **Method:** `GET`
- **QUERY PARAMS:**
  
  ```json
  {
    "geoId":304026,
    "checkIn":"2024-09-08",
    "checkOut":"2024-09-11",
    "pageNumber": 1
  }
 
  ```

  ```json
  {
    "message": "hotel listing",
  "data": [
    {
      "id": "20226148",
      "title": "The White Orchid Hotel",
      "provider": "Booking.com",
      "price": "$81",
      "photos": [
        {
          "__typename": "AppPresentation_PhotoItem",
          "sizes": {
            "__typename": "AppPresentation_PhotoItemSizeDynamic",
            "maxHeight": 879,
            "maxWidth": 1280,
            "urlTemplate": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/57/b7/f5/the-white-orchid-hotel.jpg?w={width}&h={height}&s=1"
          }
        },
        {
          "__typename": "AppPresentation_PhotoItem",
          "sizes": {
            "__typename": "AppPresentation_PhotoItemSizeDynamic",
            "maxHeight": 720,
            "maxWidth": 1080,
            "urlTemplate": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/69/82/02/caption.jpg?w={width}&h={height}&s=1"
          }
        },
        {
          "__typename": "AppPresentation_PhotoItem",
          "sizes": {
            "__typename": "AppPresentation_PhotoItemSizeDynamic",
            "maxHeight": 720,
            "maxWidth": 1080,
            "urlTemplate": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/69/81/fe/caption.jpg?w={width}&h={height}&s=1"
          }
        },
        {
          "__typename": "AppPresentation_PhotoItem",
          "sizes": {
            "__typename": "AppPresentation_PhotoItemSizeDynamic",
            "maxHeight": 720,
            "maxWidth": 1080,
            "urlTemplate": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/69/81/f9/caption.jpg?w={width}&h={height}&s=1"
          }
        }
      ],
      "rating": {
        "count": "9",
        "rating": 4
      },
      "primaryInfo": "Free breakfast available"
    },
   ] 

  }
 
  ```




### SEARCH LOCATION


- **URL:** `/api/v1/hotels/search-location/lagos`
- **Method:** `GET`
- **Request Body:** `{{BASEURL}}/api/v1/hotels/search-location/lagos?=null`

- **Response:**
  ```json
  {
  "message": "hotel location search",
  "data": [
    {
      "title": "<b>Lagos</b>",
      "geoId": 304026,
      "documentId": "loc;304026;g304026",
      "trackingItems": "CITY",
      "secondaryText": "Lagos State, Nigeria"
    },
    {
      "title": "<b>Lagos</b>",
      "geoId": 1915898,
      "documentId": "loc;1915898;g1915898",
      "trackingItems": "CITY",
      "secondaryText": "Nouvelle-Aquitaine, France"
    }
  ]
  }
  ```

### GET USER BOOKINGS

- **URL:** `/api/v1/hotels/user-bookings`
- **Method:** `GET`
- **Header:** `Authorization: Bearer <token>`
- **Response:**
  
```json
{
  "message": "User bookings retrieved successfully",
  "data": {
    "bookings": [
      {
        "bookingId": "BKG123456",
        "hotelName": "Sunrise Beach Resort",
        "checkIn": "2024-09-08",
        "checkOut": "2024-09-11",
        "roomType": "Deluxe Suite",
        "totalPrice": 450,
        "bookingStatus": "Confirmed",
        "guests": {
          "adults": 2,
          "children": 1
        }
      },
      {
        "bookingId": "BKG789012",
        "hotelName": "Mountain View Hotel",
        "checkIn": "2024-10-01",
        "checkOut": "2024-10-05",
        "roomType": "Standard Room",
        "totalPrice": 480,
        "bookingStatus": "Pending",
        "guests": {
          "adults": 1,
          "children": 0
        }
      }
    ],
    "totalBookings": 2
  },
 
}
```

### Contributors

##### Backend Developers
- Dina Iyanuloluwa
- Kenneth Ekandem 

##### API Tester
- Folarin
- Ijeoma Lawretta 





- 




