import { check, sleep } from "k6";
import http from "k6/http";
import { Rate } from "k6/metrics";
import { randomString } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";

const errorRate = new Rate("errors");

export const options = {
  scenarios: {
    baseline_load: {
      executor: "constant-vus",
      exec: "default",
      vus: 15,
      duration: "5m",
    },
    stress_test: {
      executor: "ramping-vus",
      exec: "default",
      startVUs: 10,
      stages: [
        { duration: "2m", target: 20 },
        { duration: "3m", target: 30 },
        { duration: "2m", target: 0 },
      ],
      gracefulRampDown: "30s",
    },
    spike_test: {
      executor: "per-vu-iterations",
      exec: "default",
      vus: 50,
      iterations: 1,
      maxDuration: "1m",
    },
  },
  thresholds: {
    http_req_duration: ["p(90)<1000"], // 90% of requests should be below 1s
    errors: ["rate<0.30"], // Error rate should be less than 30%
    http_req_failed: ["rate<0.15"], // Less than 15% of requests should fail
  },
};

// Base URL
const base_url = "https://team-6-purple.onrender.com";
let itineraryId; // Global variable to store the ID
let bookingId;
// const faker = require('faker');

// Valid user credentials to login
const credentials = {
  email: "Edwin.Jones56@gmail.com",
  password: "Te$t1234",
};

//   Test for POST /api/v1/users/login
function login() {
  let url = `${base_url}/api/v1/users/login`;
  let payload = JSON.stringify(credentials);
  let params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = http.post(url, payload, params);

  check(res, {
    "Login request succeeded, status was 200": (r) => r.status === 200,
    "Received auth token": (r) => r.json("token") !== "",
  }) || errorRate.add(1);

  if (res.status !== 200) {
    console.error("Login failed with status:", res.status);
    console.error("Response body:", res.body);
    return null;
  }

  return res.json("token"); // Return the token from the response
  sleep(1);
}

// Test for POST /api/v1/users/register/
function registerUser() {
  let url = `${base_url}/api/v1/users/register/`;
  let payload = JSON.stringify({
    first_name: randomString(9) + randomString(9) + randomString(9), // generate random values
    last_name: randomString(9) + randomString(9) + randomString(9),
    email:
      randomString(9) + randomString(9) + randomString(9) + "@mailinator.com",
    password: randomString(9) + randomString(9) + randomString(9) + "A1!@",
  });

  let params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = http.post(url, payload, params);

  check(res, {
    "status is 201": (r) => r.status === 201, // check that the status is 200
    "response time is < 1s": (r) => r.timings.duration < 1000, // check that the response time is less than a second
  }) || errorRate.add(1);

  sleep(1);
}

//   Test for POST /api/v1/users/logout
function logout() {
  let token = login();
  let url = `${base_url}/api/v1/users/logout`;
  let params = {
    headers: {
      Authorization: `Bearer ${token}`, // Use the token from login
      "Content-Type": "application/json",
    },
  };

  let res = http.post(url, params);

  check(res, {
    "Logout request succeeded, status was 200": (r) => r.status === 200,
  }) || errorRate.add(1);

  if (res.status !== 200) {
    console.error("Logout failed with status:", res.status);
    console.error("Response body:", res.body);
    return null;
  }
  sleep(1);
}

//   Test for POST /api/v1/itineraries
function createItineraries() {
  let token = login();
  let url = `${base_url}/api/v1/itineraries/create`;
  let payload = JSON.stringify({
    title: "Vacation in Nigeria",
    destination: "Lagos, Nigeria",
    startDate: "2024-09-10",
    endDate: "2024-09-20",
  });
  let params = {
    headers: {
      Authorization: `Bearer ${token}`, // Use the token from login
      "Content-Type": "application/json",
    },
  };

  let res = http.post(url, payload, params);

  check(res, {
    "Itinerary created successfully, status was 201": (r) => r.status === 201,
  }) || errorRate.add(1);

  // Parse the JSON response and extract the ID
  let responseBody = JSON.parse(res.body);
  itineraryId = responseBody.itinerary.id;
  console.log(`Itinerary created with ID: ${itineraryId}`);

  if (res.status !== 201) {
    console.error("Itinerary creation failed with status:", res.status);
    console.error("Response body:", res.body);
    return null;
  }
  sleep(1);
}

//   Test for GET /api/v1/itineraries
function fetchItineraries() {
  let token = login();
  let url = `${base_url}/api/v1/itineraries`;
  let params = {
    headers: {
      Authorization: `Bearer ${token}`, // Use the token from login
      "Content-Type": "application/json",
    },
  };

  let res = http.get(url, params);

  check(res, {
    "Itinerary fetched successfully, status was 200": (r) => r.status === 200,
  }) || errorRate.add(1);

  if (res.status !== 200) {
    console.error("Faied to fetch itinerary with status:", res.status);
    console.error("Response body:", res.body);
    return null;
  }
  sleep(1);
}

//   Test for PUT /api/v1/itineraries/update/:id
function updateItinerary() {
  let token = login();
  let url = `${base_url}/api/v1/itineraries/update/${itineraryId}`;
  let payload = JSON.stringify({
    title: "Vacation in Nigeria",
    destination: "Lagos, Nigeria",
    startDate: "2024-09-12",
    endDate: "2024-09-20",
  });
  let params = {
    headers: {
      Authorization: `Bearer ${token}`, // Use the token from login
      "Content-Type": "application/json",
    },
  };

  let res = http.put(url, payload, params);

  check(res, {
    "Itineraries updated successfully, status was 200": (r) => r.status === 200,
  }) || errorRate.add(1);

  if (res.status !== 200) {
    console.error("Faied to update itineraries with status:", res.status);
    console.error("Response body:", res.body);
    return null;
  }
  sleep(1);
}

//   Test for DELETE /api/v1/itineraries/delete/:id
function deleteItinerary() {
  let token = login();
  let url = `${base_url}/api/v1/itineraries/delete/${itineraryId}`;
  let params = {
    headers: {
      Authorization: `Bearer ${token}`, // Use the token from login
      "Content-Type": "application/json",
    },
  };

  let res = http.delete(url, params);

  check(res, {
    "Itineraries deleted successfully, status was 200": (r) => r.status === 200,
  }) || errorRate.add(1);

  if (res.status !== 200) {
    console.error("Faied to delete itineraries with status:", res.status);
    console.error("Response body:", res.body);
    return null;
  }
  sleep(1);
}

//   Test for GET /api/v1/hotels/[params]
function fetchAvailableHotels() {
  let token = login();
  let url = `${base_url}/api/v1/hotels/api/v1/hotels/listHotels?geoId=304026&checkIn=2024-09-02&checkOut=2024-09-03&pageNumber=1`;
  let params = {
    headers: {
      Authorization: `Bearer ${token}`, // Use the token from login
      "Content-Type": "application/json",
    },
  };

  let res = http.get(url, params);

  check(res, {
    "Hotels fetched successfully, status was 200": (r) => r.status === 200,
  }) || errorRate.add(1);

  if (res.status !== 200) {
    console.error("Faied to fetch hotels with status:", res.status);
    console.error("Response body:", res.body);
    return null;
  }
  sleep(1);
}

//   Test for GET /api/v1/hotels/search-location/:place
function searchLocation() {
  let token = login();
  let url = `${base_url}/api/v1/hotels/search-location/lagos`;
  let params = {
    headers: {
      Authorization: `Bearer ${token}`, // Use the token from login
      "Content-Type": "application/json",
    },
  };

  let res = http.get(url, params);

  check(res, {
    "Locations for Hotels searched successfully, status was 200": (r) =>
      r.status === 200,
  }) || errorRate.add(1);

  if (res.status !== 200) {
    console.error("Faied to search for hotels with status:", res.status);
    console.error("Response body:", res.body);
    return null;
  }
  sleep(1);
}

//   Test for POST /api/v1/hotels/book
function bookHotel() {
  let token = login();
  let url = `${base_url}/api/v1/hotels/book`;
  let payload = JSON.stringify({
    geoId: 304026,
    locationId: "1456434",
    checkIn: "2024-09-02",
    checkOut: "2024-09-03",
    adults: 1,
    rooms: 1,
    price: "$196",
    photos: [""],
  });
  let params = {
    headers: {
      Authorization: `Bearer ${token}`, // Use the token from login
      "Content-Type": "application/json",
    },
  };

  let res = http.post(url, payload, params);

  check(res, {
    "Hotel booked successfully, status was 200": (r) => r.status === 200,
  }) || errorRate.add(1);

  // Parse the JSON response and extract the ID
  let responseBody = JSON.parse(res.body);
  bookingId = responseBody.data.id;
  console.log(`Booking created with ID: ${bookingId}`);

  if (res.status !== 200) {
    console.error("Hotel booking failed with status:", res.status);
    console.error("Response body:", res.body);
    return null;
  }
  sleep(1);
}

//   Test for GET /api/v1/hotels/user-bookings
function fetchBookings() {
  let token = login();
  let url = `${base_url}/api/v1/hotels/user-bookings`;
  let params = {
    headers: {
      Authorization: `Bearer ${token}`, // Use the token from login
      "Content-Type": "application/json",
    },
  };

  let res = http.get(url, params);

  check(res, {
    "Itinerary fetched successfully, status was 200": (r) => r.status === 200,
  }) || errorRate.add(1);

  if (res.status !== 200) {
    console.error("Faied to fetch itinerary with status:", res.status);
    console.error("Response body:", res.body);
    return null;
  }
  sleep(1);
}

//   Test for PATCH /api/v1/hotels/cancel/:bookingId
function cancelBooking() {
  let token = login();
  let url = `${base_url}/api/v1/itineraries/${bookingId}`;
  let params = {
    headers: {
      Authorization: `Bearer ${token}`, // Use the token from login
      "Content-Type": "application/json",
    },
  };

  let res = http.patch(url, params);

  check(res, {
    "Booking cancelled successfully, status was 200": (r) => r.status === 200,
  }) || errorRate.add(1);

  if (res.status !== 200) {
    console.error("Faied to cancel booking with status:", res.status);
    console.error("Response body:", res.body);
    return null;
  }
  sleep(1);
}

//   Test for DELETE /api/v1/hotels/:bookingId
function deleteBooking() {
  let token = login();
  let url = `${base_url}/api/v1/hotels/${bookingId}`;
  let params = {
    headers: {
      Authorization: `Bearer ${token}`, // Use the token from login
      "Content-Type": "application/json",
    },
  };

  let res = http.delete(url, params);

  check(res, {
    "Booking deleted successfully, status was 200": (r) => r.status === 200,
  }) || errorRate.add(1);

  if (res.status !== 200) {
    console.error("Faied to delete booking with status:", res.status);
    console.error("Response body:", res.body);
    return null;
  }
  sleep(1);
}

export default function () {
  const token = login();
  if (!token) {
    // Handle case where login failed
    return;
  }
  registerUser();
  createItineraries();
  fetchItineraries();
  updateItinerary();
  deleteItinerary();
  fetchAvailableHotels();
  searchLocation();
  bookHotel();
  fetchBookings();
  cancelBooking();
  deleteBooking();
  logout();
}
