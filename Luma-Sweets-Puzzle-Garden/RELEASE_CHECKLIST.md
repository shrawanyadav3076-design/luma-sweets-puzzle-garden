# RELEASE CHECKLIST — LUMA SWEETS: PUZZLE GARDEN

Use this checklist before publishing **Luma Sweets: Puzzle Garden** to the Google Play Store, itch.io, Web portals, or PWA hosting.

---

## 🎮 1. Gameplay & Mechanics Verification
- [x] All 6 candy types spawn with distinct colors, shapes, and accessibility symbols.
- [x] Swapping adjacent candies triggers valid match detection.
- [x] Invalid swaps smoothly revert back to original positions without deducting moves.
- [x] Cascades drop correctly under gravity, filling all empty spaces.
- [x] 4-piece line match creates Striped Candy (Horizontal or Vertical).
- [x] 5-piece match creates Color Bomb Rainbow Star.
- [x] T-shape / L-shape match creates Wrapped Bomb.
- [x] Special combo synergies execute correctly (Cross laser, Giant beam, 5x5 Bomb, Supernova).
- [x] Frosted Jellies are damaged when matched upon.
- [x] Chocolate Bricks are destroyed when adjacent matches occur.
- [x] Auto-shuffle activates when zero valid moves remain.
- [x] Moves counter decrements on each valid move and never drops below zero.
- [x] Sugar Crush sequence triggers upon victory converting remaining moves into score bonuses.
- [x] Out of moves correctly shows Defeat dialog with retry and +5 moves options.

---

## 🗺️ 2. Progression & Content Quality
- [x] All 30 levels have individual configurations (moves, objectives, star goals).
- [x] Star calculations (1, 2, 3 stars) persist in local storage.
- [x] Levels 10, 20, and 30 act as milestone chapters with crowns.
- [x] Replay of completed levels updates high scores properly.
- [x] Daily Challenge mode generates a unique daily puzzle based on date seed.
- [x] 7-Day Daily Streak rewards calendar awards coins and boosters without double-claiming.

---

## 🔊 3. Audio & Haptics
- [x] Web Audio API procedural synthesizer initializes on first user touch.
- [x] Background ambient music plays smoothly and loops continuously.
- [x] Sound effects (clicks, whoosh, chimes, laser, explosion, victory fanfare) play at correct volumes.
- [x] Music and SFX volume sliders independently control audio gains.
- [x] Master Mute / toggle switches silence audio immediately.
- [x] Native Android vibration triggers when available and setting is enabled.

---

## 📱 4. Mobile & Display Responsiveness
- [x] Tested on standard mobile portrait viewport (360x780, 390x844, 412x915).
- [x] Touch swipe gesture and click-to-swap input methods work interchangeably.
- [x] Touch targets meet accessibility standards (minimum 48x48dp equivalent).
- [x] Scaled gracefully inside Android WebView with hardware acceleration.
- [x] Edge-to-edge system insets handled without layout clipping.

---

## 📦 5. Assets & Packaging
- [x] Adaptive Android app icons generated across all mipmap densities (mdpi to xxxhdpi).
- [x] High-resolution background and mascot artwork included.
- [x] `manifest.webmanifest` valid and points to real icons and start URL.
- [x] `sw.js` caches existing assets without 404 network errors.
- [x] `luma-sweets-project.zip` contains full source code and documentation.
- [x] `luma-sweets-html5.zip` contains standalone HTML5 package with `index.html` at root.
- [x] Privacy policy and licenses verified for commercial use.
