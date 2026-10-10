/**
 * LUMA SWEETS: PUZZLE GARDEN
 * Persistent Storage System (Local Storage & Safe Fallbacks)
 */

const STORAGE_KEY = "luma_sweets_save_v1";

const StorageManager = {
  data: null,

  getDefaultData() {
    return {
      version: 2,
      unlockedLevel: 1,
      levelStars: {},       // { levelId: 1..3 }
      highScores: {},       // { levelId: score }
      coins: CONFIG.DEFAULT_INVENTORY.coins,
      boosters: { ...CONFIG.DEFAULT_INVENTORY.boosters },
      settings: {
        ...CONFIG.AUDIO_DEFAULTS,
        vibrate: true,
        reducedMotion: false,
        highContrast: false,
        language: "en" // "en" | "hi"
      },
      dailyReward: {
        lastClaimDate: null,
        streak: 0
      },
      dailyChallenge: {
        lastCompletedDate: null,
        bestScore: 0
      },
      missions: {
        matches: { id: "matches", progress: 0, target: 50, claimed: false, reward: 80, desc: "Make 50 Candy Matches", descHi: "50 कैंडी मैच बनाएं" },
        specials: { id: "specials", progress: 0, target: 10, claimed: false, reward: 120, desc: "Create 10 Special Candies", descHi: "10 विशेष कैंडीज बनाएं" },
        levels: { id: "levels", progress: 0, target: 3, claimed: false, reward: 150, desc: "Clear 3 Levels", descHi: "3 लेवल पूरे करें" }
      },
      achievements: {
        first_win: { id: "first_win", unlocked: false, claimed: false, progress: 0, target: 1, title: "Garden Explorer", desc: "Complete Level 1", reward: 100 },
        star_collector: { id: "star_collector", unlocked: false, claimed: false, progress: 0, target: 15, title: "Star Collector", desc: "Collect 15 Stars", reward: 200 },
        combo_master: { id: "combo_master", unlocked: false, claimed: false, progress: 0, target: 4, title: "Combo Master", desc: "Trigger a 4x Cascade Combo", reward: 150 },
        sweet_million: { id: "sweet_million", unlocked: false, claimed: false, progress: 0, target: 50000, title: "High Scorer", desc: "Earn 50,000 Total Score", reward: 300 }
      },
      stats: {
        totalMatches: 0,
        specialCandiesCreated: 0,
        levelsCompleted: 0,
        totalScoreEarned: 0,
        highestCombo: 0
      }
    };
  },

  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        this.data = this.mergeWithDefault(parsed);
      } else {
        this.data = this.getDefaultData();
      }
    } catch (e) {
      console.warn("Luma Sweets: localStorage unavailable or corrupted. Using memory state.", e);
      this.data = this.getDefaultData();
    }
    return this.data;
  },

  save() {
    if (!this.data) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.warn("Luma Sweets: Failed to save to localStorage", e);
    }
  },

  mergeWithDefault(loaded) {
    const def = this.getDefaultData();
    return {
      version: 2,
      unlockedLevel: typeof loaded.unlockedLevel === "number" ? Math.max(1, loaded.unlockedLevel) : 1,
      levelStars: loaded.levelStars || {},
      highScores: loaded.highScores || {},
      coins: typeof loaded.coins === "number" ? loaded.coins : def.coins,
      boosters: { ...def.boosters, ...(loaded.boosters || {}) },
      settings: { ...def.settings, ...(loaded.settings || {}) },
      dailyReward: { ...def.dailyReward, ...(loaded.dailyReward || {}) },
      dailyChallenge: { ...def.dailyChallenge, ...(loaded.dailyChallenge || {}) },
      missions: { ...def.missions, ...(loaded.missions || {}) },
      achievements: { ...def.achievements, ...(loaded.achievements || {}) },
      stats: { ...def.stats, ...(loaded.stats || {}) }
    };
  },

  // Level Progression
  isLevelUnlocked(levelId) {
    return levelId <= (this.data.unlockedLevel || 1);
  },

  getLevelStars(levelId) {
    return this.data.levelStars[levelId] || 0;
  },

  getHighScore(levelId) {
    return this.data.highScores[levelId] || 0;
  },

  recordLevelCompletion(levelId, score, stars) {
    let newlyUnlocked = false;

    // Record high score
    const currentHigh = this.data.highScores[levelId] || 0;
    if (score > currentHigh) {
      this.data.highScores[levelId] = score;
    }

    // Record stars (only upgrade)
    const currentStars = this.data.levelStars[levelId] || 0;
    if (stars > currentStars) {
      this.data.levelStars[levelId] = stars;
    }

    // Unlock next level if this was latest
    if (levelId === this.data.unlockedLevel && levelId < 30) {
      this.data.unlockedLevel = levelId + 1;
      newlyUnlocked = true;
    }

    this.data.stats.levelsCompleted = Object.keys(this.data.levelStars).length;
    this.data.stats.totalScoreEarned = (this.data.stats.totalScoreEarned || 0) + score;

    // Update Missions & Achievements
    this.incrementMissionProgress("levels", 1);
    this.checkAchievements();

    this.save();
    return { newlyUnlocked, nextLevel: this.data.unlockedLevel };
  },

  // Missions & Achievements
  incrementMissionProgress(key, amount = 1) {
    if (!this.data.missions[key]) return;
    const m = this.data.missions[key];
    if (!m.claimed) {
      m.progress = Math.min(m.target, (m.progress || 0) + amount);
      this.save();
    }
  },

  claimMissionReward(key) {
    const m = this.data.missions[key];
    if (m && m.progress >= m.target && !m.claimed) {
      m.claimed = true;
      this.addCoins(m.reward);
      this.save();
      return m.reward;
    }
    return 0;
  },

  checkAchievements() {
    const totalStars = Object.values(this.data.levelStars).reduce((a, b) => a + b, 0);
    const levelsDone = Object.keys(this.data.levelStars).length;

    // First Win
    if (levelsDone >= 1 && this.data.achievements.first_win) {
      this.data.achievements.first_win.unlocked = true;
      this.data.achievements.first_win.progress = 1;
    }
    // Star Collector
    if (this.data.achievements.star_collector) {
      this.data.achievements.star_collector.progress = totalStars;
      if (totalStars >= this.data.achievements.star_collector.target) {
        this.data.achievements.star_collector.unlocked = true;
      }
    }
    // High Scorer
    if (this.data.achievements.sweet_million) {
      const score = this.data.stats.totalScoreEarned || 0;
      this.data.achievements.sweet_million.progress = score;
      if (score >= this.data.achievements.sweet_million.target) {
        this.data.achievements.sweet_million.unlocked = true;
      }
    }
    this.save();
  },

  claimAchievement(key) {
    const a = this.data.achievements[key];
    if (a && a.unlocked && !a.claimed) {
      a.claimed = true;
      this.addCoins(a.reward);
      this.save();
      return a.reward;
    }
    return 0;
  },

  // Booster Inventory
  getBoosterCount(boosterId) {
    return this.data.boosters[boosterId] || 0;
  },

  useBooster(boosterId) {
    if ((this.data.boosters[boosterId] || 0) > 0) {
      this.data.boosters[boosterId]--;
      this.save();
      return true;
    }
    return false;
  },

  addBooster(boosterId, amount = 1) {
    this.data.boosters[boosterId] = (this.data.boosters[boosterId] || 0) + amount;
    this.save();
  },

  // Coins
  getCoins() {
    return this.data.coins || 0;
  },

  addCoins(amount) {
    this.data.coins = Math.max(0, (this.data.coins || 0) + amount);
    this.save();
    return this.data.coins;
  },

  spendCoins(amount) {
    if ((this.data.coins || 0) >= amount) {
      this.data.coins -= amount;
      this.save();
      return true;
    }
    return false;
  },

  // Settings & Language
  getSettings() {
    return this.data.settings;
  },

  updateSettings(newSettings) {
    this.data.settings = { ...this.data.settings, ...newSettings };
    this.save();
  },

  // Daily Rewards
  getDailyRewardStatus() {
    const todayStr = new Date().toISOString().slice(0, 10);
    const lastClaim = this.data.dailyReward.lastClaimDate;

    let canClaim = false;
    let streak = this.data.dailyReward.streak || 0;

    if (!lastClaim) {
      canClaim = true;
      streak = 1;
    } else if (lastClaim !== todayStr) {
      const lastDate = new Date(lastClaim);
      const today = new Date(todayStr);
      const diffDays = Math.round((today - lastDate) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        streak = (streak % 7) + 1;
        canClaim = true;
      } else if (diffDays > 1) {
        streak = 1; // reset streak if missed a day
        canClaim = true;
      }
    }

    return { canClaim, streak, todayStr, lastClaim };
  },

  claimDailyReward(reward) {
    const status = this.getDailyRewardStatus();
    if (!status.canClaim) return false;

    this.data.dailyReward.lastClaimDate = status.todayStr;
    this.data.dailyReward.streak = status.streak;

    if (reward.coins) this.addCoins(reward.coins);
    if (reward.boosters) {
      for (const [bId, amt] of Object.entries(reward.boosters)) {
        this.addBooster(bId, amt);
      }
    }

    this.save();
    return true;
  },

  // Reset Progress Safeguard
  resetAllProgress() {
    const savedSettings = { ...this.data.settings };
    this.data = this.getDefaultData();
    this.data.settings = savedSettings; // preserve audio & visual settings
    this.save();
  }
};

// Initialize on script load
StorageManager.load();

if (typeof module !== "undefined" && module.exports) {
  module.exports = StorageManager;
}
