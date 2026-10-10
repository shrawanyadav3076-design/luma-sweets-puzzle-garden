/**
 * LUMA SWEETS: PUZZLE GARDEN
 * Special Candies & Combinations Engine
 */

const SpecialPieces = {
  // Determine if a matched set of coordinates qualifies for a special piece
  // matchedCoords: array of {r, c, type}
  // swappedCoord: optional {r, c} where the user moved a piece, or center
  detectSpecialCreation(matchGroup, swappedCoord = null) {
    const coords = matchGroup.coords;
    if (!coords || coords.length < 4) return null;

    const count = coords.length;
    const type = matchGroup.type;

    // Check rows & cols distribution
    const rows = new Set(coords.map(c => c.r));
    const cols = new Set(coords.map(c => c.c));

    // Choose spawn coordinate (prefer where player swapped into, else center of match)
    let spawnCoord = coords[Math.floor(coords.length / 2)];
    if (swappedCoord) {
      const matchInSwap = coords.find(c => c.r === swappedCoord.r && c.c === swappedCoord.c);
      if (matchInSwap) spawnCoord = matchInSwap;
    }

    // 5 or more in a straight line -> COLOR BOMB RAINBOW STAR
    if ((rows.size === 1 && coords.length >= 5) || (cols.size === 1 && coords.length >= 5)) {
      return {
        specialType: CONFIG.SPECIAL.COLOR_BOMB,
        colorType: "rainbow",
        r: spawnCoord.r,
        c: spawnCoord.c
      };
    }

    // Intersecting T-shape or L-shape (5 or more pieces spanning multiple rows & cols) -> WRAPPED CANDY
    if (rows.size > 1 && cols.size > 1 && coords.length >= 5) {
      return {
        specialType: CONFIG.SPECIAL.WRAPPED,
        colorType: type,
        r: spawnCoord.r,
        c: spawnCoord.c
      };
    }

    // 4 in a line -> STRIPED CANDY (Horizontal or Vertical)
    if (coords.length === 4) {
      const isHorizontal = rows.size === 1;
      return {
        specialType: isHorizontal ? CONFIG.SPECIAL.STRIPED_H : CONFIG.SPECIAL.STRIPED_V,
        colorType: type,
        r: spawnCoord.r,
        c: spawnCoord.c
      };
    }

    return null;
  },

  // Returns true if swapping piece1 and piece2 is a special combination
  isSpecialCombo(piece1, piece2) {
    if (!piece1 || !piece2) return false;
    const isSpecial1 = !!piece1.special;
    const isSpecial2 = !!piece2.special;

    // At least one is a Color Bomb, or both are special
    if (piece1.special === CONFIG.SPECIAL.COLOR_BOMB || piece2.special === CONFIG.SPECIAL.COLOR_BOMB) {
      return true;
    }
    return isSpecial1 && isSpecial2;
  },

  // Execute special combination effect on board
  // Returns list of affected cells and animations
  executeSpecialCombo(board, p1, p2) {
    const s1 = p1.special;
    const s2 = p2.special;
    const affected = [];

    // Case 1: Color Bomb + Color Bomb (Supernova clears whole board)
    if (s1 === CONFIG.SPECIAL.COLOR_BOMB && s2 === CONFIG.SPECIAL.COLOR_BOMB) {
      for (let r = 0; r < board.rows; r++) {
        for (let c = 0; c < board.cols; c++) {
          if (board.grid[r][c]) {
            affected.push({ r, c, reason: "supernova" });
          }
        }
      }
      return { type: "supernova", affected, score: 5000 };
    }

    // Case 2: Color Bomb + Striped
    if ((s1 === CONFIG.SPECIAL.COLOR_BOMB && (s2 === CONFIG.SPECIAL.STRIPED_H || s2 === CONFIG.SPECIAL.STRIPED_V)) ||
        (s2 === CONFIG.SPECIAL.COLOR_BOMB && (s1 === CONFIG.SPECIAL.STRIPED_H || s1 === CONFIG.SPECIAL.STRIPED_V))) {
      const targetColor = s1 === CONFIG.SPECIAL.COLOR_BOMB ? p2.type : p1.type;
      const converted = [];

      for (let r = 0; r < board.rows; r++) {
        for (let c = 0; c < board.cols; c++) {
          const piece = board.grid[r][c];
          if (piece && piece.type === targetColor && !piece.isBlocker) {
            // Convert to striped candy
            piece.special = Math.random() > 0.5 ? CONFIG.SPECIAL.STRIPED_H : CONFIG.SPECIAL.STRIPED_V;
            converted.push({ r, c });
          }
        }
      }
      return { type: "color_striped", converted, targetColor, score: 2500 };
    }

    // Case 3: Color Bomb + Wrapped
    if ((s1 === CONFIG.SPECIAL.COLOR_BOMB && s2 === CONFIG.SPECIAL.WRAPPED) ||
        (s2 === CONFIG.SPECIAL.COLOR_BOMB && s1 === CONFIG.SPECIAL.WRAPPED)) {
      const targetColor = s1 === CONFIG.SPECIAL.COLOR_BOMB ? p2.type : p1.type;
      const converted = [];

      for (let r = 0; r < board.rows; r++) {
        for (let c = 0; c < board.cols; c++) {
          const piece = board.grid[r][c];
          if (piece && piece.type === targetColor && !piece.isBlocker) {
            piece.special = CONFIG.SPECIAL.WRAPPED;
            converted.push({ r, c });
          }
        }
      }
      return { type: "color_wrapped", converted, targetColor, score: 3000 };
    }

    // Case 4: Color Bomb + Normal Candy
    if (s1 === CONFIG.SPECIAL.COLOR_BOMB || s2 === CONFIG.SPECIAL.COLOR_BOMB) {
      const targetColor = s1 === CONFIG.SPECIAL.COLOR_BOMB ? p2.type : p1.type;
      for (let r = 0; r < board.rows; r++) {
        for (let c = 0; c < board.cols; c++) {
          const piece = board.grid[r][c];
          if (piece && piece.type === targetColor && !piece.isBlocker) {
            affected.push({ r, c, reason: "color_clear" });
          }
        }
      }
      // Also clear the bomb position
      affected.push({ r: p1.r, c: p1.c });
      affected.push({ r: p2.r, c: p2.c });
      return { type: "color_clear", affected, targetColor, score: 1800 };
    }

    // Case 5: Striped + Striped (Cross Laser clears entire row and column)
    if ((s1 === CONFIG.SPECIAL.STRIPED_H || s1 === CONFIG.SPECIAL.STRIPED_V) &&
        (s2 === CONFIG.SPECIAL.STRIPED_H || s2 === CONFIG.SPECIAL.STRIPED_V)) {
      const centerR = p2.r;
      const centerC = p2.c;

      for (let c = 0; c < board.cols; c++) affected.push({ r: centerR, c, reason: "cross_laser" });
      for (let r = 0; r < board.rows; r++) affected.push({ r, c: centerC, reason: "cross_laser" });

      return { type: "cross_laser", center: { r: centerR, c: centerC }, affected, score: 800 };
    }

    // Case 6: Striped + Wrapped (Giant 3-lane cross beam!)
    if (((s1 === CONFIG.SPECIAL.STRIPED_H || s1 === CONFIG.SPECIAL.STRIPED_V) && s2 === CONFIG.SPECIAL.WRAPPED) ||
        ((s2 === CONFIG.SPECIAL.STRIPED_H || s2 === CONFIG.SPECIAL.STRIPED_V) && s1 === CONFIG.SPECIAL.WRAPPED)) {
      const centerR = p2.r;
      const centerC = p2.c;

      for (let dr = -1; dr <= 1; dr++) {
        const r = centerR + dr;
        if (r >= 0 && r < board.rows) {
          for (let c = 0; c < board.cols; c++) affected.push({ r, c, reason: "giant_beam" });
        }
      }
      for (let dc = -1; dc <= 1; dc++) {
        const c = centerC + dc;
        if (c >= 0 && c < board.cols) {
          for (let r = 0; r < board.rows; r++) affected.push({ r, c: centerC + dc, reason: "giant_beam" });
        }
      }
      return { type: "giant_beam", center: { r: centerR, c: centerC }, affected, score: 1500 };
    }

    // Case 7: Wrapped + Wrapped (Huge 5x5 blast radius)
    if (s1 === CONFIG.SPECIAL.WRAPPED && s2 === CONFIG.SPECIAL.WRAPPED) {
      const centerR = p2.r;
      const centerC = p2.c;

      for (let dr = -2; dr <= 2; dr++) {
        for (let dc = -2; dc <= 2; dc++) {
          const r = centerR + dr;
          const c = centerC + dc;
          if (r >= 0 && r < board.rows && c >= 0 && c < board.cols) {
            affected.push({ r, c, reason: "mega_bomb" });
          }
        }
      }
      return { type: "mega_bomb", center: { r: centerR, c: centerC }, affected, score: 1200 };
    }

    return null;
  },

  // Returns all cells affected when a single special candy is detonated
  getSpecialClearCells(board, r, c, specialType) {
    const affected = [];

    if (specialType === CONFIG.SPECIAL.STRIPED_H) {
      for (let col = 0; col < board.cols; col++) {
        affected.push({ r, c: col, effect: "striped_h" });
      }
    } else if (specialType === CONFIG.SPECIAL.STRIPED_V) {
      for (let row = 0; row < board.rows; row++) {
        affected.push({ r: row, c, effect: "striped_v" });
      }
    } else if (specialType === CONFIG.SPECIAL.WRAPPED) {
      // 3x3 explosion
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const tr = r + dr;
          const tc = c + dc;
          if (tr >= 0 && tr < board.rows && tc >= 0 && tc < board.cols) {
            affected.push({ r: tr, c: tc, effect: "wrapped" });
          }
        }
      }
    } else if (specialType === CONFIG.SPECIAL.COLOR_BOMB) {
      // Detonate a random color present on the board
      const colorCounts = {};
      for (let row = 0; row < board.rows; row++) {
        for (let col = 0; col < board.cols; col++) {
          const p = board.grid[row][col];
          if (p && p.type && p.type !== "rainbow" && !p.isBlocker) {
            colorCounts[p.type] = (colorCounts[p.type] || 0) + 1;
          }
        }
      }
      const mostCommon = Object.keys(colorCounts).sort((a, b) => colorCounts[b] - colorCounts[a])[0];
      if (mostCommon) {
        for (let row = 0; row < board.rows; row++) {
          for (let col = 0; col < board.cols; col++) {
            const p = board.grid[row][col];
            if (p && p.type === mostCommon) {
              affected.push({ r: row, c: col, effect: "color_bomb" });
            }
          }
        }
      }
      affected.push({ r, c, effect: "color_bomb" });
    }

    return affected;
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = SpecialPieces;
}
