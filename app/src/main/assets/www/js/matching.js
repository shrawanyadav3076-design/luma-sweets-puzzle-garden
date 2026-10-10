/**
 * LUMA SWEETS: PUZZLE GARDEN
 * Match Detection & Move Validation Engine
 */

const MatchingEngine = {
  // Find all matches on the board grid
  // Returns array of match groups: [ { type: string, coords: [{r, c}, ...] } ]
  findAllMatches(grid, rows, cols) {
    const horizontalMatches = [];
    const verticalMatches = [];

    // 1. Horizontal Scan
    for (let r = 0; r < rows; r++) {
      let matchLength = 1;
      for (let c = 0; c < cols; c++) {
        const current = grid[r][c];
        const next = c + 1 < cols ? grid[r][c + 1] : null;

        const canMatchCurrent = current && current.type && !current.isBlocker;
        const canMatchNext = next && next.type && !next.isBlocker;

        if (canMatchCurrent && canMatchNext && current.type === next.type && current.type !== "rainbow") {
          matchLength++;
        } else {
          if (matchLength >= 3 && canMatchCurrent) {
            const coords = [];
            for (let k = 0; k < matchLength; k++) {
              coords.push({ r, c: c - k });
            }
            horizontalMatches.push({
              type: current.type,
              coords
            });
          }
          matchLength = 1;
        }
      }
    }

    // 2. Vertical Scan
    for (let c = 0; c < cols; c++) {
      let matchLength = 1;
      for (let r = 0; r < rows; r++) {
        const current = grid[r][c];
        const next = r + 1 < rows ? grid[r + 1][c] : null;

        const canMatchCurrent = current && current.type && !current.isBlocker;
        const canMatchNext = next && next.type && !next.isBlocker;

        if (canMatchCurrent && canMatchNext && current.type === next.type && current.type !== "rainbow") {
          matchLength++;
        } else {
          if (matchLength >= 3 && canMatchCurrent) {
            const coords = [];
            for (let k = 0; k < matchLength; k++) {
              coords.push({ r: r - k, c });
            }
            verticalMatches.push({
              type: current.type,
              coords
            });
          }
          matchLength = 1;
        }
      }
    }

    // 3. Merge Intersecting Matches of the Same Color (L-shapes, T-shapes, Crosses)
    const allGroups = [...horizontalMatches, ...verticalMatches];
    const mergedGroups = [];
    const visited = new Set();

    for (let i = 0; i < allGroups.length; i++) {
      if (visited.has(i)) continue;
      visited.add(i);

      const group = {
        type: allGroups[i].type,
        coords: [...allGroups[i].coords]
      };

      // Check for intersections with other groups of same type
      for (let j = i + 1; j < allGroups.length; j++) {
        if (visited.has(j)) continue;
        if (allGroups[j].type === group.type) {
          const intersects = allGroups[j].coords.some(c1 =>
            group.coords.some(c2 => c1.r === c2.r && c1.c === c2.c)
          );

          if (intersects) {
            visited.add(j);
            allGroups[j].coords.forEach(c => {
              if (!group.coords.some(existing => existing.r === c.r && existing.c === c.c)) {
                group.coords.push(c);
              }
            });
          }
        }
      }

      mergedGroups.push(group);
    }

    return mergedGroups;
  },

  // Check if a move between (r1, c1) and (r2, c2) creates any match
  isValidMove(grid, rows, cols, r1, c1, r2, c2) {
    const p1 = grid[r1][c1];
    const p2 = grid[r2][c2];

    if (!p1 || !p2) return false;
    if (p1.isBlocker || p2.isBlocker) return false;

    // Special combinations are always valid moves!
    if (SpecialPieces.isSpecialCombo(p1, p2)) {
      return true;
    }

    // Simulate swap
    grid[r1][c1] = p2;
    grid[r2][c2] = p1;

    const matches = this.findAllMatches(grid, rows, cols);

    // Revert swap
    grid[r1][c1] = p1;
    grid[r2][c2] = p2;

    return matches.length > 0;
  },

  // Find any possible valid move on the board (used for hint and auto-shuffle)
  findAnyValidMove(grid, rows, cols) {
    // 1. Check Color Bombs (any adjacent piece is a valid swap)
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const p = grid[r][c];
        if (p && p.special === CONFIG.SPECIAL.COLOR_BOMB) {
          const neighbors = [
            { r: r - 1, c }, { r: r + 1, c }, { r, c: c - 1 }, { r, c: c + 1 }
          ];
          for (const n of neighbors) {
            if (n.r >= 0 && n.r < rows && n.c >= 0 && n.c < cols && grid[n.r][n.c] && !grid[n.r][n.c].isBlocker) {
              return { from: { r, c }, to: { r: n.r, c: n.c } };
            }
          }
        }
      }
    }

    // 2. Check Horizontal & Vertical Swaps
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Horizontal swap check (right)
        if (c + 1 < cols && this.isValidMove(grid, rows, cols, r, c, r, c + 1)) {
          return { from: { r, c }, to: { r, c: c + 1 } };
        }
        // Vertical swap check (down)
        if (r + 1 < rows && this.isValidMove(grid, rows, cols, r, c, r + 1, c)) {
          return { from: { r, c }, to: { r: r + 1, c } };
        }
      }
    }

    return null;
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = MatchingEngine;
}
