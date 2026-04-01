# Abu Alzahra VoIP Mobile Application

A React Native mobile application for VoIP services using Expo Router and TypeScript.

## Project Structure

```
frontend/
├── app/                    # Expo Router app directory
│   ├── (tabs)/            # Tab-based navigation screens
│   ├── auth/              # Authentication screens
│   ├── call/              # Call screens
│   └── splash.tsx         # Splash screen
├── components/            # Reusable React components
├── contexts/              # React Context providers
├── hooks/                 # Custom React hooks
├── lib/                   # External library integrations
├── store/                 # State management (Zustand)
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
├── constants/             # App constants
├── assets/                # Images, icons, fonts
└── [config files]         # Configuration files
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- Expo CLI
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Update environment variables with your configuration

### Running the App

Development mode:
```bash
npm start
# or
expo start
```

Run on Android:
```bash
npm run android
```

Run on iOS:
```bash
npm run ios
```

Run on web:
```bash
npm run web
```

### Building

Build APK:
```bash
npm run build:android
```

Build IPA:
```bash
npm run build:ios
```

## Features

- **Authentication**: Login and signup with email/password
- **Calls**: Make calls, view call history, call rates
- **Contacts**: Add, edit, delete contacts
- **Wallet**: View balance, recharge, transaction history
- **Real-time Updates**: WebSocket support for call notifications
- **Offline Support**: Local storage for offline access

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router
- **Language**: TypeScript
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Local Storage**: AsyncStorage
- **WebRTC**: react-native-webrtc
- **Firebase**: Authentication and real-time database

## API Integration

The app connects to a backend API at `http://localhost:8000/api` by default.

Configure in `.env`:
```
EXPO_PUBLIC_API_URL=http://your-api-url/api
```

## Scripts

- `npm start` - Start dev server
- `npm run android` - Run on Android device
- `npm run ios` - Run on iOS device
- `npm run web` - Run on web
- `npm run build` - Build production bundle
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler
- `npm test` - Run tests

## Environment Variables

Required environment variables (see `.env.example`):

- `EXPO_PUBLIC_API_URL` - Backend API URL
- `EXPO_PUBLIC_WEBSOCKET_URL` - WebSocket URL
- `EXPO_PUBLIC_TWILIO_*` - Twilio configuration
- `EXPO_PUBLIC_FIREBASE_*` - Firebase configuration

## License

MIT
