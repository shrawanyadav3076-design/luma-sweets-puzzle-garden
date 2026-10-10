/**
 * LUMA SWEETS: PUZZLE GARDEN
 * Game Configuration, Worlds, I18N & Constants
 */

const CONFIG = {
  APP_NAME: "Luma Sweets: Puzzle Garden",
  VERSION: "1.1.0",
  AUTHOR: "Luma Sweets Studio",

  // Board Configuration
  BOARD: {
    DEFAULT_COLS: 8,
    DEFAULT_ROWS: 8,
    MIN_MATCH: 3,
    MAX_SWAP_DISTANCE: 1
  },

  // 6 Themed Worlds / Episodes
  WORLDS: [
    {
      id: 1,
      name: "Luma Meadow",
      nameHi: "लूमा घास का मैदान",
      levelRange: [1, 5],
      icon: "🌸",
      themeColor: "#00E59B",
      bgGradient: "linear-gradient(180deg, #183324 0%, #130924 100%)",
      desc: "Lush rolling hills of sweet blooming candy blossoms."
    },
    {
      id: 2,
      name: "Frosting Peaks",
      nameHi: "फ्रॉस्टिंग चोटियाँ",
      levelRange: [6, 10],
      icon: "🏔️",
      themeColor: "#00D2FF",
      bgGradient: "linear-gradient(180deg, #102942 0%, #130924 100%)",
      desc: "Glacial sugar peaks blanketed in powdery marshmallow snow."
    },
    {
      id: 3,
      name: "Soda Lagoon",
      nameHi: "सोडा लैगून",
      levelRange: [11, 15],
      icon: "🌊",
      themeColor: "#FF2E74",
      bgGradient: "linear-gradient(180deg, #3d102e 0%, #130924 100%)",
      desc: "Sparkling fizzy waters surrounded by chewy gummy shores."
    },
    {
      id: 4,
      name: "Crystal Caverns",
      nameHi: "क्रिस्टल गुफाएं",
      levelRange: [16, 20],
      icon: "💎",
      themeColor: "#A259FF",
      bgGradient: "linear-gradient(180deg, #2b1145 0%, #130924 100%)",
      desc: "Luminous crystalline grottos refracting dazzling violet rays."
    },
    {
      id: 5,
      name: "Chocolate Grove",
      nameHi: "चॉकलेट उपवन",
      levelRange: [21, 25],
      icon: "🍫",
      themeColor: "#FF9F1C",
      bgGradient: "linear-gradient(180deg, #361f0f 0%, #130924 100%)",
      desc: "Canopy of rich cocoa trees with flowing fudge streams."
    },
    {
      id: 6,
      name: "Starlight Palace",
      nameHi: "स्टारलाइट पैलेस",
      levelRange: [26, 30],
      icon: "🏰",
      themeColor: "#FFD13B",
      bgGradient: "linear-gradient(180deg, #362908 0%, #130924 100%)",
      desc: "The pinnacle castle where the Royal Luma Crown resides."
    }
  ],

  // 6 Original Candy Types
  CANDIES: [
    {
      id: "star",
      name: "Luma Star",
      color: "#FFD13B",
      accent: "#FFF3A8",
      darkColor: "#C69B00",
      icon: "★",
      label: "Star Candy"
    },
    {
      id: "berry",
      name: "Berry Drop",
      color: "#FF2E74",
      accent: "#FFA6C5",
      darkColor: "#B50E45",
      icon: "♥",
      label: "Berry Drop"
    },
    {
      id: "mint",
      name: "Mint Diamond",
      color: "#00E59B",
      accent: "#A6FFDE",
      darkColor: "#008F5D",
      icon: "◆",
      label: "Mint Diamond"
    },
    {
      id: "lemon",
      name: "Lemon Bonbon",
      color: "#FF9F1C",
      accent: "#FFD899",
      darkColor: "#B36500",
      icon: "●",
      label: "Lemon Bonbon"
    },
    {
      id: "grape",
      name: "Grape Swirl",
      color: "#A259FF",
      accent: "#DDB8FF",
      darkColor: "#611CB8",
      icon: "✿",
      label: "Grape Swirl"
    },
    {
      id: "azure",
      name: "Azure Crystal",
      color: "#00D2FF",
      accent: "#A6F2FF",
      darkColor: "#007EA7",
      icon: "▲",
      label: "Azure Crystal"
    }
  ],

  // Special Piece IDs
  SPECIAL: {
    STRIPED_H: "striped_h", // Row clear laser
    STRIPED_V: "striped_v", // Col clear laser
    WRAPPED: "wrapped",     // 3x3 blast bomb
    COLOR_BOMB: "color_bomb" // Color clear rainbow star
  },

  // Blocker & Item Types
  BLOCKERS: {
    JELLY: "jelly",           // Under-candy frosted tile
    DOUBLE_JELLY: "jelly_2",   // 2-layer frosted tile
    CHOCOLATE: "chocolate",   // Sweet choco brick
    CRYSTAL: "crystal",       // Hard crystal rock blocker
    INGREDIENT_ACORN: "acorn", // Golden Acorn (must drop to bottom row)
    INGREDIENT_CHERRY: "cherry" // Royal Cherry (must drop to bottom row)
  },

  // Scoring Rules
  SCORES: {
    MATCH_3: 60,
    MATCH_4: 120,
    MATCH_5: 250,
    WRAPPED_BLAST: 180,
    LINE_BLAST: 140,
    COLOR_BOMB: 300,
    JELLY_CLEAR: 100,
    CHOCO_CLEAR: 150,
    CRYSTAL_CLEAR: 180,
    INGREDIENT_DELIVERED: 1000,
    COMBO_BONUS: 50,
    REMAINING_MOVE_BONUS: 1000
  },

  // Praise Phrases for Combos
  PRAISES: [
    "SWEET!",
    "TASTY!",
    "DELICIOUS!",
    "DIVINE!",
    "SUGAR CRUSH!",
    "SENSATIONAL!",
    "LUMINOUS!"
  ],

  // Default Starting Inventory
  DEFAULT_INVENTORY: {
    coins: 350,
    boosters: {
      hammer: 3,
      shuffle: 3,
      rainbow: 2,
      moves: 2,
      beam: 2
    }
  },

  // Booster Costs & Descriptions
  BOOSTER_INFO: {
    hammer: {
      name: "Lollipop Hammer",
      nameHi: "लॉलीपॉप हथौड़ा",
      description: "Smashes any single candy or blocker instantly!",
      cost: 120,
      icon: "🔨"
    },
    shuffle: {
      name: "Sweet Shuffle",
      nameHi: "स्वीट शफल",
      description: "Scrambles the entire board for fresh matches!",
      cost: 90,
      icon: "🔀"
    },
    rainbow: {
      name: "Rainbow Bomb",
      nameHi: "इंद्रधनुष बम",
      description: "Spawns a powerful Color Bomb on any chosen piece!",
      cost: 160,
      icon: "🌟"
    },
    moves: {
      name: "+5 Extra Moves",
      nameHi: "+5 अतिरिक्त चालें",
      description: "Grants 5 extra moves to finish the puzzle!",
      cost: 100,
      icon: "➕"
    },
    beam: {
      name: "Prism Laser",
      nameHi: "प्रिज्म लेजर",
      description: "Clears an entire row and column at once!",
      cost: 140,
      icon: "⚡"
    }
  },

  // Default Audio Settings
  AUDIO_DEFAULTS: {
    masterMute: false,
    musicEnabled: true,
    sfxEnabled: true,
    musicVolume: 0.65,
    sfxVolume: 0.85
  },

  // Internationalization Dictionary (English & Hindi)
  I18N: {
    en: {
      play: "PLAY",
      continue: "CONTINUE",
      newGame: "NEW GAME",
      levelMap: "Level Map",
      dailyChallenge: "Daily Challenge",
      dailyRewards: "Daily Rewards",
      missions: "Missions",
      achievements: "Achievements",
      shop: "Sweet Shop",
      inventory: "Inventory",
      stats: "Profile & Stats",
      settings: "Settings",
      howToPlay: "How to Play",
      about: "About",
      privacyPolicy: "Privacy Policy",
      moves: "Moves",
      score: "Score",
      target: "Target",
      level: "Level",
      startLevel: "START LEVEL",
      replay: "REPLAY",
      nextLevel: "NEXT LEVEL",
      resume: "RESUME",
      retry: "RETRY",
      gardenMap: "GARDEN MAP",
      almostHadIt: "Almost Had It!",
      outOfMoves: "OUT OF MOVES",
      levelComplete: "Level Complete!",
      victory: "VICTORY!",
      pauseTitle: "Game Paused",
      buyMoves: "+5 MOVES (🪙 100)"
    },
    hi: {
      play: "खेलें",
      continue: "जारी रखें",
      newGame: "नया खेल",
      levelMap: "लेवल मैप",
      dailyChallenge: "दैनिक चुनौती",
      dailyRewards: "दैनिक इनाम",
      missions: "मिशन",
      achievements: "उपलब्धियां",
      shop: "स्वीट दुकान",
      inventory: "इन्वेंट्री",
      stats: "प्रोफ़ाइल व आंकड़े",
      settings: "सेटिंग्स",
      howToPlay: "कैसे खेलें",
      about: "के बारे में",
      privacyPolicy: "गोपनीयता नीति",
      moves: "चालें",
      score: "स्कोर",
      target: "लक्ष्य",
      level: "लेवल",
      startLevel: "लेवल शुरू करें",
      replay: "फिर से खेलें",
      nextLevel: "अगला लेवल",
      resume: "जारी रखें",
      retry: "पुनः प्रयास करें",
      gardenMap: "गार्डन मैप",
      almostHadIt: "लगभग जीत गए थे!",
      outOfMoves: "चालें समाप्त!",
      levelComplete: "लेवल पूरा हुआ!",
      victory: "शानदार जीत!",
      pauseTitle: "खेल रुका हुआ है",
      buyMoves: "+5 चालें (🪙 100)"
    }
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = CONFIG;
}
