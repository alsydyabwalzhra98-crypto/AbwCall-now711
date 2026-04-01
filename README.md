# أبو الزهرا للاتصالات - Abu Alzahra VoIP

A comprehensive VoIP mobile application and backend service for making affordable international calls using Expo Router and FastAPI.

🌍 **Arabic-first mobile application** | 📞 **VoIP calling service** | 💳 **Wallet & balance system** | 📱 **React Native + TypeScript**

## Quick Start

### Frontend (React Native with Expo)

```bash
cd frontend
npm install
cp .env.example .env
npm start
```

Run on:
- Android: `npm run android`
- iOS: `npm run ios`
- Web: `npm run web`

### Backend (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
alembic upgrade head
uvicorn app.main:app --reload
```

API Documentation: http://localhost:8000/docs

## Features

### 📱 Mobile App
- **Authentication**: Secure login/signup with email
- **Call Management**: Make calls, view history, check rates
- **Contacts**: Add, edit, and search contacts
- **Wallet**: View balance, recharge, transaction history
- **Real-time Updates**: WebSocket support for live notifications
- **Offline Support**: Local storage for offline access
- **Arabic UI**: Full RTL support with Arabic language

### 🔧 Backend API
- **User Management**: Authentication, profiles, settings
- **Call Service**: Twilio integration for VoIP
- **Payment Processing**: Stripe integration for recharges
- **Contact Management**: CRUD operations with search
- **Transaction Tracking**: Complete payment history
- **Real-time WebSockets**: Live call notifications

## Tech Stack

### Frontend
- **Framework**: React Native with Expo
- **Navigation**: Expo Router
- **Language**: TypeScript
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Storage**: AsyncStorage
- **WebRTC**: react-native-webrtc
- **UI**: Expo Vector Icons

### Backend
- **Framework**: FastAPI
- **Database**: PostgreSQL + SQLAlchemy
- **Authentication**: JWT + bcrypt
- **VoIP**: Twilio SDK
- **Payments**: Stripe API
- **Cache**: Redis
- **Task Queue**: Celery
- **Real-time**: WebSockets

## Project Structure

```
abu-alzahra-voip/
├── frontend/                # React Native Expo app
│   ├── app/                # Expo Router screens
│   ├── components/         # Reusable components
│   ├── contexts/          # React Context providers
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # External integrations
│   ├── store/             # State management
│   ├── types/             # TypeScript types
│   ├── utils/             # Utility functions
│   ├── constants/         # App constants
│   └── package.json       # Dependencies
│
├── backend/                # FastAPI application
│   ├── app/
│   │   ├── api/           # API routes and endpoints
│   │   ├── core/          # Config and security
│   │   ├── models/        # Database models
│   │   ├── schemas/       # Pydantic schemas
│   │   ├── services/      # Business logic
│   │   ├── crud/          # Database operations
│   │   └── main.py        # FastAPI app
│   ├── alembic/           # Database migrations
│   └── requirements.txt    # Dependencies
│
└── docs/                   # Documentation
    ├── API.md             # API documentation
    ├── DEPLOYMENT.md      # Deployment guide
    └── TROUBLESHOOTING.md # Common issues
```

## Environment Setup

### Frontend (.env)
```
EXPO_PUBLIC_API_URL=http://localhost:8000/api
EXPO_PUBLIC_WEBSOCKET_URL=ws://localhost:8000/ws
EXPO_PUBLIC_TWILIO_ACCOUNT_SID=your-account-sid
EXPO_PUBLIC_FIREBASE_API_KEY=your-firebase-key
```

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/abualzahra
SECRET_KEY=your-super-secret-key
TWILIO_ACCOUNT_SID=your-account-sid
STRIPE_SECRET_KEY=your-stripe-key
```

## Available Scripts

### Frontend
- `npm start` - Start development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on web
- `npm run build` - Build production bundle
- `npm run lint` - Run ESLint
- `npm test` - Run tests

### Backend
- `uvicorn app.main:app --reload` - Start dev server
- `pytest` - Run tests
- `alembic upgrade head` - Run migrations
- `alembic revision --autogenerate -m "message"` - Create migration

## API Reference

See [backend/README.md](./backend/README.md) for detailed API documentation.

### Authentication
```
POST /api/v1/auth/login
POST /api/v1/auth/signup
GET /api/v1/auth/me
```

### Calls
```
POST /api/v1/calls/make
GET /api/v1/calls/history
GET /api/v1/calls/rates
```

### Contacts
```
GET /api/v1/contacts
POST /api/v1/contacts
PUT /api/v1/contacts/{id}
DELETE /api/v1/contacts/{id}
```

### Transactions
```
GET /api/v1/transactions
POST /api/v1/transactions/recharge
POST /api/v1/transactions/withdraw
```

## Deployment

### Docker
```bash
docker-compose up
```

See [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) for detailed deployment instructions.

## Testing

Frontend:
```bash
cd frontend
npm test
```

Backend:
```bash
cd backend
pytest
```

## Troubleshooting

See [docs/TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md) for common issues and solutions.

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

MIT © 2024 Abu Alzahra Communications

## Support

For issues and questions:
- Create an issue on GitHub
- Check [Troubleshooting Guide](./docs/TROUBLESHOOTING.md)
- Email: support@abualzahra.com

---

**Made with ❤️ for affordable international calling**