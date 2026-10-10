/**
 * LUMA SWEETS: PUZZLE GARDEN
 * 30 Individually Configured Starter Levels across 6 Themed Worlds
 */

const LEVELS_DATA = [
  // ==========================================
  // WORLD 1: LUMA MEADOW (Levels 1 - 5)
  // ==========================================
  {
    id: 1,
    worldId: 1,
    worldName: "Luma Meadow",
    title: "Sweet Beginning",
    subtitle: "Welcome to the Puzzle Garden!",
    description: "Match 3 or more sweet candies to reach the target score.",
    objectiveType: "score",
    targetScore: 1200,
    moves: 18,
    stars: [1200, 2200, 3500],
    difficulty: "Easy",
    cols: 8,
    rows: 8,
    candies: ["star", "berry", "mint", "lemon"]
  },
  {
    id: 2,
    worldId: 1,
    worldName: "Luma Meadow",
    title: "Berry Harvest",
    subtitle: "Pluck the ripest gummies",
    description: "Collect 16 Berry Drops before moves run out!",
    objectiveType: "collect",
    collectTargets: { berry: 16 },
    targetScore: 1500,
    moves: 18,
    stars: [1500, 2600, 4000],
    difficulty: "Easy",
    cols: 8,
    rows: 8,
    candies: ["star", "berry", "mint", "lemon"]
  },
  {
    id: 3,
    worldId: 1,
    worldName: "Luma Meadow",
    title: "Frosted Sugar",
    subtitle: "Clear the sparkling jelly tiles",
    description: "Clear all 12 Frosted Jelly tiles under the candies.",
    objectiveType: "jelly",
    jellies: [
      { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4 }, { r: 2, c: 5 },
      { r: 3, c: 2 }, { r: 3, c: 3 }, { r: 3, c: 4 }, { r: 3, c: 5 },
      { r: 4, c: 2 }, { r: 4, c: 3 }, { r: 4, c: 4 }, { r: 4, c: 5 }
    ],
    targetScore: 2000,
    moves: 20,
    stars: [2000, 3500, 5000],
    difficulty: "Easy",
    cols: 8,
    rows: 8,
    candies: ["star", "berry", "mint", "lemon", "grape"]
  },
  {
    id: 4,
    worldId: 1,
    worldName: "Luma Meadow",
    title: "Minty Meadow",
    subtitle: "Fresh herbal gems",
    description: "Collect 20 Mint Diamonds and reach 2,500 points.",
    objectiveType: "collect",
    collectTargets: { mint: 20 },
    targetScore: 2500,
    moves: 20,
    stars: [2500, 4000, 6000],
    difficulty: "Normal",
    cols: 8,
    rows: 8,
    candies: ["star", "berry", "mint", "lemon", "grape"]
  },
  {
    id: 5,
    worldId: 1,
    worldName: "Luma Meadow",
    title: "Choco Wall",
    subtitle: "Break through sweet cocoa bricks",
    description: "Match next to the Chocolate Bricks to break all 8 of them!",
    objectiveType: "chocolate",
    chocolates: [
      { r: 3, c: 2 }, { r: 3, c: 3 }, { r: 3, c: 4 }, { r: 3, c: 5 },
      { r: 4, c: 2 }, { r: 4, c: 3 }, { r: 4, c: 4 }, { r: 4, c: 5 }
    ],
    targetScore: 3000,
    moves: 22,
    stars: [3000, 4800, 7000],
    difficulty: "Normal",
    cols: 8,
    rows: 8,
    candies: ["star", "berry", "mint", "lemon", "grape"]
  },

  // ==========================================
  // WORLD 2: FROSTING PEAKS (Levels 6 - 10)
  // ==========================================
  {
    id: 6,
    worldId: 2,
    worldName: "Frosting Peaks",
    title: "Glacial Stars",
    subtitle: "Make special striped candies",
    description: "Collect 18 Luma Stars and 18 Berry Drops.",
    objectiveType: "collect",
    collectTargets: { star: 18, berry: 18 },
    targetScore: 3500,
    moves: 22,
    stars: [3500, 5500, 8000],
    difficulty: "Normal",
    cols: 8,
    rows: 8,
    candies: ["star", "berry", "mint", "lemon", "grape"]
  },
  {
    id: 7,
    worldId: 2,
    worldName: "Frosting Peaks",
    title: "Frosty Corners",
    subtitle: "Mountain paths coated in sugar",
    description: "Clear 16 Frosted Jelly tiles around the snowy border.",
    objectiveType: "jelly",
    jellies: [
      { r: 1, c: 1 }, { r: 1, c: 2 }, { r: 1, c: 5 }, { r: 1, c: 6 },
      { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 5 }, { r: 2, c: 6 },
      { r: 5, c: 1 }, { r: 5, c: 2 }, { r: 5, c: 5 }, { r: 5, c: 6 },
      { r: 6, c: 1 }, { r: 6, c: 2 }, { r: 6, c: 5 }, { r: 6, c: 6 }
    ],
    targetScore: 4000,
    moves: 24,
    stars: [4000, 6200, 9000],
    difficulty: "Normal",
    cols: 8,
    rows: 8,
    candies: ["star", "berry", "mint", "lemon", "grape"]
  },
  {
    id: 8,
    worldId: 2,
    worldName: "Frosting Peaks",
    title: "Peak Fever",
    subtitle: "High score flurry",
    description: "Score 6,000 points using cascades and combos!",
    objectiveType: "score",
    targetScore: 6000,
    moves: 20,
    stars: [6000, 8500, 12000],
    difficulty: "Normal",
    cols: 8,
    rows: 8,
    candies: ["star", "berry", "mint", "lemon", "grape", "azure"]
  },
  {
    id: 9,
    worldId: 2,
    worldName: "Frosting Peaks",
    title: "Dual Ice Pillars",
    subtitle: "Chocolate barricade",
    description: "Clear all 10 Chocolate Bricks guarding the mountain ridge.",
    objectiveType: "chocolate",
    chocolates: [
      { r: 1, c: 2 }, { r: 2, c: 2 }, { r: 3, c: 2 }, { r: 4, c: 2 }, { r: 5, c: 2 },
      { r: 1, c: 5 }, { r: 2, c: 5 }, { r: 3, c: 5 }, { r: 4, c: 5 }, { r: 5, c: 5 }
    ],
    targetScore: 4500,
    moves: 25,
    stars: [4500, 7000, 10000],
    difficulty: "Hard",
    cols: 8,
    rows: 8,
    candies: ["star", "berry", "mint", "lemon", "grape"]
  },
  {
    id: 10,
    worldId: 2,
    worldName: "Frosting Peaks",
    title: "Summit Crown",
    subtitle: "World 2 Milestone Finale!",
    description: "Clear 16 Jellies and collect 20 Azure Crystals!",
    objectiveType: "hybrid",
    collectTargets: { azure: 20 },
    jellies: [
      { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4 }, { r: 2, c: 5 },
      { r: 3, c: 2 }, { r: 3, c: 3 }, { r: 3, c: 4 }, { r: 3, c: 5 },
      { r: 4, c: 2 }, { r: 4, c: 3 }, { r: 4, c: 4 }, { r: 4, c: 5 },
      { r: 5, c: 2 }, { r: 5, c: 3 }, { r: 5, c: 4 }, { r: 5, c: 5 }
    ],
    targetScore: 5500,
    moves: 26,
    stars: [5500, 8500, 12500],
    difficulty: "Milestone",
    cols: 8,
    rows: 8,
    candies: ["star", "berry", "mint", "lemon", "grape", "azure"]
  },

  // ==========================================
  // WORLD 3: SODA LAGOON (Levels 11 - 15)
  // ==========================================
  {
    id: 11,
    worldId: 3,
    worldName: "Soda Lagoon",
    title: "Fizzy Springs",
    subtitle: "Swirling purple currents",
    description: "Collect 25 Grape Swirls and 15 Mint Diamonds.",
    objectiveType: "collect",
    collectTargets: { grape: 25, mint: 15 },
    targetScore: 5000,
    moves: 22,
    stars: [5000, 7500, 11000],
    difficulty: "Normal",
    cols: 8,
    rows: 8,
    candies: ["star", "berry", "mint", "lemon", "grape"]
  },
  {
    id: 12,
    worldId: 3,
    worldName: "Soda Lagoon",
    title: "Lagoon Cross",
    subtitle: "Cross-shaped soda reef",
    description: "Clear 14 Jelly tiles in the center reef.",
    objectiveType: "jelly",
    jellies: [
      { r: 0, c: 3 }, { r: 1, c: 3 }, { r: 2, c: 3 }, { r: 3, c: 3 }, { r: 4, c: 3 }, { r: 5, c: 3 }, { r: 6, c: 3 }, { r: 7, c: 3 },
      { r: 3, c: 0 }, { r: 3, c: 1 }, { r: 3, c: 2 }, { r: 3, c: 4 }, { r: 3, c: 5 }, { r: 3, c: 6 }
    ],
    targetScore: 5200,
    moves: 24,
    stars: [5200, 8000, 11500],
    difficulty: "Normal",
    cols: 8,
    rows: 8,
    candies: ["star", "berry", "mint", "lemon", "azure"]
  },
  {
    id: 13,
    worldId: 3,
    worldName: "Soda Lagoon",
    title: "Bubble Moat",
    subtitle: "Surrounded by chocolate rocks",
    description: "Smash all 12 Chocolate Bricks forming the perimeter moat.",
    objectiveType: "chocolate",
    chocolates: [
      { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4 }, { r: 2, c: 5 },
      { r: 5, c: 2 }, { r: 5, c: 3 }, { r: 5, c: 4 }, { r: 5, c: 5 },
      { r: 3, c: 2 }, { r: 4, c: 2 }, { r: 3, c: 5 }, { r: 4, c: 5 }
    ],
    targetScore: 6000,
    moves: 25,
    stars: [6000, 9000, 13000],
    difficulty: "Hard",
    cols: 8,
    rows: 8,
    candies: ["star", "berry", "mint", "lemon", "grape"]
  },
  {
    id: 14,
    worldId: 3,
    worldName: "Soda Lagoon",
    title: "Rainbow Tide",
    subtitle: "Prismatic tidal wave",
    description: "Score 8,000 points and create special combo reactions!",
    objectiveType: "score",
    targetScore: 8000,
    moves: 22,
    stars: [8000, 11000, 15000],
    difficulty: "Normal",
    cols: 8,
    rows: 8,
    candies: ["star", "berry", "mint", "lemon", "grape", "azure"]
  },
  {
    id: 15,
    worldId: 3,
    worldName: "Soda Lagoon",
    title: "Gummy Quilt",
    subtitle: "World 3 Milestone Finale!",
    description: "Clear 16 Frosted Jelly tiles in a checkerboard pattern.",
    objectiveType: "jelly",
    jellies: [
      { r: 1, c: 1 }, { r: 1, c: 3 }, { r: 1, c: 5 }, { r: 1, c: 7 },
      { r: 3, c: 0 }, { r: 3, c: 2 }, { r: 3, c: 4 }, { r: 3, c: 6 },
      { r: 5, c: 1 }, { r: 5, c: 3 }, { r: 5, c: 5 }, { r: 5, c: 7 },
      { r: 7, c: 0 }, { r: 7, c: 2 }, { r: 7, c: 4 }, { r: 7, c: 6 }
    ],
    targetScore: 6500,
    moves: 25,
    stars: [6500, 9500, 13500],
    difficulty: "Milestone",
    cols: 8,
    rows: 8,
    candies: ["star", "berry", "mint", "lemon", "azure"]
  },

  // ==========================================
  // WORLD 4: CRYSTAL CAVERNS (Levels 16 - 20)
  // ==========================================
  {
    id: 16,
    worldId: 4,
    worldName: "Crystal Caverns",
    title: "Grotto of Stars",
    subtitle: "Glittering crystal vaults",
    description: "Collect 28 Luma Stars and 20 Lemon Bonbons.",
    objectiveType: "collect",
    collectTargets: { star: 28, lemon: 20 },
    targetScore: 7000,
    moves: 24,
    stars: [7000, 10000, 14000],
    difficulty: "Normal",
    cols: 8,
    rows: 8,
    candies: ["star", "berry", "mint", "lemon", "azure"]
  },
  {
    id: 17,
    worldId: 4,
    worldName: "Crystal Caverns",
    title: "Choco Chevron",
    subtitle: "Subterranean chocolate seams",
    description: "Destroy 10 Chocolate Bricks and score 7,500 points.",
    objectiveType: "chocolate",
    chocolates: [
      { r: 1, c: 1 }, { r: 2, c: 2 }, { r: 3, c: 3 }, { r: 4, c: 4 }, { r: 5, c: 5 },
      { r: 1, c: 6 }, { r: 2, c: 5 }, { r: 3, c: 4 }, { r: 4, c: 3 }, { r: 5, c: 2 }
    ],
    targetScore: 7500,
    moves: 26,
    stars: [7500, 10500, 14500],
    difficulty: "Hard",
    cols: 8,
    rows: 8,
    candies: ["star", "berry", "mint", "lemon", "grape"]
  },
  {
    id: 18,
    worldId: 4,
    worldName: "Crystal Caverns",
    title: "Emerald Geode",
    subtitle: "Cavern of minty crystals",
    description: "Clear 18 Frosted Jelly tiles across the geode chamber.",
    objectiveType: "jelly",
    jellies: [
      { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4 }, { r: 2, c: 5 }, { r: 2, c: 6 },
      { r: 3, c: 1 }, { r: 3, c: 2 }, { r: 3, c: 3 }, { r: 3, c: 4 }, { r: 3, c: 5 }, { r: 3, c: 6 },
      { r: 4, c: 1 }, { r: 4, c: 2 }, { r: 4, c: 3 }, { r: 4, c: 4 }, { r: 4, c: 5 }, { r: 4, c: 6 }
    ],
    targetScore: 8000,
    moves: 25,
    stars: [8000, 11500, 15500],
    difficulty: "Hard",
    cols: 8,
    rows: 8,
    candies: ["star", "berry", "mint", "lemon", "grape", "azure"]
  },
  {
    id: 19,
    worldId: 4,
    worldName: "Crystal Caverns",
    title: "Azure Depths",
    subtitle: "Deep crystal mining",
    description: "Collect 30 Berry Drops and 25 Azure Crystals.",
    objectiveType: "collect",
    collectTargets: { berry: 30, azure: 25 },
    targetScore: 8500,
    moves: 26,
    stars: [8500, 12000, 16000],
    difficulty: "Hard",
    cols: 8,
    rows: 8,
    candies: ["star", "berry", "mint", "grape", "azure"]
  },
  {
    id: 20,
    worldId: 4,
    worldName: "Crystal Caverns",
    title: "Crystal Citadel",
    subtitle: "World 4 Milestone Finale!",
    description: "Clear 20 Jellies and 8 Chocolate Bricks guarding the citadel!",
    objectiveType: "hybrid",
    chocolates: [
      { r: 2, c: 3 }, { r: 2, c: 4 }, { r: 3, c: 2 }, { r: 3, c: 5 },
      { r: 4, c: 2 }, { r: 4, c: 5 }, { r: 5, c: 3 }, { r: 5, c: 4 }
    ],
    jellies: [
      { r: 1, c: 2 }, { r: 1, c: 3 }, { r: 1, c: 4 }, { r: 1, c: 5 },
      { r: 6, c: 2 }, { r: 6, c: 3 }, { r: 6, c: 4 }, { r: 6, c: 5 },
      { r: 3, c: 1 }, { r: 4, c: 1 }, { r: 3, c: 6 }, { r: 4, c: 6 },
      { r: 2, c: 2 }, { r: 2, c: 5 }, { r: 5, c: 2 }, { r: 5, c: 5 },
      { r: 3, c: 3 }, { r: 3, c: 4 }, { r: 4, c: 3 }, { r: 4, c: 4 }
    ],
    targetScore: 9500,
    moves: 28,
    stars: [9500, 13500, 18000],
    difficulty: "Milestone",
    cols: 8,
    rows: 8,
    candies: ["star", "berry", "mint", "lemon", "grape", "azure"]
  },

  // ==========================================
  // WORLD 5: CHOCOLATE GROVE (Levels 21 - 25)
  // ==========================================
  {
    id: 21,
    worldId: 5,
    worldName: "Chocolate Grove",
    title: "Fudge Rapids",
    subtitle: "Tumbling chocolate cascades",
    description: "Score 10,000 points with massive cascading combos!",
    objectiveType: "score",
    targetScore: 10000,
    moves: 23,
    stars: [10000, 14000, 19000],
    difficulty: "Normal",
    cols: 8,
    rows: 8,
    candies: ["star", "berry", "mint", "lemon", "grape"]
  },
  {
    id: 22,
    worldId: 5,
    worldName: "Chocolate Grove",
    title: "Cocoa Ring",
    subtitle: "Perimeter loop of frosting",
    description: "Clear 16 Jelly tiles forming an outer perimeter ring.",
    objectiveType: "jelly",
    jellies: [
      { r: 1, c: 1 }, { r: 1, c: 2 }, { r: 1, c: 3 }, { r: 1, c: 4 }, { r: 1, c: 5 }, { r: 1, c: 6 },
      { r: 6, c: 1 }, { r: 6, c: 2 }, { r: 6, c: 3 }, { r: 6, c: 4 }, { r: 6, c: 5 }, { r: 6, c: 6 },
      { r: 2, c: 1 }, { r: 3, c: 1 }, { r: 4, c: 1 }, { r: 5, c: 1 },
      { r: 2, c: 6 }, { r: 3, c: 6 }, { r: 4, c: 6 }, { r: 5, c: 6 }
    ],
    targetScore: 9000,
    moves: 26,
    stars: [9000, 13000, 17500],
    difficulty: "Hard",
    cols: 8,
    rows: 8,
    candies: ["star", "berry", "mint", "lemon", "grape", "azure"]
  },
  {
    id: 23,
    worldId: 5,
    worldName: "Chocolate Grove",
    title: "Triple Choco Threat",
    subtitle: "Clustered cocoa boulders",
    description: "Smash 12 Chocolate Bricks clustered in three blocks.",
    objectiveType: "chocolate",
    chocolates: [
      { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 3, c: 2 }, { r: 3, c: 3 },
      { r: 2, c: 5 }, { r: 2, c: 6 }, { r: 3, c: 5 }, { r: 3, c: 6 },
      { r: 5, c: 3 }, { r: 5, c: 4 }, { r: 6, c: 3 }, { r: 6, c: 4 }
    ],
    targetScore: 9500,
    moves: 27,
    stars: [9500, 13500, 18500],
    difficulty: "Hard",
    cols: 8,
    rows: 8,
    candies: ["star", "berry", "mint", "lemon", "azure"]
  },
  {
    id: 24,
    worldId: 5,
    worldName: "Chocolate Grove",
    title: "Golden Canopies",
    subtitle: "Pure golden star collection",
    description: "Collect 35 Luma Stars and score 10,000 points.",
    objectiveType: "collect",
    collectTargets: { star: 35 },
    targetScore: 10000,
    moves: 25,
    stars: [10000, 14500, 19500],
    difficulty: "Hard",
    cols: 8,
    rows: 8,
    candies: ["star", "berry", "lemon", "grape", "azure"]
  },
  {
    id: 25,
    worldId: 5,
    worldName: "Chocolate Grove",
    title: "Hourglass Fudge",
    subtitle: "World 5 Milestone Finale!",
    description: "Clear 18 Jelly tiles in the hourglass pattern.",
    objectiveType: "jelly",
    jellies: [
      { r: 1, c: 1 }, { r: 1, c: 2 }, { r: 1, c: 3 }, { r: 1, c: 4 }, { r: 1, c: 5 }, { r: 1, c: 6 },
      { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4 }, { r: 2, c: 5 },
      { r: 3, c: 3 }, { r: 3, c: 4 }, { r: 4, c: 3 }, { r: 4, c: 4 },
      { r: 5, c: 2 }, { r: 5, c: 3 }, { r: 5, c: 4 }, { r: 5, c: 5 },
      { r: 6, c: 1 }, { r: 6, c: 2 }, { r: 6, c: 3 }, { r: 6, c: 4 }, { r: 6, c: 5 }, { r: 6, c: 6 }
    ],
    targetScore: 11000,
    moves: 28,
    stars: [11000, 15500, 21000],
    difficulty: "Milestone",
    cols: 8,
    rows: 8,
    candies: ["star", "berry", "mint", "lemon", "grape", "azure"]
  },

  // ==========================================
  // WORLD 6: STARLIGHT PALACE (Levels 26 - 30)
  // ==========================================
  {
    id: 26,
    worldId: 6,
    worldName: "Starlight Palace",
    title: "Palace Courtyard",
    subtitle: "Harvest of royal jewels",
    description: "Collect 25 Mint, 25 Berry, and 25 Azure gems!",
    objectiveType: "collect",
    collectTargets: { mint: 25, berry: 25, azure: 25 },
    targetScore: 11500,
    moves: 28,
    stars: [11500, 16000, 22000],
    difficulty: "Hard",
    cols: 8,
    rows: 8,
    candies: ["mint", "berry", "azure", "star", "lemon"]
  },
  {
    id: 27,
    worldId: 6,
    worldName: "Starlight Palace",
    title: "Fortress of Fudge",
    subtitle: "Heavily fortified palace gate",
    description: "Destroy 14 Chocolate Bricks in the central fortress.",
    objectiveType: "chocolate",
    chocolates: [
      { r: 1, c: 3 }, { r: 1, c: 4 },
      { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4 }, { r: 2, c: 5 },
      { r: 3, c: 2 }, { r: 3, c: 5 },
      { r: 4, c: 2 }, { r: 4, c: 5 },
      { r: 5, c: 2 }, { r: 5, c: 3 }, { r: 5, c: 4 }, { r: 5, c: 5 }
    ],
    targetScore: 12000,
    moves: 29,
    stars: [12000, 17000, 23000],
    difficulty: "Hard",
    cols: 8,
    rows: 8,
    candies: ["star", "berry", "mint", "lemon", "grape"]
  },
  {
    id: 28,
    worldId: 6,
    worldName: "Starlight Palace",
    title: "Royal Frosting",
    subtitle: "Palace halls blanketed in frost",
    description: "Clear 24 Frosted Jelly tiles across the lower grand hall.",
    objectiveType: "jelly",
    jellies: [
      { r: 4, c: 0 }, { r: 4, c: 1 }, { r: 4, c: 2 }, { r: 4, c: 3 }, { r: 4, c: 4 }, { r: 4, c: 5 }, { r: 4, c: 6 }, { r: 4, c: 7 },
      { r: 5, c: 0 }, { r: 5, c: 1 }, { r: 5, c: 2 }, { r: 5, c: 3 }, { r: 5, c: 4 }, { r: 5, c: 5 }, { r: 5, c: 6 }, { r: 5, c: 7 },
      { r: 6, c: 0 }, { r: 6, c: 1 }, { r: 6, c: 2 }, { r: 6, c: 3 }, { r: 6, c: 4 }, { r: 6, c: 5 }, { r: 6, c: 6 }, { r: 6, c: 7 }
    ],
    targetScore: 13000,
    moves: 30,
    stars: [13000, 18500, 25000],
    difficulty: "Master",
    cols: 8,
    rows: 8,
    candies: ["star", "berry", "mint", "lemon", "grape", "azure"]
  },
  {
    id: 29,
    worldId: 6,
    worldName: "Starlight Palace",
    title: "Twilight Anthem",
    subtitle: "The song of stars",
    description: "Collect 35 Stars, clear 12 Jellies, and score 14,000 points!",
    objectiveType: "hybrid",
    collectTargets: { star: 35 },
    jellies: [
      { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4 }, { r: 2, c: 5 },
      { r: 3, c: 2 }, { r: 3, c: 5 }, { r: 4, c: 2 }, { r: 4, c: 5 },
      { r: 5, c: 2 }, { r: 5, c: 3 }, { r: 5, c: 4 }, { r: 5, c: 5 }
    ],
    targetScore: 14000,
    moves: 30,
    stars: [14000, 20000, 27000],
    difficulty: "Master",
    cols: 8,
    rows: 8,
    candies: ["star", "berry", "mint", "lemon", "grape", "azure"]
  },
  {
    id: 30,
    worldId: 6,
    worldName: "Starlight Palace",
    title: "Luma Sovereign Crown",
    subtitle: "The Ultimate Royal Garden Pinnacle!",
    description: "Clear the Royal Cross of 16 Jellies & 8 Chocolates to win the Crown!",
    objectiveType: "hybrid",
    chocolates: [
      { r: 2, c: 2 }, { r: 2, c: 5 }, { r: 5, c: 2 }, { r: 5, c: 5 },
      { r: 3, c: 3 }, { r: 3, c: 4 }, { r: 4, c: 3 }, { r: 4, c: 4 }
    ],
    jellies: [
      { r: 1, c: 3 }, { r: 1, c: 4 }, { r: 6, c: 3 }, { r: 6, c: 4 },
      { r: 3, c: 1 }, { r: 4, c: 1 }, { r: 3, c: 6 }, { r: 4, c: 6 },
      { r: 2, c: 3 }, { r: 2, c: 4 }, { r: 5, c: 3 }, { r: 5, c: 4 },
      { r: 3, c: 2 }, { r: 4, c: 2 }, { r: 3, c: 5 }, { r: 4, c: 5 }
    ],
    targetScore: 16000,
    moves: 32,
    stars: [16000, 23000, 30000],
    difficulty: "Master",
    cols: 8,
    rows: 8,
    candies: ["star", "berry", "mint", "lemon", "grape", "azure"]
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = LEVELS_DATA;
}
