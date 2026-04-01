# Abu Alzahra VoIP Backend API

A FastAPI-based backend for the Abu Alzahra VoIP mobile application.

## Project Structure

```
backend/
├── app/
│   ├── api/
│   │   ├── v1/
│   │   │   ├── endpoints/    # API route handlers
│   │   │   └── api.py        # API router
│   │   └── deps.py           # Dependency injection
│   ├── core/
│   │   ├── config.py         # Configuration
│   │   ├── security.py       # JWT and password utilities
│   │   └── twilio_client.py  # Twilio integration
│   ├── models/               # SQLAlchemy models
│   ├── schemas/              # Pydantic schemas
│   ├── services/             # Business logic services
│   ├── crud/                 # Database operations
│   ├── db/                   # Database configuration
│   └── main.py               # FastAPI app
├── alembic/                  # Database migrations
├── requirements.txt          # Python dependencies
├── Dockerfile
├── .env.example
└── README.md
```

## Features

- **Authentication**: JWT-based authentication with secure password hashing
- **VoIP Calls**: Twilio integration for making/receiving calls
- **Contact Management**: Add, edit, delete, and search contacts
- **Wallet System**: Balance management and transaction tracking
- **Payment Processing**: Recharge and withdrawal support
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Real-time**: WebSocket support for live updates
- **API Documentation**: Auto-generated Swagger/OpenAPI docs

## Getting Started

### Prerequisites
- Python 3.9+
- PostgreSQL
- Redis (optional, for caching)

### Installation

1. Create and activate virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update environment variables with your configuration

5. Initialize database:
```bash
alembic upgrade head
```

### Running the Server

Development:
```bash
uvicorn app.main:app --reload
```

Production:
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### API Documentation

Visit http://localhost:8000/docs for interactive Swagger UI
Visit http://localhost:8000/redoc for ReDoc documentation

## API Endpoints

### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/signup` - User registration
- `GET /api/v1/auth/me` - Get current user
- `PUT /api/v1/auth/profile` - Update profile

### Calls
- `POST /api/v1/calls/make` - Make a call
- `POST /api/v1/calls/{id}/end` - End a call
- `GET /api/v1/calls/history` - Get call history
- `GET /api/v1/calls/rates` - Get calling rates

### Contacts
- `GET /api/v1/contacts` - List contacts
- `POST /api/v1/contacts` - Add contact
- `PUT /api/v1/contacts/{id}` - Update contact
- `DELETE /api/v1/contacts/{id}` - Delete contact
- `GET /api/v1/contacts/search` - Search contacts

### Transactions
- `GET /api/v1/transactions` - List transactions
- `POST /api/v1/transactions/recharge` - Add balance
- `POST /api/v1/transactions/withdraw` - Withdraw balance

## Database

Uses PostgreSQL with Alembic for migrations.

### Creating Migrations
```bash
alembic revision --autogenerate -m "Description"
```

### Running Migrations
```bash
alembic upgrade head
```

## Testing

Run tests:
```bash
pytest
```

With coverage:
```bash
pytest --cov=app
```

## Security

- JWT tokens for authentication
- Password hashing with bcrypt
- CORS configuration
- SQL injection prevention with SQLAlchemy ORM
- Environment variable protection

## Deployment

See DEPLOYMENT.md for production deployment instructions.

## License

MIT
