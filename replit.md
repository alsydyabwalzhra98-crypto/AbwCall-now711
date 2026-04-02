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
├── app/                  # Root Expo app screens (web dev server)
├── frontend/             # Main mobile app (Android build target)
│   ├── app/              # Expo Router screens
│   │   ├── _layout.tsx
│   │   ├── splash.tsx
│   │   ├── auth/         # Login & signup
│   │   ├── (tabs)/       # Home, calls, contacts, wallet
│   │   └── call/[id].tsx # Call screen
│   ├── components/       # Reusable UI components
│   ├── constants/        # Colors, sizes, config
│   ├── contexts/         # AuthContext, CallContext
│   ├── hooks/            # useAuth, useCall, useContacts
│   ├── lib/              # API client, firebase, webrtc
│   ├── store/            # Zustand state
│   ├── types/            # TypeScript types
│   ├── utils/            # Validation, formatting, storage
│   ├── android/          # Native Android project (Gradle build)
│   ├── assets/           # Images and fonts
│   ├── app.json          # Expo config
│   ├── package.json      # Dependencies (Expo 49, RN 0.72)
│   └── eas.json          # EAS Build config
├── backend/              # FastAPI backend
│   ├── app/
│   │   ├── api/v1/       # REST endpoints (auth, calls, contacts, transactions)
│   │   ├── core/         # Config (Pydantic V2), security
│   │   ├── crud/         # Database operations
│   │   ├── db/           # SQLAlchemy session
│   │   ├── models/       # DB models
│   │   ├── schemas/      # Pydantic schemas
│   │   └── services/     # Twilio, payment services
│   └── requirements.txt
├── .github/workflows/    # GitHub Actions
│   └── android-build.yml # Android APK build (Gradle 7.6.3 + AGP 7.3.1)
└── metro.config.js       # Metro bundler config (excludes .local/skills)
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
