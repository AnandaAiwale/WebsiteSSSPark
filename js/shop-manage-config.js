/**
 * ============================================================================
 * Smart Garment Shop Manager — APK Release & Download Config
 * ============================================================================
 * ADMIN GUIDE — How to publish a new APK release:
 * 1. Replace `downloads/app-release.apk` with your new build (or change `apkUrl`
 *    below to point to a new file path or hosted release URL).
 * 2. Update `version`, `versionCode`, `fileSize`, `lastUpdated`, and
 *    `apkFileName` below.
 * 3. Save and deploy. All version badges, metadata pills, and Download APK
 *    buttons on shop-manage.html update dynamically from this object.
 * ============================================================================
 */
window.SHOP_MANAGE_APK_CONFIG = {
  appName: "Smart Garment Shop Manager",
  packageId: "com.shivshambhusoftware.shopmanger",
  version: "v1.0",
  versionCode: 1,
  fileSize: "35.6 MB",
  lastUpdated: "November 12, 2026",
  minAndroid: "Android 7.0+",
  apkUrl: "downloads/app-release.apk?v=2",
  apkFileName: "Smart-Garment-Shop-Manager-v1.0.apk"
};

(function () {
  var cfg = window.SHOP_MANAGE_APK_CONFIG;
  if (!cfg) return;

  function setText(selector, value) {
    var nodes = document.querySelectorAll(selector);
    nodes.forEach(function (el) {
      el.textContent = value;
    });
  }

  setText("[data-apk-version]", cfg.version);
  setText("[data-apk-size]", cfg.fileSize);
  setText("[data-apk-updated]", cfg.lastUpdated);
  setText("[data-apk-android]", cfg.minAndroid);
  setText("[data-apk-filename]", cfg.apkFileName);

  var downloadBtns = document.querySelectorAll("[data-apk-download]");
  var downloadNote = document.getElementById("sm-download-feedback");

  downloadBtns.forEach(function (btn) {
    btn.setAttribute("href", cfg.apkUrl);
    if (cfg.apkFileName) {
      btn.setAttribute("download", cfg.apkFileName);
    }

    btn.addEventListener("click", function () {
      if (!downloadNote) return;
      downloadNote.hidden = false;
      downloadNote.textContent =
        "Downloading " +
        cfg.apkFileName +
        " (" +
        cfg.fileSize +
        "). Open the file from your Downloads folder and enable 'Install Unknown Apps' if Android asks.";
    });
  });
})();
