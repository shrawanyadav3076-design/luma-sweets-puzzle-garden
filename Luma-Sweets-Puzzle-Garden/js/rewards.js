/**
 * LUMA SWEETS: PUZZLE GARDEN
 * Rewards & Daily Calendar System
 */

const RewardsManager = {
  DAILY_STREAK_REWARDS: [
    { day: 1, title: "Day 1", coins: 80, boosters: {}, icon: "🪙", desc: "+80 Sweet Coins" },
    { day: 2, title: "Day 2", coins: 50, boosters: { hammer: 1 }, icon: "🔨", desc: "1 Lollipop Hammer & +50 Coins" },
    { day: 3, title: "Day 3", coins: 120, boosters: {}, icon: "🪙", desc: "+120 Sweet Coins" },
    { day: 4, title: "Day 4", coins: 60, boosters: { shuffle: 1 }, icon: "🔀", desc: "1 Sweet Shuffle & +60 Coins" },
    { day: 5, title: "Day 5", coins: 70, boosters: { moves: 1 }, icon: "➕", desc: "+5 Moves Booster & +70 Coins" },
    { day: 6, title: "Day 6", coins: 150, boosters: { rainbow: 1 }, icon: "🌟", desc: "1 Rainbow Star & +150 Coins" },
    { day: 7, title: "Day 7", coins: 300, boosters: { hammer: 2, rainbow: 1, moves: 1, shuffle: 1 }, icon: "👑", desc: "Royal Sweet Chest! All Boosters + 300 Coins" }
  ],

  getDailyRewardsList() {
    return this.DAILY_STREAK_REWARDS;
  },

  claimToday() {
    const status = StorageManager.getDailyRewardStatus();
    if (!status.canClaim) {
      return { success: false, reason: "Already claimed today! Return tomorrow for the next gift." };
    }

    const reward = this.DAILY_STREAK_REWARDS[status.streak - 1];
    const claimed = StorageManager.claimDailyReward(reward);

    if (claimed) {
      Sound.playVictory();
      return {
        success: true,
        reward,
        streak: status.streak
      };
    }

    return { success: false, reason: "Claim error." };
  },

  // Generates unique Daily Challenge level parameters based on today's calendar date
  getDailyChallengeLevel() {
    const today = new Date();
    const dateNum = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

    // Pseudo-random seed based on date
    const targetScore = 8000 + (dateNum % 7) * 1000;
    const moves = 22 + (dateNum % 5);

    return {
      id: "daily",
      title: "Daily Garden Challenge",
      subtitle: `Challenge for ${today.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`,
      description: `Complete today's exclusive puzzle with a score of ${targetScore.toLocaleString()} or more!`,
      objectiveType: "score",
      targetScore,
      moves,
      stars: [targetScore, Math.floor(targetScore * 1.4), Math.floor(targetScore * 1.8)],
      difficulty: "Daily",
      cols: 8,
      rows: 8,
      candies: ["star", "berry", "mint", "lemon", "azure"],
      rewardCoins: 250,
      rewardBooster: "rainbow"
    };
  }
};
