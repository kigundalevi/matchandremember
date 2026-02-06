# Match & Remember - Production Readiness Guide

This guide provides step-by-step instructions to prepare the Match & Remember app for production deployment. Follow all sections to ensure the app is thoroughly tested, optimized, and ready for release.

---

## Table of Contents

1. [System Requirements](#system-requirements)
2. [Local Setup](#local-setup)
3. [Project Structure Overview](#project-structure-overview)
4. [Development Environment Setup](#development-environment-setup)
5. [Testing on Physical Devices](#testing-on-physical-devices)
6. [Pre-Production Checklist](#pre-production-checklist)
7. [Building for Production](#building-for-production)
8. [Performance Optimization](#performance-optimization)
9. [Troubleshooting](#troubleshooting)

---

## System Requirements

### Minimum Requirements

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (or pnpm v9.12.0+)
- **Git**: Latest version
- **Disk Space**: At least 5GB free space
- **RAM**: Minimum 8GB (16GB recommended for smooth development)

### Platform-Specific Requirements

**For iOS Testing:**
- macOS 12.0 or later
- Xcode 14.0 or later
- iOS device running iOS 14.0 or later
- Apple Developer Account (optional for physical device testing)

**For Android Testing:**
- Android Studio or Android SDK Tools
- Android device running Android 8.0 (API 26) or later
- USB debugging enabled on device
- USB cable for device connection

**For Web Testing:**
- Modern web browser (Chrome, Safari, Firefox, Edge)
- No additional software required

---

## Local Setup

### Step 1: Clone the Repository

```bash
# Clone the project repository
git clone <your-repository-url>
cd match-and-remember

# Verify you're in the correct directory
pwd
```

### Step 2: Install Dependencies

```bash
# Install all project dependencies
npm install
# OR if using pnpm
pnpm install

# Verify installation
npm list | head -20
```

### Step 3: Verify Project Structure

```bash
# Check that all essential directories exist
ls -la

# Expected directories:
# - app/           (React Native screens and navigation)
# - components/    (Reusable UI components)
# - lib/           (Utilities, context, and helpers)
# - assets/        (Images, icons, and media)
# - package.json   (Project dependencies)
# - app.config.ts  (Expo configuration)
```

### Step 4: Environment Configuration

```bash
# Create .env file if needed (optional for local development)
cp .env.example .env 2>/dev/null || echo "No .env.example found"

# Verify app.config.ts has correct branding
cat app.config.ts | grep -A 5 "env ="
```

---

## Project Structure Overview

```
match-and-remember/
├── app/                          # Expo Router screens
│   ├── _layout.tsx              # Root layout with providers
│   ├── (tabs)/                  # Tab-based navigation
│   │   ├── _layout.tsx          # Tab bar configuration
│   │   └── index.tsx            # Home screen
│   ├── splash.tsx               # Splash screen
│   ├── category.tsx             # Category selection
│   ├── difficulty.tsx           # Difficulty selection
│   ├── game.tsx                 # Game board screen
│   └── completion.tsx           # Completion screen
├── components/
│   ├── screen-container.tsx     # SafeArea wrapper
│   ├── themed-view.tsx          # Themed background view
│   └── ui/
│       └── icon-symbol.tsx      # Icon mapping
├── lib/
│   ├── game-context.tsx         # Game state management
│   ├── audio-manager.ts         # Sound effects manager
│   ├── theme-provider.tsx       # Theme context
│   ├── utils.ts                 # Utility functions
│   └── __tests__/               # Unit tests
├── assets/
│   └── images/                  # App icons and splash
├── hooks/
│   ├── use-colors.ts            # Theme colors hook
│   ├── use-color-scheme.ts      # Dark/light mode detection
│   └── use-auth.ts              # Auth state hook
├── app.config.ts                # Expo configuration
├── tailwind.config.js           # Tailwind CSS config
├── theme.config.js              # Color palette config
├── package.json                 # Dependencies
└── PRODUCTION_READINESS.md      # This file
```

---

## Development Environment Setup

### Step 1: Start the Development Server

```bash
# Start Metro bundler and development server
npm run dev

# Expected output:
# - Metro Bundler starting...
# - Dev server running on port 8081
# - QR code displayed for Expo Go
```

### Step 2: Verify TypeScript Compilation

```bash
# Check for TypeScript errors
npm run check

# Expected output:
# - No errors (or list of errors to fix)
```

### Step 3: Run Linting

```bash
# Check code quality
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix
```

### Step 4: Run Unit Tests

```bash
# Run all tests
npm run test

# Expected output:
# - All test files pass
# - No failed tests

# Run specific test file
npm run test -- lib/__tests__/game-context.test.tsx
```

---

## Testing on Physical Devices

### Option A: Testing with Expo Go (Recommended for Quick Testing)

#### iOS Device

1. **Install Expo Go**
   - Open App Store on your iOS device
   - Search for "Expo Go"
   - Install the app

2. **Connect and Test**
   ```bash
   # In your terminal, start the dev server
   npm run dev

   # On iOS device:
   # - Open Expo Go app
   # - Tap "Scan QR Code"
   # - Scan the QR code displayed in terminal
   # - Wait for app to load (1-2 minutes first time)
   ```

#### Android Device

1. **Install Expo Go**
   - Open Google Play Store on your Android device
   - Search for "Expo Go"
   - Install the app

2. **Connect and Test**
   ```bash
   # Ensure USB debugging is enabled:
   # Settings → Developer Options → USB Debugging (toggle ON)

   # In your terminal, start the dev server
   npm run dev

   # On Android device:
   # - Open Expo Go app
   # - Tap "Scan QR Code"
   # - Scan the QR code displayed in terminal
   # - Wait for app to load
   ```

### Option B: Testing with Native Build (For Production-Like Experience)

#### iOS Native Build

```bash
# Build for iOS
npm run ios

# OR manually:
# 1. Open Xcode
# 2. Navigate to: ios/MatchAndRemember.xcworkspace
# 3. Select your device from the device dropdown
# 4. Click the Play button to build and run
```

#### Android Native Build

```bash
# Build for Android
npm run android

# OR manually:
# 1. Connect Android device via USB
# 2. Open Android Studio
# 3. Select your device from the device dropdown
# 4. Click the Play button to build and run
```

### Testing Checklist for Physical Devices

Use this checklist to systematically test all features:

```
CORE FUNCTIONALITY
- [ ] App launches without crashes
- [ ] Splash screen displays correctly
- [ ] Home screen loads with Play button visible
- [ ] Sound toggle works (on/off)

CATEGORY SELECTION
- [ ] All three categories display (Animals, Shapes, Numbers)
- [ ] Category cards have correct colors and icons
- [ ] Play button on each category is clickable
- [ ] Navigation to difficulty screen works

DIFFICULTY SELECTION
- [ ] All three difficulty levels display (Easy, Medium, Hard)
- [ ] Difficulty cards show correct grid visualizations
- [ ] Best scores display correctly (if available)
- [ ] Start button on each difficulty is clickable
- [ ] Navigation to game screen works

GAME BOARD
- [ ] Card grid displays with correct layout
- [ ] All cards are visible and properly sized
- [ ] Move counter displays and increments correctly
- [ ] Sound toggle works during gameplay
- [ ] Home button navigates back to home screen

CARD INTERACTIONS
- [ ] Cards flip smoothly when tapped
- [ ] Flip sound plays (if enabled)
- [ ] Cards stay flipped when matching
- [ ] Cards flip back when not matching
- [ ] Mismatch sound plays (if enabled)
- [ ] Match sound plays (if enabled)
- [ ] No cards can be flipped while checking for match

GAME COMPLETION
- [ ] Game navigates to completion screen once (not multiple times)
- [ ] Completion screen displays "Great Job!" message
- [ ] Move count displays correctly
- [ ] "New Best Score!" badge appears for new best scores
- [ ] Success sound plays (if enabled)
- [ ] Play Again button works smoothly
- [ ] Home button navigates to home screen

PERSISTENCE
- [ ] Sound preference persists after app restart
- [ ] Best scores persist after app restart
- [ ] Category/difficulty selection persists

PERFORMANCE
- [ ] No lag when flipping cards
- [ ] Smooth animations and transitions
- [ ] App doesn't freeze during gameplay
- [ ] Memory usage stays reasonable (check device settings)
- [ ] Battery drain is acceptable

ACCESSIBILITY
- [ ] All buttons have adequate touch targets (48dp minimum)
- [ ] Text is readable on all screen sizes
- [ ] Colors have sufficient contrast
- [ ] No content is cut off on notched devices

ORIENTATION
- [ ] App works in portrait orientation
- [ ] Layout is responsive on different screen sizes
- [ ] No content is hidden or distorted
```

---

## Pre-Production Checklist

### Code Quality

```bash
# 1. Run TypeScript type checking
npm run check
# Expected: No TypeScript errors

# 2. Run linting
npm run lint
# Expected: No critical linting errors

# 3. Run all unit tests
npm run test
# Expected: All tests pass (100% success rate)

# 4. Check for console errors
# - Start dev server: npm run dev
# - Open browser console (F12)
# - Check for any error messages
# - Expected: No errors or warnings
```

### Configuration Verification

```bash
# 1. Verify app.config.ts
cat app.config.ts | grep -E "(appName|appSlug|version|icon)"

# Expected output should show:
# - appName: "Match & Remember" (or your custom name)
# - appSlug: "match-and-remember"
# - version: "1.0.0"
# - icon: "./assets/images/icon.png"

# 2. Verify theme colors
cat theme.config.js | grep -A 20 "themeColors"

# Expected: All color tokens defined (primary, background, surface, etc.)

# 3. Verify app icons exist
ls -la assets/images/
# Expected: icon.png, splash-icon.png, favicon.png, android-icon-*.png
```

### Security Checklist

```
- [ ] No API keys or secrets in code
- [ ] No hardcoded credentials
- [ ] All sensitive data uses AsyncStorage
- [ ] No console.log statements with sensitive data
- [ ] Dependencies are up-to-date (npm audit)
- [ ] No known vulnerabilities (npm audit fix)
```

### Performance Checklist

```
- [ ] Bundle size is reasonable (<5MB for production build)
- [ ] Images are optimized (compressed)
- [ ] No memory leaks detected
- [ ] App responds quickly to user input
- [ ] Animations are smooth (60fps)
- [ ] No unnecessary re-renders
```

### Content Checklist

```
- [ ] All text is spelled correctly
- [ ] All images load correctly
- [ ] Sound files are present and working
- [ ] No placeholder text remains
- [ ] App name and version are correct
- [ ] All screens have appropriate content
```

---

## Building for Production

### iOS Production Build

```bash
# Step 1: Create a production build
eas build --platform ios --auto-submit

# OR build locally:
eas build --platform ios

# Step 2: Wait for build to complete (10-20 minutes)

# Step 3: Download the .ipa file from EAS

# Step 4: Submit to App Store using Xcode or Transporter
# - Open Xcode
# - Select Window → Organizer
# - Select your app
# - Click "Distribute App"
# - Follow the submission wizard
```

### Android Production Build

```bash
# Step 1: Create a production build
eas build --platform android --auto-submit

# OR build locally:
eas build --platform android

# Step 2: Wait for build to complete (10-15 minutes)

# Step 3: Download the .aab file from EAS

# Step 4: Submit to Google Play Console
# - Go to play.google.com/console
# - Select your app
# - Go to "Release" → "Production"
# - Upload the .aab file
# - Fill in release notes
# - Submit for review
```

### Web Production Build

```bash
# Build for web
npm run build

# Expected output:
# - dist/ directory created
# - All assets bundled and optimized
# - Ready for deployment

# Deploy to hosting service (Vercel, Netlify, etc.)
# Vercel example:
vercel --prod
```

---

## Performance Optimization

### Before Production Release

#### 1. Optimize Bundle Size

```bash
# Analyze bundle size
npm run build -- --analyze

# Tips to reduce size:
# - Remove unused dependencies
# - Use code splitting
# - Lazy load screens
# - Optimize images
```

#### 2. Optimize Images

```bash
# All images should be:
# - Compressed (use tools like TinyPNG, ImageOptim)
# - In appropriate formats (PNG for icons, WebP for photos)
# - Correct dimensions (no oversized images)

# Check image sizes
du -h assets/images/
```

#### 3. Enable Production Mode

```bash
# Ensure production build uses optimizations
# In app.config.ts, verify:
# - NODE_ENV=production
# - React.StrictMode disabled in production
# - Console statements removed
```

#### 4. Test Performance

```bash
# Test on slow network (Chrome DevTools)
# - Open DevTools (F12)
# - Go to Network tab
# - Set throttling to "Slow 3G"
# - Reload and verify app still works

# Test on low-end device
# - Use Android emulator with low specs
# - Monitor frame rate (should be 60fps)
# - Monitor memory usage
```

---

## Troubleshooting

### Common Issues and Solutions

#### Issue: "Module not found" errors

```bash
# Solution 1: Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Solution 2: Clear Metro cache
npm run dev -- --reset-cache
```

#### Issue: App crashes on startup

```bash
# Solution 1: Check for TypeScript errors
npm run check

# Solution 2: Check for missing dependencies
npm list

# Solution 3: Review recent changes
git diff HEAD~1

# Solution 4: Rollback to last working version
git checkout HEAD -- app/
```

#### Issue: Cards not flipping smoothly

```bash
# Solution: Disable animations in development
# Edit app/game.tsx and comment out animation code temporarily
# Verify game logic works without animations
# Re-enable animations and test
```

#### Issue: Sound not playing

```bash
# Solution 1: Check device sound settings
# - Ensure device is not in silent mode
# - Verify volume is not muted

# Solution 2: Check audio manager
# - Review lib/audio-manager.ts
# - Verify audio files exist in assets/

# Solution 3: Test on different device
# - Try on different iOS/Android device
# - Try on web browser
```

#### Issue: Best scores not persisting

```bash
# Solution 1: Check AsyncStorage
# - Verify AsyncStorage is initialized
# - Check BEST_SCORES key in storage

# Solution 2: Clear app data and test
# - iOS: Settings → General → iPhone Storage → App → Offload App
# - Android: Settings → Apps → App Info → Storage → Clear Data

# Solution 3: Debug storage
# - Add console.log in game-context.tsx
# - Monitor AsyncStorage.getItem/setItem calls
```

#### Issue: Navigation loops or freezes

```bash
# Solution 1: Check navigation refs
# - Verify hasNavigatedRef is properly initialized
# - Check router.push() calls

# Solution 2: Review useEffect dependencies
# - Ensure dependencies are correct
# - Avoid circular dependencies

# Solution 3: Test navigation flow
# - Add console.log at each navigation point
# - Trace the flow from start to completion
```

### Getting Help

If you encounter issues not covered here:

1. **Check the logs**
   ```bash
   # View dev server logs
   npm run dev 2>&1 | tee debug.log
   
   # View device logs
   # iOS: Xcode → Window → Devices and Simulators → Console
   # Android: Android Studio → Logcat
   ```

2. **Search existing issues**
   - GitHub Issues for Expo Router
   - GitHub Issues for React Native
   - Stack Overflow (tag: react-native)

3. **Create a minimal reproduction**
   - Create a new Expo project
   - Add only the problematic code
   - Test in isolation

---

## Final Production Checklist

Before releasing to production, verify all items:

```
FUNCTIONALITY
- [ ] All screens load without errors
- [ ] All buttons and interactions work
- [ ] Game logic is correct
- [ ] Navigation flows smoothly
- [ ] Sound works on all platforms
- [ ] Best scores persist correctly

TESTING
- [ ] Tested on iOS device
- [ ] Tested on Android device
- [ ] Tested on web browser
- [ ] All unit tests pass
- [ ] No console errors
- [ ] No memory leaks

PERFORMANCE
- [ ] App launches in < 3 seconds
- [ ] Card interactions are smooth
- [ ] No lag or stuttering
- [ ] Battery drain is acceptable
- [ ] Memory usage is reasonable

CONTENT
- [ ] All text is correct
- [ ] All images display correctly
- [ ] App name and version are correct
- [ ] No placeholder content remains

CONFIGURATION
- [ ] app.config.ts is correct
- [ ] theme.config.js is correct
- [ ] All icons are in place
- [ ] Build configuration is correct

SECURITY
- [ ] No secrets in code
- [ ] No hardcoded credentials
- [ ] Dependencies are secure
- [ ] No known vulnerabilities

DOCUMENTATION
- [ ] README is up-to-date
- [ ] PRODUCTION_READINESS.md is complete
- [ ] Code comments are clear
- [ ] Error messages are helpful
```

---

## Next Steps

1. **Follow the Local Setup section** to get the project running locally
2. **Run the Testing Checklist** on physical devices
3. **Complete the Pre-Production Checklist** to ensure quality
4. **Follow the Building for Production section** to create production builds
5. **Submit to app stores** following platform guidelines

---

## Support and Feedback

For issues, questions, or feedback:

- Review the [Troubleshooting](#troubleshooting) section
- Check project logs for error messages
- Test on different devices and platforms
- Consult Expo documentation: https://docs.expo.dev

---

**Last Updated**: February 4, 2026  
**App Version**: 1.0.0  
**Status**: Ready for Production Testing
