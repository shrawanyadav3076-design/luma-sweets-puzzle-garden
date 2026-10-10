/**
 * LUMA SWEETS: PUZZLE GARDEN
 * Boosters & Special Player Tools
 */

const BoosterManager = {
  activeBooster: null, // 'hammer' | 'rainbow' | null

  activate(boosterId, gameInstance) {
    if (this.activeBooster === boosterId) {
      // Toggle off if already active
      this.cancel();
      return;
    }

    const count = StorageManager.getBoosterCount(boosterId);
    if (count <= 0) {
      // Prompt buy with coins
      const info = CONFIG.BOOSTER_INFO[boosterId];
      if (StorageManager.getCoins() >= info.cost) {
        if (confirm(`Purchase 1 ${info.name} for ${info.cost} Sweet Coins?`)) {
          StorageManager.spendCoins(info.cost);
          StorageManager.addBooster(boosterId, 1);
          Sound.playBooster();
          UI.updateTopbarStats();
          UI.updateBoosterCounts();
          UI.showToast(`Purchased ${info.name}!`);
        } else {
          return;
        }
      } else {
        UI.showToast(`Not enough coins for ${info.name}! (Cost: ${info.cost})`);
        return;
      }
    }

    // Instant Boosters
    if (boosterId === "shuffle") {
      if (StorageManager.useBooster("shuffle")) {
        Sound.playBooster();
        gameInstance.board.shuffle();
        gameInstance.renderBoard();
        UI.updateBoosterCounts();
        UI.showToast("Board Shuffled!");
      }
      return;
    }

    if (boosterId === "moves") {
      if (StorageManager.useBooster("moves")) {
        Sound.playBooster();
        gameInstance.movesLeft += 5;
        UI.updateGameHud(gameInstance);
        UI.updateBoosterCounts();
        UI.showToast("+5 Moves Added!");
      }
      return;
    }

    // Targeted Boosters: Hammer & Rainbow
    this.activeBooster = boosterId;
    UI.setBoosterTargetingMode(boosterId);
    UI.showToast(boosterId === "hammer" ? "Tap any piece to smash it!" : "Tap a candy to turn it into a Rainbow Star!");
  },

  cancel() {
    this.activeBooster = null;
    UI.clearBoosterTargetingMode();
  },

  handleTileClick(r, c, gameInstance) {
    if (!this.activeBooster) return false;

    const piece = gameInstance.board.grid[r][c];

    if (this.activeBooster === "hammer") {
      if (!piece && gameInstance.board.jellies[r][c] === 0) return false;

      if (StorageManager.useBooster("hammer")) {
        Sound.playBombExplosion();

        // Remove piece, blocker, or jelly and award objective credit
        gameInstance.removePieceAt(r, c);

        this.cancel();
        UI.updateBoosterCounts();
        UI.updateGameHud(gameInstance);

        // Run gravity drop and finish turn to verify victory immediately
        gameInstance.resolveCascades().then(() => {
          gameInstance.finishTurn();
        });
        return true;
      }
    } else if (this.activeBooster === "rainbow") {
      if (!piece || piece.isBlocker) {
        UI.showToast("Cannot place on blockers!");
        return false;
      }

      if (StorageManager.useBooster("rainbow")) {
        Sound.playRainbowLaser();
        piece.special = CONFIG.SPECIAL.COLOR_BOMB;
        piece.type = "rainbow";

        this.cancel();
        UI.updateBoosterCounts();
        gameInstance.renderBoard();
        UI.showToast("Rainbow Star Created!");
        return true;
      }
    }

    return false;
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = BoosterManager;
}
