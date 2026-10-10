/**
 * LUMA SWEETS: PUZZLE GARDEN
 * User Interface & Rendering Engine
 */

const UI = {
  currentScreen: "home",
  candySvgs: {},

  init() {
    this.initCandySvgDefs();
    this.bindGlobalEvents();
    this.updateTopbarStats();
    this.updateBoosterCounts();
  },

  // Switch displayed view
  switchScreen(screenName) {
    this.currentScreen = screenName;
    document.querySelectorAll(".screen").forEach(el => el.classList.remove("active"));
    const target = document.getElementById(`screen-${screenName}`);
    if (target) {
      target.classList.add("active");
    }

    // Toggle global top stats bar: show on home & map, hide on game screen so HUD is unobstructed
    const topBar = document.querySelector(".top-stats-bar");
    if (topBar) {
      topBar.style.display = screenName === "game" ? "none" : "flex";
    }

    if (screenName === "map") {
      LevelMap.renderMap();
    }
  },

  updateTopbarStats() {
    const coins = StorageManager.getCoins();
    document.querySelectorAll(".stat-coins-value").forEach(el => {
      el.textContent = coins.toLocaleString();
    });

    const totalStars = Object.values(StorageManager.data.levelStars).reduce((a, b) => a + b, 0);
    document.querySelectorAll(".stat-stars-value").forEach(el => {
      el.textContent = totalStars;
    });
  },

  updateBoosterCounts() {
    ["hammer", "shuffle", "rainbow", "moves"].forEach(bId => {
      const count = StorageManager.getBoosterCount(bId);
      const badge = document.getElementById(`booster-count-${bId}`);
      if (badge) {
        badge.textContent = count;
      }
    });
  },

  setBoosterTargetingMode(boosterId) {
    const boardEl = document.getElementById("game-board");
    if (boardEl) {
      boardEl.classList.add(`targeting-${boosterId}`);
    }
    document.querySelectorAll(".booster-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.booster === boosterId);
    });
  },

  clearBoosterTargetingMode() {
    const boardEl = document.getElementById("game-board");
    if (boardEl) {
      boardEl.classList.remove("targeting-hammer", "targeting-rainbow");
    }
    document.querySelectorAll(".booster-btn").forEach(btn => btn.classList.remove("active"));
  },

  // Generates inline SVGs for candy types with pristine 3D casual game look
  initCandySvgDefs() {
    this.candySvgs = {
      star: `
        <svg viewBox="0 0 64 64" class="candy-svg">
          <defs>
            <linearGradient id="grad-star" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFF5A0" />
              <stop offset="45%" stop-color="#FFD13B" />
              <stop offset="100%" stop-color="#D49A00" />
            </linearGradient>
            <filter id="glow-star" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#805600" flood-opacity="0.4" />
            </filter>
          </defs>
          <polygon points="32,4 40,22 60,24 45,38 49,58 32,48 15,58 19,38 4,24 24,22" fill="url(#grad-star)" filter="url(#glow-star)" />
          <polygon points="32,10 38,24 52,26 41,36 44,51 32,44 20,51 23,36 12,26 26,24" fill="#FFE875" opacity="0.6" />
          <circle cx="28" cy="22" r="4" fill="#FFFFFF" opacity="0.8" />
        </svg>
      `,
      berry: `
        <svg viewBox="0 0 64 64" class="candy-svg">
          <defs>
            <radialGradient id="grad-berry" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stop-color="#FFA2BE" />
              <stop offset="50%" stop-color="#FF2E74" />
              <stop offset="100%" stop-color="#A50036" />
            </radialGradient>
          </defs>
          <path d="M32,6 C16,6 10,24 10,38 C10,52 20,60 32,60 C44,60 54,52 54,38 C54,24 48,6 32,6 Z" fill="url(#grad-berry)" />
          <ellipse cx="26" cy="22" rx="6" ry="10" fill="#FFFFFF" opacity="0.6" transform="rotate(-20 26 22)" />
          <circle cx="38" cy="38" r="2.5" fill="#FFFFFF" opacity="0.4" />
        </svg>
      `,
      mint: `
        <svg viewBox="0 0 64 64" class="candy-svg">
          <defs>
            <linearGradient id="grad-mint" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#85FFD7" />
              <stop offset="50%" stop-color="#00E59B" />
              <stop offset="100%" stop-color="#008055" />
            </linearGradient>
          </defs>
          <polygon points="32,6 58,32 32,58 6,32" fill="url(#grad-mint)" />
          <polygon points="32,14 50,32 32,50 14,32" fill="#3DFFB9" opacity="0.5" />
          <ellipse cx="28" cy="24" rx="4" ry="7" fill="#FFFFFF" opacity="0.75" transform="rotate(45 28 24)" />
        </svg>
      `,
      lemon: `
        <svg viewBox="0 0 64 64" class="candy-svg">
          <defs>
            <radialGradient id="grad-lemon" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stop-color="#FFE4A0" />
              <stop offset="55%" stop-color="#FF9F1C" />
              <stop offset="100%" stop-color="#B86200" />
            </radialGradient>
          </defs>
          <circle cx="32" cy="32" r="26" fill="url(#grad-lemon)" />
          <ellipse cx="24" cy="22" rx="7" ry="5" fill="#FFFFFF" opacity="0.7" transform="rotate(-15 24 22)" />
          <path d="M14,32 A18,18 0 0,0 50,32" stroke="#FFCF70" stroke-width="3" fill="none" opacity="0.5" />
        </svg>
      `,
      grape: `
        <svg viewBox="0 0 64 64" class="candy-svg">
          <defs>
            <radialGradient id="grad-grape" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stop-color="#E2B6FF" />
              <stop offset="55%" stop-color="#A259FF" />
              <stop offset="100%" stop-color="#5512A6" />
            </radialGradient>
          </defs>
          <rect x="10" y="10" width="44" height="44" rx="14" fill="url(#grad-grape)" />
          <circle cx="32" cy="32" r="12" fill="#BF7DFF" opacity="0.5" />
          <ellipse cx="24" cy="22" rx="5" ry="4" fill="#FFFFFF" opacity="0.75" />
        </svg>
      `,
      azure: `
        <svg viewBox="0 0 64 64" class="candy-svg">
          <defs>
            <linearGradient id="grad-azure" x1="15%" y1="0%" x2="85%" y2="100%">
              <stop offset="0%" stop-color="#A8F4FF" />
              <stop offset="50%" stop-color="#00D2FF" />
              <stop offset="100%" stop-color="#006A9C" />
            </linearGradient>
          </defs>
          <polygon points="32,6 54,20 54,46 32,58 10,46 10,20" fill="url(#grad-azure)" />
          <polygon points="32,12 48,22 48,42 32,52 16,42 16,22" fill="#5CE3FF" opacity="0.5" />
          <ellipse cx="26" cy="22" rx="5" ry="3" fill="#FFFFFF" opacity="0.8" />
        </svg>
      `,
      rainbow: `
        <svg viewBox="0 0 64 64" class="candy-svg rainbow-svg">
          <defs>
            <radialGradient id="grad-rainbow-core" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stop-color="#FFFFFF" />
              <stop offset="30%" stop-color="#FFF066" />
              <stop offset="55%" stop-color="#FF3B80" />
              <stop offset="80%" stop-color="#7B2CBF" />
              <stop offset="100%" stop-color="#1A0933" />
            </radialGradient>
          </defs>
          <circle cx="32" cy="32" r="27" fill="url(#grad-rainbow-core)" />
          <circle cx="20" cy="22" r="3" fill="#00E59B" />
          <circle cx="42" cy="20" r="3" fill="#FFD13B" />
          <circle cx="44" cy="40" r="3" fill="#00D2FF" />
          <circle cx="22" cy="42" r="3" fill="#FF2E74" />
          <polygon points="32,16 35,28 47,32 35,36 32,48 29,36 17,32 29,28" fill="#FFFFFF" opacity="0.85" />
        </svg>
      `,
      chocolate: `
        <svg viewBox="0 0 64 64" class="candy-svg blocker-svg">
          <defs>
            <linearGradient id="grad-choco" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#8D5524" />
              <stop offset="50%" stop-color="#5C310D" />
              <stop offset="100%" stop-color="#381D06" />
            </linearGradient>
          </defs>
          <rect x="6" y="6" width="52" height="52" rx="8" fill="url(#grad-choco)" />
          <rect x="12" y="12" width="18" height="18" rx="3" fill="#754117" />
          <rect x="34" y="12" width="18" height="18" rx="3" fill="#754117" />
          <rect x="12" y="34" width="18" height="18" rx="3" fill="#754117" />
          <rect x="34" y="34" width="18" height="18" rx="3" fill="#754117" />
          <line x1="8" y1="32" x2="56" y2="32" stroke="#2B1403" stroke-width="2" />
          <line x1="32" y1="8" x2="32" y2="56" stroke="#2B1403" stroke-width="2" />
        </svg>
      `
    };
  },

  // Render the entire 8x8 Board
  renderBoardGrid(board, gameInstance) {
    if (!this.candySvgs || Object.keys(this.candySvgs).length === 0) {
      this.initCandySvgDefs();
    }
    const boardEl = document.getElementById("game-board");
    if (!boardEl) return;

    boardEl.innerHTML = "";
    boardEl.style.gridTemplateColumns = `repeat(${board.cols}, 1fr)`;
    boardEl.style.gridTemplateRows = `repeat(${board.rows}, 1fr)`;

    for (let r = 0; r < board.rows; r++) {
      for (let c = 0; c < board.cols; c++) {
        const cellEl = document.createElement("div");
        cellEl.className = "board-cell";
        cellEl.id = `cell-${r}-${c}`;
        cellEl.dataset.row = r;
        cellEl.dataset.col = c;

        // Frosted jelly layer beneath
        const jellyLayer = board.jellies[r][c];
        if (jellyLayer > 0) {
          const jellyEl = document.createElement("div");
          jellyEl.className = `jelly-tile layer-${jellyLayer}`;
          cellEl.appendChild(jellyEl);
        }

        // Candy piece or blocker
        const piece = board.grid[r][c];
        if (piece) {
          const pieceEl = this.createPieceElement(piece, r, c);
          cellEl.appendChild(pieceEl);
        }

        // Tap/click handler
        cellEl.addEventListener("click", () => {
          gameInstance.handleCellClick(r, c);
        });

        // Touch drag support
        this.attachSwipeListeners(cellEl, r, c, gameInstance);

        boardEl.appendChild(cellEl);
      }
    }
  },

  createPieceElement(piece, r, c) {
    const el = document.createElement("div");
    el.className = "candy-piece";
    el.id = piece.id;
    el.dataset.type = piece.type;
    el.dataset.row = r;
    el.dataset.col = c;

    if (piece.isBlocker) {
      el.classList.add("blocker-piece", piece.blockerType);
      el.innerHTML = this.candySvgs[piece.blockerType] || this.candySvgs.chocolate;
      return el;
    }

    if (piece.special) {
      el.classList.add(`special-${piece.special}`);
    }

    const svgMarkup = piece.special === CONFIG.SPECIAL.COLOR_BOMB
      ? this.candySvgs.rainbow
      : (this.candySvgs[piece.type] || this.candySvgs.star);

    el.innerHTML = svgMarkup;

    // Special candy overlays (stripes / wrapped glow)
    if (piece.special === CONFIG.SPECIAL.STRIPED_H) {
      el.innerHTML += `<div class="stripe-overlay horizontal"></div>`;
    } else if (piece.special === CONFIG.SPECIAL.STRIPED_V) {
      el.innerHTML += `<div class="stripe-overlay vertical"></div>`;
    } else if (piece.special === CONFIG.SPECIAL.WRAPPED) {
      el.innerHTML += `<div class="wrapped-glow"></div>`;
    }

    return el;
  },

  attachSwipeListeners(cellEl, r, c, gameInstance) {
    let touchStartX = 0;
    let touchStartY = 0;

    cellEl.addEventListener("touchstart", (e) => {
      const touch = e.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    }, { passive: true });

    cellEl.addEventListener("touchend", (e) => {
      if (gameInstance.isProcessing || gameInstance.isGameOver) return;
      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStartX;
      const deltaY = touch.clientY - touchStartY;
      const minDistance = 25; // min swipe threshold

      if (Math.abs(deltaX) > minDistance || Math.abs(deltaY) > minDistance) {
        let targetR = r;
        let targetC = c;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          // Horizontal swap
          targetC += (deltaX > 0) ? 1 : -1;
        } else {
          // Vertical swap
          targetR += (deltaY > 0) ? 1 : -1;
        }

        if (targetR >= 0 && targetR < gameInstance.board.rows && targetC >= 0 && targetC < gameInstance.board.cols) {
          gameInstance.attemptSwap(r, c, targetR, targetC);
        }
      }
    }, { passive: true });
  },

  highlightSelectedCell(r, c) {
    this.clearSelectedHighlight();
    const cellEl = document.getElementById(`cell-${r}-${c}`);
    if (cellEl) {
      cellEl.classList.add("selected-cell");
    }
  },

  clearSelectedHighlight() {
    document.querySelectorAll(".selected-cell").forEach(el => el.classList.remove("selected-cell"));
  },

  // Update Game HUD counters and progress
  updateGameHud(gameInstance) {
    const lvl = gameInstance.currentLevel;

    // Level Title
    const titleText = typeof lvl.id === "number" ? `Level ${lvl.id}` : lvl.title;
    document.getElementById("hud-level-title").textContent = titleText;

    // Moves Left
    const movesEl = document.getElementById("hud-moves-value");
    if (movesEl) {
      movesEl.textContent = gameInstance.movesLeft;
      movesEl.classList.toggle("low-moves", gameInstance.movesLeft <= 5);
    }

    // Score & Stars
    document.getElementById("hud-score-value").textContent = gameInstance.score.toLocaleString();

    const starThresholds = lvl.stars;
    const maxScore = starThresholds[2];
    const progressPercent = Math.min(100, Math.floor((gameInstance.score / maxScore) * 100));
    document.getElementById("hud-progress-fill").style.width = `${progressPercent}%`;

    // Stars Icons
    for (let s = 1; s <= 3; s++) {
      const starEl = document.getElementById(`hud-star-${s}`);
      if (starEl) {
        starEl.classList.toggle("earned", gameInstance.score >= starThresholds[s - 1]);
      }
    }

    // Objectives Box
    const objContainer = document.getElementById("hud-objectives");
    if (objContainer) {
      objContainer.innerHTML = "";

      // Jelly Objective
      if (lvl.objectiveType === "jelly" || lvl.objectiveType === "hybrid" || lvl.jellies) {
        const item = document.createElement("div");
        item.className = "obj-item";
        item.innerHTML = `
          <span class="obj-icon">🧊</span>
          <span class="obj-val">${gameInstance.objectives.jelliesRemaining}</span>
        `;
        objContainer.appendChild(item);
      }

      // Chocolate Objective
      if (lvl.objectiveType === "chocolate" || lvl.objectiveType === "hybrid" || lvl.chocolates) {
        const item = document.createElement("div");
        item.className = "obj-item";
        item.innerHTML = `
          <span class="obj-icon">🍫</span>
          <span class="obj-val">${gameInstance.objectives.chocolatesRemaining}</span>
        `;
        objContainer.appendChild(item);
      }

      // Collection Objectives
      if (lvl.collectTargets) {
        for (const [type, remaining] of Object.entries(gameInstance.objectives.collected)) {
          const item = document.createElement("div");
          item.className = "obj-item";
          const candyInfo = CONFIG.CANDIES.find(c => c.id === type);
          item.innerHTML = `
            <span class="obj-icon" style="color: ${candyInfo?.color || '#fff'}">${candyInfo?.icon || '🍬'}</span>
            <span class="obj-val">${remaining}</span>
          `;
          objContainer.appendChild(item);
        }
      }

      // Target Score Only
      if (lvl.objectiveType === "score") {
        const item = document.createElement("div");
        item.className = "obj-item";
        item.innerHTML = `
          <span class="obj-icon">🎯</span>
          <span class="obj-val">${lvl.targetScore.toLocaleString()}</span>
        `;
        objContainer.appendChild(item);
      }
    }
  },

  // Visual Animations
  async animateSwap(r1, c1, r2, c2) {
    const el1 = document.getElementById(`cell-${r1}-${c1}`)?.querySelector(".candy-piece");
    const el2 = document.getElementById(`cell-${r2}-${c2}`)?.querySelector(".candy-piece");
    if (!el1 || !el2) return;

    const dx = (c2 - c1) * 100;
    const dy = (r2 - r1) * 100;

    el1.style.transition = "transform 0.18s cubic-bezier(0.2, 0, 0.4, 1)";
    el2.style.transition = "transform 0.18s cubic-bezier(0.2, 0, 0.4, 1)";
    el1.style.transform = `translate(${dx}%, ${dy}%)`;
    el2.style.transform = `translate(${-dx}%, ${-dy}%)`;

    await new Promise(res => setTimeout(res, 190));
    el1.style.transition = "";
    el2.style.transition = "";
    el1.style.transform = "";
    el2.style.transform = "";
  },

  async animateMatches(coords) {
    coords.forEach(({ r, c }) => {
      const cell = document.getElementById(`cell-${r}-${c}`);
      const piece = cell?.querySelector(".candy-piece");
      if (piece) {
        piece.classList.add("matched-pop");
      }
    });
    await new Promise(res => setTimeout(res, 220));
  },

  async animateDrops(drops) {
    await new Promise(res => setTimeout(res, 190));
  },

  triggerScreenShake() {
    const boardEl = document.getElementById("game-board");
    if (boardEl && !StorageManager.data.settings.reducedMotion) {
      boardEl.classList.remove("screen-shake");
      void boardEl.offsetWidth; // trigger reflow
      boardEl.classList.add("screen-shake");
    }
  },

  showPraiseMessage(text) {
    const popup = document.createElement("div");
    popup.className = "praise-popup";
    popup.textContent = text;
    document.getElementById("screen-game").appendChild(popup);
    setTimeout(() => popup.remove(), 1200);
  },

  showToast(message) {
    let toast = document.getElementById("game-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "game-toast";
      toast.className = "game-toast";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2200);
  },

  // Modals
  showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add("active");
  },

  hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove("active");
  },

  showLevelPreviewModal(levelId) {
    try {
      const lvl = typeof levelId === "number"
        ? (LEVELS_DATA.find(l => l.id === levelId) || LEVELS_DATA[0])
        : (levelId === "daily" ? RewardsManager.getDailyChallengeLevel() : LEVELS_DATA[0]);
      if (!lvl) {
        Game.startLevel(levelId || 1);
        this.switchScreen("game");
        return;
      }

      const badge = document.getElementById("preview-level-badge");
      if (badge) badge.textContent = typeof lvl.id === "number" ? `Level ${lvl.id}` : "Special Level";
      const title = document.getElementById("preview-level-title");
      if (title) title.textContent = lvl.title;
      const desc = document.getElementById("preview-level-desc");
      if (desc) desc.textContent = lvl.description || "Match candies to reach target score!";
      const moves = document.getElementById("preview-moves-value");
      if (moves) moves.textContent = `${lvl.moves} Moves`;
      const targetScore = (lvl.stars && lvl.stars[0]) ? lvl.stars[0] : (lvl.targetScore || 1500);
      const scoreEl = document.getElementById("preview-score-value");
      if (scoreEl) scoreEl.textContent = `Target: ${targetScore.toLocaleString()}`;

      const bestScore = StorageManager.getHighScore(lvl.id);
      const bestEl = document.getElementById("preview-best-score");
      if (bestEl) bestEl.textContent = bestScore ? `Best: ${bestScore.toLocaleString()}` : "Not played yet";

      const stars = StorageManager.getLevelStars(lvl.id);
      for (let s = 1; s <= 3; s++) {
        const starEl = document.getElementById(`preview-star-${s}`);
        if (starEl) starEl.classList.toggle("earned", stars >= s);
      }

      const playBtn = document.getElementById("btn-preview-play");
      if (playBtn) {
        playBtn.textContent = "START LEVEL";
        playBtn.onclick = (e) => {
          e?.preventDefault();
          try { Sound.playButton(); } catch (_) {}
          this.hideModal("modal-level-preview");
          Game.startLevel(lvl.id);
          this.switchScreen("game");
        };
      }

      this.showModal("modal-level-preview");
    } catch (err) {
      console.error("showLevelPreviewModal error, fallback to direct game start:", err);
      Game.startLevel(levelId || 1);
      this.switchScreen("game");
    }
  },

  showVictoryModal(gameInstance) {
    document.getElementById("victory-score-value").textContent = gameInstance.score.toLocaleString();

    for (let s = 1; s <= 3; s++) {
      const star = document.getElementById(`victory-star-${s}`);
      star.classList.remove("earned", "animated");
      if (gameInstance.starsEarned >= s) {
        setTimeout(() => {
          star.classList.add("earned", "animated");
        }, s * 220);
      }
    }

    const isDaily = gameInstance.currentLevel.id === "daily";
    const nextBtn = document.getElementById("btn-victory-next");

    if (!isDaily && typeof gameInstance.currentLevel.id === "number") {
      const nextLevelId = gameInstance.currentLevel.id + 1;
      if (nextLevelId <= 30) {
        nextBtn.style.display = "inline-flex";
        nextBtn.textContent = "NEXT LEVEL";
        nextBtn.onclick = () => {
          Sound.playButton();
          this.hideModal("modal-victory");
          Game.startLevel(nextLevelId);
          this.switchScreen("game");
        };
      } else {
        nextBtn.style.display = "none";
      }
    } else {
      // Daily level completed
      nextBtn.style.display = "inline-flex";
      nextBtn.textContent = "GARDEN MAP";
      nextBtn.onclick = () => {
        Sound.playButton();
        this.hideModal("modal-victory");
        this.switchScreen("map");
      };
    }

    this.showModal("modal-victory");
  },

  showDefeatModal(gameInstance) {
    document.getElementById("defeat-score-value").textContent = gameInstance.score.toLocaleString();
    this.showModal("modal-defeat");
  },

  showDailyRewardsModal() {
    const list = RewardsManager.getDailyRewardsList();
    const status = StorageManager.getDailyRewardStatus();
    const container = document.getElementById("daily-rewards-container");
    container.innerHTML = "";

    list.forEach(item => {
      const card = document.createElement("div");
      const isPast = item.day < status.streak;
      const isToday = item.day === status.streak;

      card.className = `daily-card ${isPast ? 'claimed' : ''} ${isToday ? 'active-today' : ''}`;
      card.innerHTML = `
        <div class="daily-day">${item.title}</div>
        <div class="daily-icon">${item.icon}</div>
        <div class="daily-desc">${item.desc}</div>
        ${isPast ? '<div class="daily-check">✓</div>' : ''}
      `;
      container.appendChild(card);
    });

    const claimBtn = document.getElementById("btn-claim-daily");
    claimBtn.disabled = !status.canClaim;
    claimBtn.textContent = status.canClaim ? "CLAIM DAILY GIFT" : "ALREADY CLAIMED TODAY";

    this.showModal("modal-daily");
  },

  bindGlobalEvents() {
    // Navigation Buttons
    const onPlayPressed = (e) => {
      e?.preventDefault();
      try { Sound.playButton(); } catch (_) {}
      const currentLevel = (StorageManager && StorageManager.data && StorageManager.data.unlockedLevel)
        ? StorageManager.data.unlockedLevel
        : 1;
      this.showLevelPreviewModal(currentLevel);
    };

    const homePlayBtn = document.getElementById("btn-home-play");
    if (homePlayBtn) {
      homePlayBtn.addEventListener("click", onPlayPressed);
    }

    document.getElementById("btn-home-newgame")?.addEventListener("click", (e) => {
      e?.preventDefault();
      try { Sound.playButton(); } catch (_) {}
      Game.startLevel(1);
      this.switchScreen("game");
    });

    document.getElementById("btn-home-map")?.addEventListener("click", () => {
      Sound.playButton();
      this.switchScreen("map");
    });

    document.getElementById("btn-home-daily")?.addEventListener("click", () => {
      Sound.playButton();
      Game.startLevel("daily");
      this.switchScreen("game");
    });

    document.getElementById("btn-home-rewards")?.addEventListener("click", () => {
      Sound.playButton();
      this.showDailyRewardsModal();
    });

    document.getElementById("btn-home-settings")?.addEventListener("click", () => {
      Sound.playButton();
      this.populateSettings();
      this.showModal("modal-settings");
    });

    document.getElementById("btn-home-howtoplay")?.addEventListener("click", () => {
      Sound.playButton();
      this.showModal("modal-howtoplay");
    });

    document.getElementById("btn-home-about")?.addEventListener("click", () => {
      Sound.playButton();
      this.showModal("modal-about");
    });

    document.getElementById("btn-home-privacy")?.addEventListener("click", () => {
      Sound.playButton();
      this.showModal("modal-privacy");
    });

    // Map Back
    document.getElementById("btn-map-back")?.addEventListener("click", () => {
      Sound.playButton();
      this.switchScreen("home");
    });

    // In-game Pause & Booster clicks
    document.getElementById("btn-game-pause")?.addEventListener("click", () => {
      Sound.playButton();
      this.showModal("modal-pause");
    });

    ["hammer", "shuffle", "rainbow", "moves"].forEach(bId => {
      document.getElementById(`booster-btn-${bId}`)?.addEventListener("click", () => {
        Sound.playButton();
        BoosterManager.activate(bId, Game);
      });
    });

    // Victory Modals
    document.getElementById("btn-victory-replay")?.addEventListener("click", () => {
      Sound.playButton();
      this.hideModal("modal-victory");
      Game.startLevel(Game.currentLevel.id);
      this.switchScreen("game");
    });

    document.getElementById("btn-victory-map")?.addEventListener("click", () => {
      Sound.playButton();
      this.hideModal("modal-victory");
      this.switchScreen("map");
    });

    // Defeat Modals
    document.getElementById("btn-defeat-retry")?.addEventListener("click", () => {
      Sound.playButton();
      this.hideModal("modal-defeat");
      Game.startLevel(Game.currentLevel.id);
      this.switchScreen("game");
    });

    document.getElementById("btn-defeat-buymoves")?.addEventListener("click", () => {
      Sound.playButton();
      if (StorageManager.spendCoins(100)) {
        this.hideModal("modal-defeat");
        Game.movesLeft += 5;
        Game.isGameOver = false;
        Game.isProcessing = false;
        this.updateTopbarStats();
        this.updateGameHud(Game);
        this.showToast("+5 Moves Added!");
      } else {
        this.showToast("Not enough sweet coins (need 100)!");
      }
    });

    document.getElementById("btn-defeat-map")?.addEventListener("click", () => {
      Sound.playButton();
      this.hideModal("modal-defeat");
      this.switchScreen("map");
    });

    // Pause Modals
    document.getElementById("btn-pause-resume")?.addEventListener("click", () => {
      Sound.playButton();
      this.hideModal("modal-pause");
    });

    document.getElementById("btn-pause-retry")?.addEventListener("click", () => {
      Sound.playButton();
      this.hideModal("modal-pause");
      Game.startLevel(Game.currentLevel.id);
      this.switchScreen("game");
    });

    document.getElementById("btn-pause-map")?.addEventListener("click", () => {
      Sound.playButton();
      this.hideModal("modal-pause");
      this.switchScreen("map");
    });

    // Claim Daily
    document.getElementById("btn-claim-daily")?.addEventListener("click", () => {
      const res = RewardsManager.claimToday();
      if (res.success) {
        this.updateTopbarStats();
        this.updateBoosterCounts();
        this.showDailyRewardsModal();
        this.showToast("Gift Claimed! Enjoy your rewards!");
      } else {
        this.showToast(res.reason);
      }
    });

    // Modal Close X Buttons
    document.querySelectorAll(".modal-close-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        Sound.playButton();
        const modal = e.target.closest(".modal");
        if (modal) modal.classList.remove("active");
      });
    });

    // Settings Inputs
    this.bindSettingsEvents();
  },

  populateSettings() {
    const s = StorageManager.data.settings;
    document.getElementById("setting-music-toggle").checked = s.musicEnabled && !s.masterMute;
    document.getElementById("setting-sfx-toggle").checked = s.sfxEnabled && !s.masterMute;
    document.getElementById("setting-music-vol").value = Math.floor(s.musicVolume * 100);
    document.getElementById("setting-sfx-vol").value = Math.floor(s.sfxVolume * 100);
    document.getElementById("setting-vibrate-toggle").checked = s.vibrate;
    document.getElementById("setting-motion-toggle").checked = s.reducedMotion;
  },

  bindSettingsEvents() {
    document.getElementById("setting-music-toggle")?.addEventListener("change", (e) => {
      StorageManager.updateSettings({ musicEnabled: e.target.checked });
      Sound.updateSettings({ musicEnabled: e.target.checked });
    });

    document.getElementById("setting-sfx-toggle")?.addEventListener("change", (e) => {
      StorageManager.updateSettings({ sfxEnabled: e.target.checked });
      Sound.updateSettings({ sfxEnabled: e.target.checked });
    });

    document.getElementById("setting-music-vol")?.addEventListener("input", (e) => {
      const val = parseFloat(e.target.value) / 100;
      StorageManager.updateSettings({ musicVolume: val });
      Sound.updateSettings({ musicVolume: val });
    });

    document.getElementById("setting-sfx-vol")?.addEventListener("input", (e) => {
      const val = parseFloat(e.target.value) / 100;
      StorageManager.updateSettings({ sfxVolume: val });
      Sound.updateSettings({ sfxVolume: val });
    });

    document.getElementById("setting-vibrate-toggle")?.addEventListener("change", (e) => {
      StorageManager.updateSettings({ vibrate: e.target.checked });
    });

    document.getElementById("setting-motion-toggle")?.addEventListener("change", (e) => {
      StorageManager.updateSettings({ reducedMotion: e.target.checked });
    });

    document.getElementById("btn-reset-progress")?.addEventListener("click", () => {
      if (confirm("Are you sure you want to reset all game progress? Unlocked levels and high scores will be cleared!")) {
        StorageManager.resetAllProgress();
        this.updateTopbarStats();
        this.updateBoosterCounts();
        this.showToast("All progress has been reset!");
        this.hideModal("modal-settings");
        this.switchScreen("home");
      }
    });
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = UI;
}
