# Match & Remember - Mobile App Interface Design

## Overview
A calm, child-friendly card matching game for children ages 3-6. The app is fully offline, collects no data, and contains no ads or purchases. Designed for mobile portrait orientation (9:16) with one-handed usage in mind.

## Design Principles
- **Safe & Distraction-Free**: No ads, no external links, no in-app purchases
- **Child-Friendly**: Large touch targets (min 48dp), simple visuals, no reading required
- **Calm & Encouraging**: No timers, no penalties, no negative feedback
- **Offline-Only**: All content stored locally, no network required

## Color Palette
- **Primary**: `#6EB5A7` (soft teal/green)
- **Secondary**: `#F6C85F` (warm yellow)
- **Accent**: `#F19C79` (soft coral)
- **Background**: `#F7FBFF` (light blue-white)
- **Success**: `#8FD19E` (soft green)
- **Neutral**: `#E6ECEF` (light gray)

## Typography
- **Font Family**: Rounded sans-serif (system default with rounded style)
- **Heading Size**: 28-36sp
- **Body Size**: 16-20sp
- **Button Size**: 18-22sp
- **Style**: Large readable sizes, minimal text, avoid ALL CAPS

## Screen List & Layouts

### 1. Splash Screen
**Purpose**: Friendly welcome and brand moment

**Content**:
- Centered app logo (cute card/animal illustration)
- Soft fade-in animation (1-1.5s)
- Auto-navigate to Home after animation

**Layout**: Full-screen centered logo with background color

---

### 2. Home Screen
**Purpose**: Primary entry point - start playing

**Content**:
- Large centered "Play" button (rounded, primary color)
- Sound toggle icon (top-right corner)
- Subtle patterned backdrop (clouds/stars)

**Functionality**:
- Tap Play → Navigate to Category Selection
- Tap Sound → Toggle global sound on/off

**Layout**: Vertical center alignment with decorative background

---

### 3. Category Selection Screen
**Purpose**: Choose card theme (Animals, Shapes, Numbers)

**Content**:
- Three large category cards in vertical stack or grid:
  - **Animals** (soft green background, animal icon)
  - **Shapes & Colors** (soft blue background, shapes icon)
  - **Numbers** (soft purple background, number icon)
- Back button (top-left)

**Functionality**:
- Tap category card → Save selection to AsyncStorage → Navigate to Difficulty Selection

**Layout**: Vertical stack or 1-column grid with generous spacing

---

### 4. Difficulty Selection Screen
**Purpose**: Choose board size (Easy, Medium, Hard)

**Content**:
- Three difficulty options with grid previews:
  - **Easy**: 2×2 grid (4 cards, 2 pairs)
  - **Medium**: 3×4 grid (12 cards, 6 pairs)
  - **Hard**: 4×4 grid (16 cards, 8 pairs)
- Each option shows a small visual preview of the grid
- Back button (top-left)

**Functionality**:
- Tap difficulty → Save selection to AsyncStorage → Navigate to Game Board

**Layout**: Horizontal or vertical segmented buttons with grid previews

---

### 5. Game Board Screen
**Purpose**: Main gameplay area - flip cards to find matches

**Content**:
- **Top Bar**:
  - Home icon (top-left) → Navigate to Home
  - Sound toggle icon (top-right)
- **Grid Layout**:
  - Cards arranged in grid based on difficulty (2×2, 3×4, or 4×4)
  - Each card: rounded corners, soft shadow, face-down by default
  - Consistent spacing (12-18dp gutter)
  - Minimum touch target: 48dp

**Functionality**:
- Tap card → Flip face-up with animation
- When two cards flipped:
  - If match: Keep face-up, add gentle bounce/scale animation, play success sound
  - If no match: Wait 600-800ms, flip both back face-down
- Disable input during match checking
- When all pairs matched → Navigate to Completion Screen

**Card State Model**:
- `id`: Unique identifier
- `value`: Card content (animal/shape/number)
- `isFlipped`: Currently face-up
- `isMatched`: Successfully matched and locked

**Layout**: Centered grid with top navigation bar

---

### 6. Completion Screen
**Purpose**: Celebrate success and allow replay

**Content**:
- Large friendly message: "Great Job!" or "You Did It!"
- Soft confetti or star animation
- Two action buttons:
  - **Play Again** → Reset board, reshuffle, navigate to Game Board
  - **Home** → Navigate to Home Screen

**Functionality**:
- Tap Play Again → Restart with same category/difficulty
- Tap Home → Return to Home Screen

**Layout**: Vertical center alignment with celebration animation overlay

---

## Key User Flows

### First-Time Play Flow
1. **Splash Screen** (auto, 1.5s) → **Home Screen**
2. Tap "Play" → **Category Selection**
3. Select category (e.g., Animals) → **Difficulty Selection**
4. Select difficulty (e.g., Easy) → **Game Board**
5. Play game (flip cards, find matches) → **Completion Screen**
6. Tap "Play Again" or "Home"

### Returning Player Flow
1. **Splash Screen** (auto, 1.5s) → **Home Screen**
2. Tap "Play" → **Category Selection** (previous selection remembered)
3. Select category → **Difficulty Selection** (previous selection remembered)
4. Play game → Complete → Replay or return Home

---

## Visual Style

### Shapes & Patterns
- **Rounded Everywhere**: All cards, buttons, icons have rounded corners
- **Soft Shadows**: Subtle elevation for cards and buttons
- **Simple Illustrations**: Flat, cute, minimal detail (animals, shapes, numbers)

### Animations
- **Card Flip**: Slow, smooth 3D flip (450ms, ease-out)
- **Match Success**: Gentle scale/bounce (300ms)
- **Mismatch**: Flip back after 700ms delay
- **Completion**: Light confetti/stars (1200ms)

### Touch Targets
- Minimum 48dp for all interactive elements
- Cards: 60-80dp depending on grid size
- Buttons: 48-56dp height

---

## Interaction Rules

### Card Flipping
- Maximum 2 cards flipped simultaneously
- Ignore taps on already-matched cards
- Block input during match checking (600-800ms)

### Sound Behavior
- **On Match**: Gentle positive sound (optional)
- **On Flip**: Soft flip sound (optional)
- **On Mismatch**: No negative sound (silent)
- **Global Toggle**: Available on Home and Game Board screens

---

## Accessibility

- **Touch Targets**: ≥48dp for all interactive elements
- **Contrast**: High contrast between card faces and background
- **Motion**: Slow, smooth animations; option to reduce motion if needed
- **Readability**: Minimal text, large readable labels for parents

---

## Assets Required

### App Icon
- Rounded style, friendly animal/card illustration
- No text, simple iconic design
- Square aspect ratio, fills entire frame

### Category Icons
- **Animals**: Cute animal face (e.g., bear, cat, dog)
- **Shapes & Colors**: Geometric shapes (circle, square, triangle)
- **Numbers**: Stylized number (e.g., "123")

### Card Face Artwork
- **Animals**: 16 unique cute animal illustrations (bear, cat, dog, elephant, etc.)
- **Shapes & Colors**: 16 unique shape/color combinations
- **Numbers**: 10 unique number illustrations (0-9, styled for kids)

### Background Patterns
- Subtle clouds or stars pattern for Home Screen
- Minimal, non-distracting

### Celebration Assets
- Confetti or star particles for Completion Screen
- Soft, colorful, joyful

---

## Technical Notes

### State Management
- Use React Context + AsyncStorage for:
  - Selected category
  - Selected difficulty
  - Sound on/off preference
  - Game state (card positions, flipped, matched)

### Navigation
- Expo Router with stack navigation
- Screens: Splash, Home, Category, Difficulty, GameBoard, Completion

### Data Structure
```typescript
type Category = 'animals' | 'shapes' | 'numbers';
type Difficulty = 'easy' | 'medium' | 'hard';

type Card = {
  id: string;
  value: string; // asset identifier
  isFlipped: boolean;
  isMatched: boolean;
};

type GameState = {
  category: Category;
  difficulty: Difficulty;
  cards: Card[];
  selectedCards: string[]; // IDs of currently flipped cards
  matchedPairs: number;
};
```

### Game Logic
1. **Setup**: Pick unique images based on difficulty, duplicate to create pairs, shuffle, assign to grid
2. **Play**: Flip cards on tap, check for match when 2 cards flipped
3. **Match**: If values equal, keep face-up and mark as matched
4. **Mismatch**: If values differ, flip back after delay
5. **Complete**: When all pairs matched, show completion screen

---

## Restrictions

- **No Ads**: No ad placeholders or ad-related code
- **No Accounts**: No login, signup, or social features
- **No External Links**: No webviews or external navigation
- **No Permissions**: No push notifications, location, camera, etc.
- **No Text-Heavy Screens**: Minimal text, focus on visuals and icons
