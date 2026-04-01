# Abu Alzahra VoIP - Replit Configuration

## Project Overview
A VoIP calling application with an Arabic-first interface for affordable international calling. Features include wallet/balance management, call history, contact management, and real-time call status updates.

## Architecture
- **Frontend**: React Native with Expo (web build via Metro), served on port 5000
- **Backend**: FastAPI (Python), served on port 8000
- **Database**: SQLite (development), configured via DATABASE_URL in settings
- **VoIP**: Twilio integration (optional, requires TWILIO_* env vars)
- **Payments**: Stripe integration (optional, requires STRIPE_* env vars)

## Project Structure
```
/
├── app/                  # Expo Router screens (root-level, main entry)
│   ├── _layout.tsx       # Root layout
│   ├── splash.tsx        # Splash/routing screen
│   ├── auth/             # Login & signup screens
│   ├── (tabs)/           # Main tab screens (home, calls, contacts, wallet)
│   └── call/             # Call interface screen
├── assets/               # Static assets (images, fonts)
├── components/           # Reusable UI components
├── constants/            # App constants (colors, sizes)
├── contexts/             # React contexts (AuthContext, CallContext)
├── hooks/                # Custom hooks
├── lib/                  # API client, utilities
├── store/                # Zustand state management
├── types/                # TypeScript types
├── utils/                # Utility functions
├── backend/              # FastAPI backend
│   ├── app/
│   │   ├── api/v1/       # REST API endpoints
│   │   ├── core/         # Config, security
│   │   ├── crud/         # Database operations
│   │   ├── db/           # Database session, base models
│   │   ├── models/       # SQLAlchemy models
│   │   ├── schemas/      # Pydantic schemas
│   │   └── services/     # Business logic (Twilio, payments)
│   └── requirements.txt
└── frontend/             # Duplicate of root frontend files (reference only)
```

## Running the App
- **Frontend**: `expo start --web --port 5000` (workflow: "Start application")
- **Backend**: `cd backend && python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload` (workflow: "Backend API")

## Environment Variables
- `EXPO_PUBLIC_API_URL`: Backend API URL (set to Replit dev domain:8000/api/v1)
- `EXPO_PUBLIC_WEBSOCKET_URL`: WebSocket URL for real-time updates
- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER`: Optional Twilio config
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`: Optional Stripe config
- `SECRET_KEY`: JWT signing key (defaults to insecure dev value)

## Key Notes
- SQLite is used by default (no PostgreSQL setup needed for development)
- Twilio and Stripe services are optional - the app works without them but calling/payments won't function
- The `frontend/` directory is a duplicate reference copy; the actual running app uses root-level files
- Assets live in `assets/` at the root level
