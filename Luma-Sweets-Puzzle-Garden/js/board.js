/**
 * LUMA SWEETS: PUZZLE GARDEN
 * Board Model & Physics/Gravity State Engine
 */

class Board {
  constructor(levelData) {
    this.level = levelData;
    this.rows = levelData.rows || CONFIG.BOARD.DEFAULT_ROWS;
    this.cols = levelData.cols || CONFIG.BOARD.DEFAULT_COLS;
    this.candyTypes = levelData.candies || CONFIG.CANDIES.map(c => c.id);

    // 2D grid of pieces: grid[r][c] = { id, type, special, isBlocker, blockerType }
    this.grid = [];
    // 2D grid of under-candy jelly layers: jellies[r][c] = 0, 1, or 2
    this.jellies = [];

    this.pieceIdCounter = 1;
    this.initBoard();
  }

  initBoard() {
    // 1. Initialize empty grids
    this.grid = Array(this.rows).fill(null).map(() => Array(this.cols).fill(null));
    this.jellies = Array(this.rows).fill(0).map(() => Array(this.cols).fill(0));

    // 2. Setup Frosted Jellies if defined by level
    if (this.level.jellies && Array.isArray(this.level.jellies)) {
      this.level.jellies.forEach(j => {
        if (j.r >= 0 && j.r < this.rows && j.c >= 0 && j.c < this.cols) {
          this.jellies[j.r][j.c] = j.layers || 1;
        }
      });
    }

    // 3. Setup Chocolate Blockers if defined
    if (this.level.chocolates && Array.isArray(this.level.chocolates)) {
      this.level.chocolates.forEach(ch => {
        if (ch.r >= 0 && ch.r < this.rows && ch.c >= 0 && ch.c < this.cols) {
          this.grid[ch.r][ch.c] = {
            id: `blocker_${this.pieceIdCounter++}`,
            isBlocker: true,
            blockerType: CONFIG.BLOCKERS.CHOCOLATE,
            r: ch.r,
            c: ch.c
          };
        }
      });
    }

    // 4. Populate remaining tiles without initial 3-matches
    this.populateBoardWithoutMatches();

    // 5. Ensure at least one valid move exists
    let attempts = 0;
    while (!MatchingEngine.findAnyValidMove(this.grid, this.rows, this.cols) && attempts < 25) {
      this.populateBoardWithoutMatches();
      attempts++;
    }
  }

  createRandomPiece(r, c) {
    const randomType = this.candyTypes[Math.floor(Math.random() * this.candyTypes.length)];
    return {
      id: `candy_${this.pieceIdCounter++}`,
      type: randomType,
      special: null,
      isBlocker: false,
      r,
      c
    };
  }

  populateBoardWithoutMatches() {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        // Skip preexisting blockers
        if (this.grid[r][c] && this.grid[r][c].isBlocker) continue;

        let piece;
        let valid = false;
        let safeTries = 0;

        while (!valid && safeTries < 50) {
          piece = this.createRandomPiece(r, c);
          safeTries++;

          // Check horizontal match with left 2 pieces
          const hMatch = c >= 2 &&
            this.grid[r][c - 1] && !this.grid[r][c - 1].isBlocker && this.grid[r][c - 1].type === piece.type &&
            this.grid[r][c - 2] && !this.grid[r][c - 2].isBlocker && this.grid[r][c - 2].type === piece.type;

          // Check vertical match with upper 2 pieces
          const vMatch = r >= 2 &&
            this.grid[r - 1][c] && !this.grid[r - 1][c].isBlocker && this.grid[r - 1][c].type === piece.type &&
            this.grid[r - 2][c] && !this.grid[r - 2][c].isBlocker && this.grid[r - 2][c].type === piece.type;

          if (!hMatch && !vMatch) {
            valid = true;
          }
        }

        this.grid[r][c] = piece;
      }
    }
  }

  // Shuffle all non-blocker candies on the board
  shuffle() {
    const pieces = [];
    const positions = [];

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const p = this.grid[r][c];
        if (p && !p.isBlocker) {
          pieces.push({ type: p.type, special: p.special });
          positions.push({ r, c });
        }
      }
    }

    // Fisher-Yates shuffle
    for (let i = pieces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
    }

    // Reassign
    for (let k = 0; k < positions.length; k++) {
      const pos = positions[k];
      const p = pieces[k];
      this.grid[pos.r][pos.c] = {
        id: `candy_${this.pieceIdCounter++}`,
        type: p.type,
        special: p.special,
        isBlocker: false,
        r: pos.r,
        c: pos.c
      };
    }

    // If matches occurred from shuffle or no valid moves, re-populate safely
    let attempts = 0;
    while ((MatchingEngine.findAllMatches(this.grid, this.rows, this.cols).length > 0 ||
           !MatchingEngine.findAnyValidMove(this.grid, this.rows, this.cols)) && attempts < 20) {
      this.populateBoardWithoutMatches();
      attempts++;
    }
  }

  // Apply gravity: pieces fall down, new random pieces spawn above
  // 2-pass deterministic drop algorithm guarantees zero empty holes
  applyGravity() {
    const drops = [];

    for (let c = 0; c < this.cols; c++) {
      // Pass 1: Drop existing non-blocker pieces down into empty slots
      for (let r = this.rows - 1; r >= 0; r--) {
        if (!this.grid[r][c]) {
          // Look upwards for the nearest non-blocker candy
          let sourceRow = -1;
          for (let aboveR = r - 1; aboveR >= 0; aboveR--) {
            const candidate = this.grid[aboveR][c];
            if (candidate && !candidate.isBlocker) {
              sourceRow = aboveR;
              break;
            }
          }

          if (sourceRow !== -1) {
            const piece = this.grid[sourceRow][c];
            this.grid[r][c] = piece;
            this.grid[sourceRow][c] = null;
            piece.r = r;
            piece.c = c;
            drops.push({
              piece,
              fromR: sourceRow,
              toR: r,
              c,
              isNew: false
            });
          }
        }
      }

      // Pass 2: Spawn new candies for any remaining empty slots
      let spawnIndex = 1;
      for (let r = this.rows - 1; r >= 0; r--) {
        if (!this.grid[r][c]) {
          const newPiece = this.createRandomPiece(r, c);
          this.grid[r][c] = newPiece;
          drops.push({
            piece: newPiece,
            fromR: -spawnIndex,
            toR: r,
            c,
            isNew: true
          });
          spawnIndex++;
        }
      }
    }

    return drops;
  }

  // Clear frosted jelly layer at (r, c)
  damageJelly(r, c) {
    if (this.jellies[r][c] > 0) {
      this.jellies[r][c]--;
      return true;
    }
    return false;
  }

  getRemainingJellies() {
    let count = 0;
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (this.jellies[r][c] > 0) count++;
      }
    }
    return count;
  }

  getRemainingChocolates() {
    let count = 0;
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const p = this.grid[r][c];
        if (p && p.isBlocker && p.blockerType === CONFIG.BLOCKERS.CHOCOLATE) {
          count++;
        }
      }
    }
    return count;
  }

  // Check and destroy chocolate blockers adjacent to match coordinates
  damageAdjacentChocolates(matchedCoords) {
    const destroyed = [];
    const checked = new Set();

    matchedCoords.forEach(coord => {
      const neighbors = [
        { r: coord.r - 1, c: coord.c },
        { r: coord.r + 1, c: coord.c },
        { r: coord.r, c: coord.c - 1 },
        { r: coord.r, c: coord.c + 1 }
      ];

      neighbors.forEach(n => {
        const key = `${n.r},${n.c}`;
        if (!checked.has(key) && n.r >= 0 && n.r < this.rows && n.c >= 0 && n.c < this.cols) {
          checked.add(key);
          const p = this.grid[n.r][n.c];
          if (p && p.isBlocker && p.blockerType === CONFIG.BLOCKERS.CHOCOLATE) {
            this.grid[n.r][n.c] = null;
            destroyed.push({ r: n.r, c: n.c });
          }
        }
      });
    });

    return destroyed;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Board;
}
