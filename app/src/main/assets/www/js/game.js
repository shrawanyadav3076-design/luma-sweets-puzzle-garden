/**
 * LUMA SWEETS: PUZZLE GARDEN
 * Core Match-3 Game Engine & Level Coordinator
 */

class Match3Game {
  constructor() {
    this.board = null;
    this.currentLevel = null;
    this.score = 0;
    this.movesLeft = 0;
    this.starsEarned = 0;
    this.isProcessing = false;
    this.isGameOver = false;

    // Objectives tracking
    this.objectives = {
      scoreMet: false,
      jelliesRemaining: 0,
      chocolatesRemaining: 0,
      collected: {} // { [candyType]: remainingToCollect }
    };

    // User Selection
    this.selectedCell = null; // { r, c }
    this.comboCount = 0;
  }

  startLevel(levelId) {
    const lvl = typeof levelId === "number"
      ? LEVELS_DATA.find(l => l.id === levelId) || LEVELS_DATA[0]
      : (levelId === "daily" ? RewardsManager.getDailyChallengeLevel() : LEVELS_DATA[0]);

    this.currentLevel = lvl;
    this.board = new Board(lvl);
    this.score = 0;
    this.movesLeft = lvl.moves;
    this.starsEarned = 0;
    this.isProcessing = false;
    this.isGameOver = false;
    this.comboCount = 0;
    this.selectedCell = null;

    // Initialize objectives
    this.objectives.jelliesRemaining = this.board.getRemainingJellies();
    this.objectives.chocolatesRemaining = this.board.getRemainingChocolates();
    this.objectives.collected = {};

    if (lvl.collectTargets) {
      for (const [type, count] of Object.entries(lvl.collectTargets)) {
        this.objectives.collected[type] = count;
      }
    }

    this.renderBoard();
    UI.updateGameHud(this);
    BoosterManager.cancel();
  }

  renderBoard() {
    UI.renderBoardGrid(this.board, this);
  }

  // Handle cell click / tap
  handleCellClick(r, c) {
    if (this.isProcessing || this.isGameOver) return;

    // If booster is active (hammer, rainbow)
    if (BoosterManager.activeBooster) {
      BoosterManager.handleTileClick(r, c, this);
      return;
    }

    const clickedPiece = this.board.grid[r][c];
    if (clickedPiece && clickedPiece.isBlocker) {
      Sound.playInvalidSwap();
      return;
    }

    if (!this.selectedCell) {
      // First selection
      this.selectedCell = { r, c };
      Sound.playCandySelect();
      UI.highlightSelectedCell(r, c);
    } else {
      // Second selection
      const prev = this.selectedCell;
      this.selectedCell = null;
      UI.clearSelectedHighlight();

      // If clicked same cell, deselect
      if (prev.r === r && prev.c === c) {
        return;
      }

      // Check adjacency
      const dist = Math.abs(prev.r - r) + Math.abs(prev.c - c);
      if (dist === 1) {
        this.attemptSwap(prev.r, prev.c, r, c);
      } else {
        // Select new cell instead
        this.selectedCell = { r, c };
        Sound.playCandySelect();
        UI.highlightSelectedCell(r, c);
      }
    }
  }

  // Attempt swap between (r1, c1) and (r2, c2)
  async attemptSwap(r1, c1, r2, c2) {
    this.isProcessing = true;
    this.selectedCell = null;
    UI.clearSelectedHighlight();
    Sound.playSwap();

    const p1 = this.board.grid[r1][c1];
    const p2 = this.board.grid[r2][c2];

    // Trigger visual swap animation
    await UI.animateSwap(r1, c1, r2, c2);

    // Swap pieces in board array
    this.board.grid[r1][c1] = p2;
    this.board.grid[r2][c2] = p1;
    if (p1) { p1.r = r2; p1.c = c2; }
    if (p2) { p2.r = r1; p2.c = c1; }

    // Check special combination
    const isCombo = SpecialPieces.isSpecialCombo(p1, p2);
    if (isCombo) {
      this.movesLeft--;
      UI.updateGameHud(this);
      await this.resolveSpecialCombo(p1, p2);
      await this.resolveCascades();
      this.finishTurn();
      return;
    }

    // Check standard match
    const matches = MatchingEngine.findAllMatches(this.board.grid, this.board.rows, this.board.cols);
    if (matches.length > 0) {
      this.movesLeft--;
      this.comboCount = 0;
      UI.updateGameHud(this);

      await this.processMatches(matches, { r: r2, c: c2 });
      await this.resolveCascades();
      this.finishTurn();
    } else {
      // Invalid swap - Revert pieces back
      Sound.playInvalidSwap();
      await UI.animateSwap(r1, c1, r2, c2);
      this.board.grid[r1][c1] = p1;
      this.board.grid[r2][c2] = p2;
      if (p1) { p1.r = r1; p1.c = c1; }
      if (p2) { p2.r = r2; p2.c = c2; }
      this.renderBoard();
      this.isProcessing = false;
    }
  }

  // Resolve special candy combinations
  async resolveSpecialCombo(p1, p2) {
    const comboResult = SpecialPieces.executeSpecialCombo(this.board, p1, p2);
    if (!comboResult) return;

    this.score += comboResult.score;
    Sound.playBombExplosion();
    UI.triggerScreenShake();

    if (comboResult.type === "supernova") {
      Sound.playRainbowLaser();
      UI.showPraiseMessage("SUPERNOVA!");
      for (let r = 0; r < this.board.rows; r++) {
        for (let c = 0; c < this.board.cols; c++) {
          this.removePieceAt(r, c);
        }
      }
    } else if (comboResult.type === "color_clear") {
      Sound.playRainbowLaser();
      comboResult.affected.forEach(pos => this.removePieceAt(pos.r, pos.c));
    } else if (comboResult.type === "cross_laser" || comboResult.type === "giant_beam" || comboResult.type === "mega_bomb") {
      comboResult.affected.forEach(pos => this.removePieceAt(pos.r, pos.c));
    } else if (comboResult.type === "color_striped" || comboResult.type === "color_wrapped") {
      // Detonate converted pieces
      this.renderBoard();
      await new Promise(res => setTimeout(res, 250));
      comboResult.converted.forEach(pos => {
        const special = this.board.grid[pos.r]?.[pos.c]?.special;
        const affected = SpecialPieces.getSpecialClearCells(this.board, pos.r, pos.c, special);
        affected.forEach(a => this.removePieceAt(a.r, a.c));
        this.removePieceAt(pos.r, pos.c);
      });
    }

    this.renderBoard();
    await new Promise(res => setTimeout(res, 280));
  }

  // Remove a piece at (r,c) safely, awarding points and updating objectives
  removePieceAt(r, c) {
    if (r < 0 || r >= this.board.rows || c < 0 || c >= this.board.cols) return;
    const piece = this.board.grid[r][c];

    if (piece) {
      if (piece.isBlocker && piece.blockerType === CONFIG.BLOCKERS.CHOCOLATE) {
        this.score += CONFIG.SCORES.CHOCO_CLEAR;
      } else {
        // Track collected candy targets
        if (this.objectives.collected[piece.type] && this.objectives.collected[piece.type] > 0) {
          this.objectives.collected[piece.type]--;
        }
      }

      // If detonating a special piece
      if (piece.special) {
        const specialAffects = SpecialPieces.getSpecialClearCells(this.board, r, c, piece.special);
        this.board.grid[r][c] = null; // remove self first to avoid recursion
        specialAffects.forEach(aff => {
          if (this.board.grid[aff.r]?.[aff.c]) {
            this.removePieceAt(aff.r, aff.c);
          }
        });
      }

      this.board.grid[r][c] = null;
    }

    // Damage jelly under this tile
    if (this.board.damageJelly(r, c)) {
      this.score += CONFIG.SCORES.JELLY_CLEAR;
    }

    this.objectives.jelliesRemaining = this.board.getRemainingJellies();
    this.objectives.chocolatesRemaining = this.board.getRemainingChocolates();
  }

  // Process list of match groups
  async processMatches(matches, swappedCoord = null) {
    this.comboCount++;
    Sound.playMatch(this.comboCount);

    if (this.comboCount >= 3) {
      const praise = CONFIG.PRAISES[Math.min(this.comboCount - 2, CONFIG.PRAISES.length - 1)];
      UI.showPraiseMessage(praise);
      Sound.playLineBlast();
    }

    const matchedCoords = [];
    const specialsToSpawn = [];

    matches.forEach(group => {
      // Award score
      const basePoints = group.coords.length >= 5 ? CONFIG.SCORES.MATCH_5
        : (group.coords.length === 4 ? CONFIG.SCORES.MATCH_4 : CONFIG.SCORES.MATCH_3);
      this.score += basePoints + (this.comboCount - 1) * CONFIG.SCORES.COMBO_BONUS;

      // Check special candy creation
      const specialCreation = SpecialPieces.detectSpecialCreation(group, swappedCoord);
      if (specialCreation) {
        specialsToSpawn.push(specialCreation);
      }

      group.coords.forEach(coord => {
        matchedCoords.push(coord);
        this.removePieceAt(coord.r, coord.c);
      });
    });

    // Destroy adjacent chocolate blockers
    const damagedChocos = this.board.damageAdjacentChocolates(matchedCoords);
    if (damagedChocos.length > 0) {
      this.score += damagedChocos.length * CONFIG.SCORES.CHOCO_CLEAR;
      Sound.playBombExplosion();
    }

    // Spawn created special pieces
    specialsToSpawn.forEach(s => {
      this.board.grid[s.r][s.c] = {
        id: `special_${this.board.pieceIdCounter++}`,
        type: s.colorType,
        special: s.specialType,
        isBlocker: false,
        r: s.r,
        c: s.c
      };
      StorageManager.data.stats.specialCandiesCreated++;
    });

    // Update remaining counts
    this.objectives.jelliesRemaining = this.board.getRemainingJellies();
    this.objectives.chocolatesRemaining = this.board.getRemainingChocolates();

    // Trigger visual match clear animation
    await UI.animateMatches(matchedCoords);
  }

  // Repeatedly drop pieces and check for new cascade matches
  async resolveCascades() {
    let hasCascades = true;

    while (hasCascades) {
      // 1. Gravity drop
      const drops = this.board.applyGravity();
      await UI.animateDrops(drops);
      this.renderBoard();

      // 2. Check for cascading matches
      const newMatches = MatchingEngine.findAllMatches(this.board.grid, this.board.rows, this.board.cols);
      if (newMatches.length > 0) {
        await new Promise(res => setTimeout(res, 120));
        await this.processMatches(newMatches);
      } else {
        hasCascades = false;
      }
    }
  }

  // Finalize turn, check win / loss, check shuffle
  async finishTurn() {
    this.updateStars();
    UI.updateGameHud(this);

    // 1. Check Win Condition
    if (this.checkWinCondition()) {
      await this.handleVictory();
      return;
    }

    // 2. Check Loss Condition
    if (this.movesLeft <= 0) {
      this.handleDefeat();
      return;
    }

    // 3. Check Board Stagnation (no valid moves)
    const validMove = MatchingEngine.findAnyValidMove(this.board.grid, this.board.rows, this.board.cols);
    if (!validMove) {
      UI.showToast("No Moves Available! Shuffling...");
      Sound.playBooster();
      await new Promise(res => setTimeout(res, 600));
      this.board.shuffle();
      this.renderBoard();
    }

    this.isProcessing = false;
  }

  updateStars() {
    const thresholds = this.currentLevel.stars;
    if (this.score >= thresholds[2]) this.starsEarned = 3;
    else if (this.score >= thresholds[1]) this.starsEarned = 2;
    else if (this.score >= thresholds[0]) this.starsEarned = 1;
    else this.starsEarned = 0;
  }

  checkWinCondition() {
    const lvl = this.currentLevel;

    // Must reach at least 1-star score for score levels
    if (lvl.objectiveType === "score" || lvl.targetScore) {
      if (this.score < lvl.stars[0]) return false;
    }

    // Jelly objectives
    if (lvl.objectiveType === "jelly" || lvl.objectiveType === "hybrid") {
      if (this.objectives.jelliesRemaining > 0) return false;
    }

    // Chocolate objectives
    if (lvl.objectiveType === "chocolate" || lvl.objectiveType === "hybrid") {
      if (this.objectives.chocolatesRemaining > 0) return false;
    }

    // Collection targets
    if (lvl.collectTargets) {
      for (const [type, remaining] of Object.entries(this.objectives.collected)) {
        if (remaining > 0) return false;
      }
    }

    return true;
  }

  // Sugar Crush victory sequence!
  async handleVictory() {
    this.isGameOver = true;
    this.isProcessing = true;

    // Remaining moves bonus (Sugar Crush)
    if (this.movesLeft > 0) {
      UI.showPraiseMessage("SUGAR CRUSH!");
      Sound.playRainbowLaser();

      while (this.movesLeft > 0) {
        this.movesLeft--;
        this.score += CONFIG.SCORES.REMAINING_MOVE_BONUS;
        UI.updateGameHud(this);

        // Pick a random candy and turn it into striped or wrapped
        const r = Math.floor(Math.random() * this.board.rows);
        const c = Math.floor(Math.random() * this.board.cols);
        const p = this.board.grid[r][c];
        if (p && !p.isBlocker) {
          p.special = Math.random() > 0.5 ? CONFIG.SPECIAL.WRAPPED : CONFIG.SPECIAL.STRIPED_H;
          this.renderBoard();
          await new Promise(res => setTimeout(res, 120));
          this.removePieceAt(r, c);
          await this.resolveCascades();
        }
      }
    }

    this.updateStars();
    // Guarantee at least 1 star on win
    if (this.starsEarned === 0) this.starsEarned = 1;

    // Save progress & award currency
    if (typeof this.currentLevel.id === "number") {
      StorageManager.recordLevelCompletion(this.currentLevel.id, this.score, this.starsEarned);
      // Award level reward coins (50 coins per star)
      StorageManager.addCoins(this.starsEarned * 50);
    } else if (this.currentLevel.id === "daily") {
      StorageManager.addCoins(250);
      StorageManager.addBooster("rainbow", 1);
      const todayStr = new Date().toISOString().slice(0, 10);
      StorageManager.data.dailyChallenge.lastCompletedDate = todayStr;
      StorageManager.save();
    }

    // Ensure HUD displays updated currency and boosters immediately
    UI.updateTopbarStats();
    UI.updateBoosterCounts();

    Sound.playVictory();
    await new Promise(res => setTimeout(res, 400));
    UI.showVictoryModal(this);
  }

  handleDefeat() {
    this.isGameOver = true;
    this.isProcessing = true;
    Sound.playDefeat();
    UI.showDefeatModal(this);
  }
}

// Global Match-3 instance
const Game = new Match3Game();

if (typeof module !== "undefined" && module.exports) {
  module.exports = Match3Game;
}
