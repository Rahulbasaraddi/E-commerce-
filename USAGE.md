# API Usage Guide

Your application is configured as a **REST API** with JWT Authentication. It does not have a web-based login page.
The error `403 Forbidden` on `/login` happens because you are trying to access a protected URL via a Browser (GET request) instead of sending a POST request to the correct authentication endpoints.

## How to Authenticate

### 1. Register a New User
**URL:** `POST http://localhost:8080/auth/register`
**Body:** JSON
```json
{
    "username": "rahul",
    "password": "password123"
}
```

**Curl Command:**
```bash
curl -X POST http://localhost:8080/auth/register -H "Content-Type: application/json" -d "{\"username\":\"rahul\",\"password\":\"password123\"}"
```

### 2. Login
**URL:** `POST http://localhost:8080/auth/login`
**Body:** JSON
```json
{
    "username": "rahul",
    "password": "password123"
}
```
**Response:** You will receive a long string (JWT Token).

**Curl Command:**
```bash
curl -X POST http://localhost:8080/auth/login -H "Content-Type: application/json" -d "{\"username\":\"rahul\",\"password\":\"password123\"}"
```

### 3. Access Protected Data
To access other endpoints (like Users or Products), you must include the token in the **Header**.

**Header:** `Authorization: Bearer <YOUR_JWT_TOKEN>`

**Curl Command:**
```bash
curl http://localhost:8080/products -H "Authorization: Bearer <PASTE_TOKEN_HERE>"
```
