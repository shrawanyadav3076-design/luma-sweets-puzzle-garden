# CHANGELOG

All notable changes to **Luma Sweets: Puzzle Garden** will be documented in this file.

## [1.0.0] - 2026-10-09

### Added
- **Core Match-3 Engine**:
  - Full 8x8 grid with 6 vibrant candy types and frosted jelly / chocolate blocker support.
  - Horizontal & vertical line match detection, cascade gravity drop, and new candy refills.
  - Smooth swap animations with rejection of invalid moves.
  - Board shuffle mechanism triggered whenever zero valid moves exist.
- **Special Candies & Combos**:
  - Striped Candies (Match 4): Horizontal and Vertical line clearing lasers.
  - Wrapped Candies (Match 5 T/L): 3x3 explosive blast radius.
  - Rainbow Star Color Bomb (Match 5 line): Clears all candies of chosen color.
  - Special candy combination synergies: Cross Laser, Super 3-Lane Beam, Mega 5x5 Bomb, and Supernova Board Clear.
- **Level Progression**:
  - 30 distinct handcrafted levels with balanced move limits and varying objectives (Score, Jellies, Chocolates, Collection, Hybrids).
  - Interactive Garden Pathway level map with star ratings (1-3 stars) and level preview dialogs.
- **Boosters & Player Tools**:
  - Lollipop Hammer (single piece/blocker smash).
  - Sweet Shuffle (board scrambling).
  - Rainbow Star Bomb (instant color bomb spawner).
  - +5 Extra Moves booster.
- **Audio & Sound Synthesis**:
  - Procedural Web Audio API sound generator (chimes, clicks, laser beams, explosions, victory fanfares).
  - Ambient looping background music in pentatonic celesta styling.
  - Independent volume controls, master mute, and persistent preferences.
- **Daily Rewards & Retention**:
  - 7-day login streak reward calendar with coin and booster payouts.
  - Procedurally generated Daily Challenge mode with date-based seeds.
- **UI & Accessibility**:
  - High-contrast visual symbols on all candies for colorblind accessibility.
  - Reduced-motion toggle and native vibration haptics.
- **PWA & Android Support**:
  - `manifest.webmanifest` and `sw.js` cache-first service worker for full offline support.
  - Android Jetpack Compose edge-to-edge hardware-accelerated WebView with JavaScript interface bridge.
