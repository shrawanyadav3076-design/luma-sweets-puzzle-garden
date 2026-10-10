/**
 * LUMA SWEETS: PUZZLE GARDEN
 * Interactive Level Map with 6 Themed Worlds & Pathway Progression
 */

const LevelMap = {
  renderMap(containerId = "level-map-container") {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";

    const unlocked = StorageManager.data.unlockedLevel || 1;
    const pathWrapper = document.createElement("div");
    pathWrapper.className = "map-path-wrapper";

    // 1. Render World Banners along the vertical route
    CONFIG.WORLDS.forEach((world) => {
      const banner = document.createElement("div");
      banner.className = "world-banner";
      banner.id = `world-banner-${world.id}`;

      // Calculate vertical position for the world header
      // World 1 is at bottom (~2420px), World 6 is at top (~120px)
      const topLevelIndex = (world.id - 1) * 5;
      const yPos = 2420 - (topLevelIndex * 78);
      banner.style.top = `${yPos}px`;

      const lang = StorageManager.data.settings.language || "en";
      const worldName = lang === "hi" && world.nameHi ? world.nameHi : world.name;

      banner.innerHTML = `
        <div class="world-banner-pill" style="border-color: ${world.themeColor}">
          <span class="world-icon">${world.icon}</span>
          <span class="world-title">World ${world.id}: ${worldName}</span>
        </div>
      `;
      pathWrapper.appendChild(banner);
    });

    // 2. Build 30 level nodes in an undulating garden path
    LEVELS_DATA.forEach((lvl, index) => {
      const isUnlocked = lvl.id <= unlocked;
      const isCurrent = lvl.id === unlocked;
      const stars = StorageManager.getLevelStars(lvl.id);
      const isMilestone = lvl.id % 5 === 0;

      const node = document.createElement("div");
      node.className = `level-node ${isUnlocked ? "unlocked" : "locked"} ${isCurrent ? "current" : ""} ${isMilestone ? "milestone" : ""}`;
      node.dataset.levelId = lvl.id;

      // Position in sinuous winding path
      const wave = Math.sin((index / 29) * Math.PI * 6);
      const xOffsetPercent = 50 + wave * 32;
      node.style.left = `${xOffsetPercent}%`;

      // Vertical position (Level 1 at bottom 2320px, Level 30 at 58px)
      const yPos = 2320 - (index * 78);
      node.style.top = `${yPos}px`;

      let innerHTML = "";
      if (isMilestone) {
        innerHTML += `<div class="milestone-crown">${lvl.id === 30 ? '👑' : '⭐'}</div>`;
      }

      innerHTML += `<div class="level-badge">${lvl.id}</div>`;

      if (isUnlocked) {
        innerHTML += `
          <div class="stars-row">
            <span class="star-icon ${stars >= 1 ? 'earned' : 'empty'}">★</span>
            <span class="star-icon ${stars >= 2 ? 'earned' : 'empty'}">★</span>
            <span class="star-icon ${stars >= 3 ? 'earned' : 'empty'}">★</span>
          </div>
        `;
      } else {
        innerHTML += `<div class="lock-icon">🔒</div>`;
      }

      node.innerHTML = innerHTML;

      // Click to preview & play
      node.addEventListener("click", () => {
        Sound.playButton();
        if (isUnlocked) {
          UI.showLevelPreviewModal(lvl.id);
        } else {
          UI.showToast(`Level ${lvl.id} is locked. Complete earlier levels to unlock!`);
        }
      });

      pathWrapper.appendChild(node);
    });

    container.appendChild(pathWrapper);

    // Scroll automatically into view of current level
    setTimeout(() => {
      const currentNode = container.querySelector(".level-node.current");
      if (currentNode) {
        currentNode.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 150);
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = LevelMap;
}
