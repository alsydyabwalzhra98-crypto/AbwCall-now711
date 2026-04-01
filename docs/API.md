# Abu Alzahra VoIP - API Documentation

## Base URL
```
http://localhost:8000/api/v1
```

## Authentication

All authenticated endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Response Format

### Success Response
```json
{
  "data": {},
  "message": "Success",
  "status": "success"
}
```

### Error Response
```json
{
  "detail": "Error message",
  "status": "error"
}
```

---

## Authentication Endpoints

### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "token_type": "bearer",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "balance": 100.00
  }
}
```

### Sign Up
```
POST /auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123"
}
```

### Get Current User
```
GET /auth/me
Authorization: Bearer <token>
```

### Update Profile
```
PUT /auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "New Name",
  "phone": "+1234567890"
}
```

---

## Call Endpoints

### Make a Call
```
POST /calls/make
Authorization: Bearer <token>
Content-Type: application/json

{
  "phone_number": "+1234567890"
}
```

**Response:**
```json
{
  "call_id": "uuid",
  "status": "initiated",
  "phone_number": "+1234567890",
  "started_at": "2024-03-31T12:00:00Z"
}
```

### End Call
```
POST /calls/{call_id}/end
Authorization: Bearer <token>
Content-Type: application/json

{
  "duration": 300
}
```

### Get Call History
```
GET /calls/history?limit=20&offset=0
Authorization: Bearer <token>
```

**Query Parameters:**
- `limit` (optional): Number of records to return (default: 20)
- `offset` (optional): Pagination offset (default: 0)

### Get Call Rates
```
GET /calls/rates
Authorization: Bearer <token>
```

**Response:**
```json
{
  "rates": [
    {
      "country": "United States",
      "country_code": "US",
      "rate_per_minute": 0.05,
      "currency": "USD"
    }
  ]
}
```

---

## Contact Endpoints

### List Contacts
```
GET /contacts?limit=50&offset=0
Authorization: Bearer <token>
```

### Add Contact
```
POST /contacts
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Doe",
  "phone": "+1234567890",
  "email": "john@example.com"
}
```

### Update Contact
```
PUT /contacts/{contact_id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Doe",
  "phone": "+0987654321",
  "email": "jane@example.com",
  "is_favorite": true
}
```

### Delete Contact
```
DELETE /contacts/{contact_id}
Authorization: Bearer <token>
```

### Search Contacts
```
GET /contacts/search?q=john
Authorization: Bearer <token>
```

---

## Transaction Endpoints

### List Transactions
```
GET /transactions?limit=20&offset=0&type=all
Authorization: Bearer <token>
```

**Query Parameters:**
- `type` (optional): Filter by type - 'recharge', 'call', 'withdraw', 'all' (default: all)
- `limit` (optional): Number of records (default: 20)
- `offset` (optional): Pagination offset (default: 0)

### Recharge Balance
```
POST /transactions/recharge
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 50.00,
  "payment_method": "credit_card"
}
```

**Payment Methods:**
- `credit_card`
- `paypal`
- `bank_transfer`

**Response:**
```json
{
  "transaction_id": "uuid",
  "type": "recharge",
  "amount": 50.00,
  "new_balance": 150.00,
  "status": "completed",
  "created_at": "2024-03-31T12:00:00Z"
}
```

### Withdraw Balance
```
POST /transactions/withdraw
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 20.00,
  "bank_account": "IBAN..."
}
```

---

## Error Codes

| Code | Message | Description |
|------|---------|-------------|
| 200 | OK | Success |
| 201 | Created | Resource created |
| 400 | Bad Request | Invalid input |
| 401 | Unauthorized | Missing or invalid token |
| 403 | Forbidden | No permission |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Resource conflict |
| 500 | Internal Error | Server error |

---

## Rate Limiting

- **Limit**: 100 requests per minute per user
- **Headers**: 
  - `X-RateLimit-Limit`: Total requests allowed
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Unix timestamp of reset time
