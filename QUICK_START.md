# Match & Remember - Quick Start Guide

Get the app running locally in minutes.

## Prerequisites

- Node.js v18+ and npm v9+
- Git
- Expo Go app (for testing on phone)

## 5-Minute Setup

### 1. Clone and Install

```bash
git clone <repository-url>
cd match-and-remember
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

You'll see a QR code in the terminal.

### 3. Test on Your Phone

**iOS:**
- Open Expo Go app
- Tap "Scan QR Code"
- Scan the QR code from terminal

**Android:**
- Open Expo Go app
- Tap "Scan QR Code"
- Scan the QR code from terminal

**Web:**
- Open browser to: http://localhost:8081

## Available Commands

```bash
npm run dev          # Start development server
npm run check        # Check TypeScript errors
npm run lint         # Run code linting
npm run test         # Run unit tests
npm run ios          # Build for iOS
npm run android      # Build for Android
npm run build        # Build for web
```

## Troubleshooting

**App won't load?**
```bash
npm run dev -- --reset-cache
```

**Module errors?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Port already in use?**
```bash
# Kill process on port 8081
lsof -ti:8081 | xargs kill -9
npm run dev
```

## Next Steps

1. Read [PRODUCTION_READINESS.md](./PRODUCTION_READINESS.md) for complete testing guide
2. Test all features using the provided checklist
3. Build for production when ready

---

For detailed information, see [PRODUCTION_READINESS.md](./PRODUCTION_READINESS.md)
