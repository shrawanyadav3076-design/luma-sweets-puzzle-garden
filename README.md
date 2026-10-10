# LUMA SWEETS: PUZZLE GARDEN

**Luma Sweets: Puzzle Garden** is a complete, polished, commercial-grade HTML5 and Android match-3 casual puzzle game. Players embark on a magical journey through a luminous candy garden, matching sparkling gems, detonating special striped and wrapped candies, smashing frosted jellies and chocolate barriers, collecting booster rewards, and completing 30 handcrafted levels.

---

## 🌸 Key Features

1. **Complete Match-3 Puzzle Core**:
   - 8x8 customizable board with 6 distinct candy types (Luma Star, Berry Drop, Mint Diamond, Lemon Bonbon, Grape Swirl, Azure Crystal).
   - Smooth piece swapping with automatic rejection & reversion of invalid moves.
   - Cascading gravity refills with combo score multipliers and dynamic praise feedback (*"SWEET!"*, *"DIVINE!"*, *"SUGAR CRUSH!"*).
   - Stalemate detection: board automatically detects when zero moves are available and shuffles smoothly.

2. **Special Candies & Combos**:
   - **Striped Candy (Match 4)**: Clears entire horizontal row or vertical column with laser beams.
   - **Wrapped Spark Gem (T/L shape, Match 5)**: Explodes in a 3x3 blast radius.
   - **Rainbow Star Bomb (Match 5 in a row)**: Obliterates all candies of any swapped color.
   - **Combo Reactions**:
     - *Striped + Striped*: Cross-laser clearing both row and column.
     - *Striped + Wrapped*: Giant 3-row & 3-column wide super beam.
     - *Wrapped + Wrapped*: Massive 5x5 explosion.
     - *Color Bomb + Striped/Wrapped*: Converts matching candies across the board and detonates all of them.
     - *Color Bomb + Color Bomb*: Supernova clearing the entire board.

3. **30 Handcrafted Starter Levels**:
   - Diverse objectives: Target Score, Frosted Jelly Clearing, Candy Collection, Chocolate Smash, and Hybrid boss milestones (Levels 10, 20, and 30).
   - Star rating system (1 to 3 stars per level) with persistent high scores.
   - Dynamic Level Map with a sinuous garden pathway, animated current level marker, star statuses, and level preview modals.

4. **Player Boosters & Tools**:
   - **Lollipop Hammer**: Smash any single piece or blocker instantly.
   - **Sweet Shuffle**: Scramble the board candies.
   - **Rainbow Bomb**: Instantly spawn a Color Bomb on any chosen piece.
   - **+5 Moves**: Add extra moves when close to victory.

5. **Engaging Daily Retention**:
   - 7-Day Daily Streak rewards calendar with coins and boosters.
   - Procedurally generated Daily Challenge level updated daily.

6. **Web Audio API Procedural Sound Engine**:
   - Fully synthesized melodic background music (ambient celesta pads in pentatonic scale).
   - High-fidelity sound effects: candy clicks, swap whooshes, harmonic chimes, explosive blasts, rainbow lasers, fanfares.
   - Settings sliders for Music Volume, SFX Volume, Master Mute, and Haptic Vibration.

7. **Android & PWA Ready**:
   - Native Android Edge-to-Edge WebView application with hardware acceleration and vibration haptics bridge.
   - PWA Service Worker (`sw.js`) with cache-first strategy for complete offline playability.
   - Web App Manifest (`manifest.webmanifest`) with standalone mobile app support.

---

## 📁 Project Structure

```
Luma-Sweets-Puzzle-Garden/
├── index.html                   # Game entry point
├── manifest.webmanifest         # PWA Manifest
├── sw.js                        # Offline Service Worker
├── README.md                    # Project documentation
├── CHANGELOG.md                 # Version release history
├── PRIVACY_POLICY_TEMPLATE.md   # Commercial privacy policy
├── RELEASE_CHECKLIST.md         # Production release checklist
├── css/
│   ├── style.css                # Primary UI & layout styles
│   └── animations.css           # Keyframe animations
├── js/
│   ├── config.js                # Game balance, candy definitions, costs
│   ├── audio.js                 # Web Audio procedural synthesis
│   ├── storage.js               # Safe localStorage persistence
│   ├── levels.js                # 30 handcrafted levels
│   ├── special-pieces.js        # Special candy combos & beams
│   ├── matching.js              # Match detection & move validation
│   ├── board.js                 # Board state & gravity engine
│   ├── boosters.js              # Hammer, shuffle, rainbow & extra moves
│   ├── rewards.js               # 7-day daily streak & daily challenge
│   ├── level-map.js             # Interactive 30-level garden pathway
│   ├── ui.js                    # Screen transitions & SVG candy rendering
│   ├── game.js                  # Match-3 game coordinator & Sugar Crush
│   └── main.js                  # Application bootstrap & Android bridge
└── assets/
    └── images/
        ├── background.jpg       # Enchanted candy garden backdrop
        ├── mascot.jpg           # Royal Luma mascot
        ├── icon-192.png         # 192x192 app icon
        └── icon-512.png         # 512x512 app icon
```

---

## 🚀 How to Run & Test

### Option 1: Android Build & Streaming Emulator
The app is preconfigured as a native Android project embedding the HTML5 engine inside a hardware-accelerated WebView with full edge-to-edge support:
```bash
gradle assembleDebug
```
The application will launch on your Android emulator or physical device.

### Option 2: Standalone Local Web Browser
To run in any modern desktop or mobile web browser:
1. Open terminal in the project directory:
   ```bash
   cd Luma-Sweets-Puzzle-Garden
   python3 -m http.server 8000
   ```
2. Open `http://localhost:8000` in Google Chrome, Safari, Firefox, or Microsoft Edge.

---

## 🛠️ How to Customize & Extend

- **Add New Levels**: Open `js/levels.js` and add an object with `id`, `title`, `moves`, `stars`, `objectiveType`, and targets.
- **Tune Game Balance / Economy**: Edit `js/config.js` to modify candy points, booster costs, or default coins.
- **Add New Candy Types**: Add new entries in `CONFIG.CANDIES` in `js/config.js` and provide vector graphics in `UI.initCandySvgDefs()` in `js/ui.js`.
