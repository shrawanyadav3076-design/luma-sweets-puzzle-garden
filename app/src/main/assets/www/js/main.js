/**
 * LUMA SWEETS: PUZZLE GARDEN
 * Application Entry Point & Native Device Bridge
 */

// Global Error Safeguard - prevent blank screen
window.addEventListener("error", (event) => {
  console.error("Luma Sweets Runtime Error:", event.error || event.message);
  try {
    if (typeof UI !== "undefined" && UI.showToast) {
      UI.showToast("Oops! An issue occurred, recovering game state...");
    }
  } catch (_) {}
});

window.addEventListener("unhandledrejection", (event) => {
  console.error("Luma Sweets Unhandled Promise:", event.reason);
});

window.addEventListener("DOMContentLoaded", () => {
  try {
    // 1. Initialize UI
    UI.init();

    // 2. Sync stored audio preferences to Sound system immediately
    if (StorageManager && StorageManager.data && StorageManager.data.settings) {
      Sound.updateSettings(StorageManager.data.settings);
    }
  } catch (initErr) {
    console.error("Initialization error:", initErr);
  }

  // 3. Unlock Audio on first user interaction
  const unlockAudio = () => {
    Sound.initContext();
    if (StorageManager.data.settings.musicEnabled && !StorageManager.data.settings.masterMute) {
      Sound.startMusic();
    }
    window.removeEventListener("pointerdown", unlockAudio);
    window.removeEventListener("keydown", unlockAudio);
  };
  window.addEventListener("pointerdown", unlockAudio, { once: true });
  window.addEventListener("keydown", unlockAudio, { once: true });

  // 4. Native Android Bridge vibration hook
  window.triggerDeviceVibrate = function(durationMs = 40) {
    if (!StorageManager.data.settings.vibrate) return;
    try {
      if (window.AndroidBridge && typeof window.AndroidBridge.vibrate === "function") {
        window.AndroidBridge.vibrate(durationMs);
      } else if (navigator.vibrate) {
        navigator.vibrate(durationMs);
      }
    } catch (_) {}
  };

  // 5. Register PWA Service Worker if in secure context
  if ("serviceWorker" in navigator && (window.location.protocol === "https:" || window.location.hostname === "localhost")) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch(err => {
        console.log("SW registration skipped:", err);
      });
    });
  }

  // 6. Check daily reward notification
  const dailyStatus = StorageManager.getDailyRewardStatus();
  if (dailyStatus.canClaim) {
    const giftBadge = document.getElementById("home-gift-badge");
    if (giftBadge) giftBadge.style.display = "block";
  }

  console.log("🌸 Luma Sweets: Puzzle Garden initialized successfully!");
});
