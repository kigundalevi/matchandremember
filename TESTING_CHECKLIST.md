# Match & Remember - Testing Checklist

Use this document to systematically test all features before production release.

## Test Environment Setup

- [ ] Development server running: `npm run dev`
- [ ] Physical device connected or Expo Go installed
- [ ] Device screen brightness at 50%+
- [ ] Device volume at 50%+
- [ ] Device not in low power mode
- [ ] Network connection stable

---

## Core Functionality Tests

### App Launch and Splash Screen

- [ ] App launches without crashes
- [ ] Splash screen displays for 1-2 seconds
- [ ] App logo is visible and centered
- [ ] Splash screen fades smoothly to home screen
- [ ] No console errors during launch

### Home Screen

- [ ] Home screen loads completely
- [ ] App title "Match & Remember" is visible
- [ ] Subtitle "Find the matching pairs!" is visible
- [ ] Play button is prominent and clickable
- [ ] Sound toggle button is visible in top-right
- [ ] Decorative stars are displayed at bottom
- [ ] Tab bar is visible at bottom

---

## Category Selection Tests

### Category Screen Display

- [ ] Category selection screen loads after clicking Play
- [ ] Back arrow button is visible and clickable
- [ ] "Select a Theme" title is displayed
- [ ] All three category cards are visible:
  - [ ] Animals card (with paw icon)
  - [ ] Shapes card (with shapes icon)
  - [ ] Numbers card (with numbers icon)
- [ ] Each card has correct background color
- [ ] Each card displays category name
- [ ] Each card displays category description
- [ ] Each card has a Play button

### Category Selection Interaction

- [ ] Clicking Animals card → navigates to difficulty screen
- [ ] Clicking Shapes card → navigates to difficulty screen
- [ ] Clicking Numbers card → navigates to difficulty screen
- [ ] Back arrow → returns to home screen
- [ ] No lag when clicking cards

---

## Difficulty Selection Tests

### Difficulty Screen Display

- [ ] Difficulty selection screen loads correctly
- [ ] Back arrow button is visible
- [ ] "Choose Level" title is displayed
- [ ] "Ready to Play?" heading is visible
- [ ] "Pick a size to start matching!" subtitle is visible
- [ ] All three difficulty cards are visible:
  - [ ] Easy (2×2 grid, 4 cards)
  - [ ] Medium (3×4 grid, 12 cards)
  - [ ] Hard (4×4 grid, 16 cards)
- [ ] Each card displays correct icon and title
- [ ] Each card displays card count
- [ ] Each card displays Start button
- [ ] Best scores display if available

### Difficulty Selection Interaction

- [ ] Clicking Easy Start → navigates to game screen
- [ ] Clicking Medium Start → navigates to game screen
- [ ] Clicking Hard Start → navigates to game screen
- [ ] Back arrow → returns to category screen
- [ ] No lag when clicking buttons

---

## Game Board Tests

### Game Screen Display

- [ ] Game board loads with correct grid layout
- [ ] Home button (🏠) visible in top-left
- [ ] Move counter visible in top-center
- [ ] Sound toggle visible in top-right
- [ ] Card grid displays with correct dimensions:
  - [ ] Easy: 2×2 grid (4 cards)
  - [ ] Medium: 3×4 grid (12 cards)
  - [ ] Hard: 4×4 grid (16 cards)
- [ ] All cards are visible and properly sized
- [ ] Cards have consistent spacing
- [ ] No cards are cut off or hidden

### Move Counter

- [ ] Move counter starts at 0
- [ ] Move counter increments by 1 after each pair of flips
- [ ] Move counter displays correctly throughout game
- [ ] Move counter shows final count on completion screen

### Home Button

- [ ] Clicking home button → returns to home screen
- [ ] Game state is reset
- [ ] No crashes when returning home

---

## Card Interaction Tests

### Card Flipping

- [ ] Cards flip smoothly when tapped
- [ ] Flip animation takes ~450ms
- [ ] Only one card flips per tap
- [ ] Tapping same card twice doesn't cause issues
- [ ] Cards show emoji/content when flipped

### Match Detection

- [ ] Matching cards stay flipped
- [ ] Matching cards highlight or show success state
- [ ] Match sound plays (if enabled)
- [ ] Matched cards cannot be flipped again

### Non-Match Detection

- [ ] Non-matching cards flip back after ~700ms delay
- [ ] Both cards flip back together
- [ ] Mismatch sound plays (if enabled)
- [ ] Cards can be flipped again after mismatch

### Interaction Constraints

- [ ] Cannot flip more than 2 cards at once
- [ ] Cannot flip cards while checking for match
- [ ] Cannot interact with cards during animations
- [ ] Smooth interaction without lag

---

## Sound Tests

### Sound Toggle

- [ ] Sound toggle button is clickable
- [ ] Toggle shows on/off state
- [ ] Sound preference persists after app restart
- [ ] Toggle works during gameplay

### Sound Effects

- [ ] Flip sound plays when card is flipped (if enabled)
- [ ] Match sound plays when cards match (if enabled)
- [ ] Mismatch sound plays when cards don't match (if enabled)
- [ ] Success sound plays on completion (if enabled)
- [ ] No sound plays when toggle is off
- [ ] Sounds are not too loud
- [ ] Sounds don't overlap or cause issues

### Sound on Different Platforms

- [ ] iOS: Sounds play in silent mode (if configured)
- [ ] Android: Sounds respect device volume
- [ ] Web: Sounds play in browser

---

## Game Completion Tests

### Completion Screen Display

- [ ] Game navigates to completion screen after all matches
- [ ] Navigation happens only once (no multiple navigations)
- [ ] "Great Job!" message displays
- [ ] "You found all the matches! 🎉" subtitle displays
- [ ] Move count displays correctly
- [ ] "New Best Score!" badge shows for new best scores
- [ ] Play Again button is visible
- [ ] Home button is visible
- [ ] Celebration animation plays

### Best Score Tracking

- [ ] Best score saves correctly
- [ ] "New Best Score!" badge appears for new best
- [ ] Best score doesn't update if not better
- [ ] Best scores persist after app restart
- [ ] Best scores display on difficulty screen

### Completion Actions

- [ ] Clicking Play Again → resets game and navigates to game board
- [ ] Clicking Home → returns to home screen
- [ ] Game state is properly reset for next game
- [ ] No crashes or freezes

---

## Navigation Flow Tests

### Complete Game Flow

- [ ] Home → Play → Category → Difficulty → Game → Completion → Home
- [ ] All transitions are smooth
- [ ] No crashes during navigation
- [ ] Back buttons work correctly at each screen

### Back Navigation

- [ ] Back arrow on category screen → home
- [ ] Back arrow on difficulty screen → category
- [ ] Home button on game screen → home
- [ ] Home button on completion screen → home

### Edge Cases

- [ ] Rapid screen transitions don't crash app
- [ ] Switching between categories works
- [ ] Switching between difficulties works
- [ ] Playing multiple games in sequence works

---

## Persistence Tests

### Sound Preference

- [ ] Toggle sound on/off
- [ ] Close app completely
- [ ] Reopen app
- [ ] Sound preference is maintained

### Best Scores

- [ ] Complete a game with X moves
- [ ] Close app completely
- [ ] Reopen app
- [ ] Best score is still displayed on difficulty screen

### Category/Difficulty Memory

- [ ] Select category and difficulty
- [ ] Close app
- [ ] Reopen app
- [ ] Previous selections are remembered (optional)

---

## Performance Tests

### Responsiveness

- [ ] App responds immediately to taps
- [ ] No noticeable lag during card flips
- [ ] Animations are smooth (60fps)
- [ ] No stuttering or jank

### Memory Usage

- [ ] App doesn't consume excessive memory
- [ ] Memory usage stays stable during gameplay
- [ ] No memory leaks after multiple games
- [ ] Check device memory usage: Settings → About

### Battery Usage

- [ ] App doesn't drain battery rapidly
- [ ] No excessive CPU usage
- [ ] Device doesn't get hot during use

### Network (if applicable)

- [ ] App works offline
- [ ] No network errors
- [ ] No crashes due to network issues

---

## Accessibility Tests

### Touch Targets

- [ ] All buttons are at least 48dp × 48dp
- [ ] Buttons are easy to tap
- [ ] No accidental taps on nearby elements

### Text Readability

- [ ] All text is readable
- [ ] Font sizes are appropriate
- [ ] Text has sufficient contrast with background
- [ ] No text is cut off

### Screen Sizes

- [ ] App works on small phones (5-6 inches)
- [ ] App works on large phones (6-7 inches)
- [ ] App works on tablets (if applicable)
- [ ] Layout adapts to different orientations

### Notched Devices

- [ ] Content doesn't go under notch
- [ ] Safe area is respected
- [ ] No content is hidden

---

## Platform-Specific Tests

### iOS

- [ ] App works on iPhone 12 or later
- [ ] App works on iOS 14+
- [ ] Safe area handled correctly
- [ ] Home indicator area respected
- [ ] Haptic feedback works (if enabled)

### Android

- [ ] App works on Android 8.0+
- [ ] App works on various screen sizes
- [ ] Navigation gestures work
- [ ] Back button works correctly
- [ ] Haptic feedback works (if enabled)

### Web

- [ ] App works in Chrome
- [ ] App works in Safari
- [ ] App works in Firefox
- [ ] App works in Edge
- [ ] Responsive design works on desktop

---

## Bug Regression Tests

### Known Issues Fixed

- [ ] Multiple navigations to completion screen fixed
- [ ] Play Again button works smoothly
- [ ] Sound errors don't crash app
- [ ] Best scores save correctly

### Common Issues

- [ ] No console errors
- [ ] No unhandled promise rejections
- [ ] No memory leaks
- [ ] No infinite loops

---

## Final Sign-Off

### All Tests Passed

- [ ] All core functionality tests passed
- [ ] All interaction tests passed
- [ ] All performance tests passed
- [ ] All platform tests passed
- [ ] No critical bugs remaining
- [ ] No console errors

### Ready for Production

- [ ] Code quality verified (npm run check)
- [ ] Linting passed (npm run lint)
- [ ] Unit tests passed (npm run test)
- [ ] Manual testing completed
- [ ] Documentation is complete
- [ ] App version updated

### Sign-Off

- **Tested By**: ________________
- **Date**: ________________
- **Device(s)**: ________________
- **Notes**: ________________

---

## Test Execution Log

Use this section to log your test runs:

| Date | Tester | Platform | Result | Notes |
|------|--------|----------|--------|-------|
| | | iOS | PASS/FAIL | |
| | | Android | PASS/FAIL | |
| | | Web | PASS/FAIL | |

---

For detailed information, see [PRODUCTION_READINESS.md](./PRODUCTION_READINESS.md)
