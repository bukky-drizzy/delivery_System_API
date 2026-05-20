# Rider API Documentation

## Overview
This document outlines all the rider-related endpoints, features, and changes in the Delivery System API.

---

## Rider Endpoints

### 1. Register Rider (Sign Up)
**POST** `/riders/signup`

No authentication required.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "phoneNumber": "08012345678",
  "email": "john@example.com",
  "password": "securePassword123",
  "vehicleType": "BIKE",
  "plateNumber": "ABC123XYZ"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "id": "60d5ec49f1234567890abcde",
    "fullName": "John Doe",
    "phoneNumber": "08012345678",
    "email": "john@example.com",
    "vehicleType": "BIKE",
    "role": "RIDER",
    "plateNumber": "ABC123XYZ"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Please provide all required fields"
}
```

---

### 2. Rider Login
**POST** `/riders/login`

No authentication required.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "id": "60d5ec49f1234567890abcde",
    "fullName": "John Doe",
    "phoneNumber": "08012345678",
    "email": "john@example.com",
    "role": "RIDER",
    "vehicleType": "BIKE",
    "plateNumber": "ABC123XYZ"
  }
}
```

**Error Responses:**
- 404: "Rider not found"
- 400: "Invalid credentials"

---

### 3. Get All Riders
**GET** `/riders/`

**Authentication:** Required (Bearer token)

**Response (200):**
```json
[
  {
    "id": "60d5ec49f1234567890abcde",
    "fullName": "John Doe",
    "phoneNumber": "08012345678",
    "email": "john@example.com",
    "role": "RIDER",
    "vehicleType": "BIKE",
    "plateNumber": "ABC123XYZ",
    "availability": "AVAILABLE",
    "currentLocation": {
      "latitude": 6.5244,
      "longitude": 3.3792
    },
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
]
```

---

### 4. Get Single Rider
**GET** `/riders/:id`

**Authentication:** Required (Bearer token)

**Parameters:**
- `id` (string, required) - Rider ID

**Response (200):**
```json
{
  "id": "60d5ec49f1234567890abcde",
  "fullName": "John Doe",
  "phoneNumber": "08012345678",
  "email": "john@example.com",
  "role": "RIDER",
  "vehicleType": "BIKE",
  "plateNumber": "ABC123XYZ",
  "availability": "AVAILABLE",
  "currentLocation": {
    "latitude": 6.5244,
    "longitude": 3.3792
  },
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

---

### 5. Update Rider Availability
**PATCH** `/riders/:id/availability`

**Authentication:** Required (Bearer token)

**Parameters:**
- `id` (string, required) - Rider ID

**Request Body:**
```json
{
  "availability": "AVAILABLE"
}
```

**Availability Options:**
- `AVAILABLE` - Rider is ready to take deliveries
- `BUSY` - Rider is currently on a delivery
- `OFFLINE` - Rider is offline

**Response (200):**
```json
{
  "success": true,
  "message": "Availability updated",
  "data": {
    "id": "60d5ec49f1234567890abcde",
    "availability": "AVAILABLE"
  }
}
```

---

### 6. Update Delivery Status
**PATCH** `/riders/:id/delivery-status`

**Authentication:** Required (Bearer token)

**Parameters:**
- `id` (string, required) - Rider ID

**Request Body:**
```json
{
  "deliveryStatus": "IN_TRANSIT"
}
```

**Delivery Status Options:**
- `IDLE` - No active delivery
- `PICKED_UP` - Package picked up
- `IN_TRANSIT` - Package in transit
- `DELIVERED` - Delivery completed
- `CANCELLED` - Delivery cancelled

**Response (200):**
```json
{
  "success": true,
  "message": "Delivery status updated",
  "data": {
    "id": "60d5ec49f1234567890abcde",
    "deliveryStatus": "IN_TRANSIT"
  }
}
```

---

### 7. Update Rider Location
**PATCH** `/riders/:id/location`

**Authentication:** Required (Bearer token)

**Parameters:**
- `id` (string, required) - Rider ID

**Request Body:**
```json
{
  "latitude": 6.5244,
  "longitude": 3.3792
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Location updated",
  "data": {
    "id": "60d5ec49f1234567890abcde",
    "currentLocation": {
      "latitude": 6.5244,
      "longitude": 3.3792
    }
  }
}
```

---

### 8. Delete Rider
**DELETE** `/riders/:id`

**Authentication:** Required (Bearer token)

**Parameters:**
- `id` (string, required) - Rider ID

**Response (200):**
```json
{
  "success": true,
  "message": "Rider deleted successfully"
}
```

---

## Rider Model Schema

```javascript
{
  fullName: String (required),
  phoneNumber: String (required, unique),
  email: String (unique, lowercase),
  password: String (required, minlength: 6),
  role: String (enum: ["RIDER"], default: "RIDER"),
  vehicleType: String (enum: ["BIKE", "CAR", "VAN"], default: "BIKE"),
  plateNumber: String (required, uppercase),
  availability: String (enum: ["AVAILABLE", "BUSY", "OFFLINE"], default: "OFFLINE"),
  currentLocation: {
    latitude: Number,
    longitude: Number
  },
  timestamps: true
}
```

---

## Authentication

All rider endpoints except signup and login require authentication via JWT token.

**Header Format:**
```
Authorization: Bearer <token>
```

---

## Error Codes

| Status | Error | Meaning |
|--------|-------|---------|
| 400 | Missing Fields | Required fields not provided |
| 400 | Rider Already Exists | Email or phone number already registered |
| 400 | Invalid Credentials | Wrong password |
| 401 | Unauthorized | Token missing or invalid |
| 403 | Access Denied | Insufficient permissions |
| 404 | Rider Not Found | Rider doesn't exist |
| 500 | Server Error | Internal server error |

---

## Example Usage

### Complete Rider Workflow

**1. Register a new rider:**
```bash
curl -X POST http://localhost:5000/riders/signup \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "phoneNumber": "08012345678",
    "email": "john@example.com",
    "password": "Password123",
    "vehicleType": "BIKE",
    "plateNumber": "ABC123XYZ"
  }'
```

**2. Login (get token):**
```bash
curl -X POST http://localhost:5000/riders/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Password123"
  }'
```

**3. Update availability:**
```bash
curl -X PATCH http://localhost:5000/riders/60d5ec49f1234567890abcde/availability \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token>" \
  -d '{
    "availability": "AVAILABLE"
  }'
```

**4. Update location:**
```bash
curl -X PATCH http://localhost:5000/riders/60d5ec49f1234567890abcde/location \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token>" \
  -d '{
    "latitude": 6.5244,
    "longitude": 3.3792
  }'
```

---
