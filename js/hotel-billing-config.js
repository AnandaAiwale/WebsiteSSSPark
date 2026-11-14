/**
 * ============================================================================
 * Hotel Billing Software — APK Release & Download Config
 * ============================================================================
 * ADMIN GUIDE — How to publish a new APK release:
 * 1. Replace `downloads/hotel-billing.apk` with your new build (or change `apkUrl`
 *    below to point to a new file path or hosted release URL).
 * 2. Update `version`, `fileSize`, `lastUpdated`, and `apkFileName` below.
 * 3. Save and deploy. All version badges, metadata pills, and Download APK
 *    buttons on hotel-billing.html update dynamically from this object.
 * ============================================================================
 */
window.HOTEL_BILLING_APK_CONFIG = {
  appName: "Hotel Billing Software",
  packageId: "com.shivshambhusoftware.hotelbilling",
  version: "v1.0",
  versionCode: 1,
  fileSize: "12.5 MB",
  lastUpdated: "November 14, 2026",
  minAndroid: "Android 7.0+",
  apkUrl: "downloads/hotel-billing.apk?v=1",
  apkFileName: "Hotel-Billing-Software-v1.0.apk",
  whatsappNumber: "919604200066",
  whatsappMessage: "Hi Shivshambhu Software, I am interested in Hotel Billing Software Android App. Please guide me."
};

(function () {
  var cfg = window.HOTEL_BILLING_APK_CONFIG;
  if (!cfg) return;

  function setText(selector, value) {
    var nodes = document.querySelectorAll(selector);
    nodes.forEach(function (el) {
      el.textContent = value;
    });
  }

  setText("[data-hotel-apk-version]", cfg.version);
  setText("[data-hotel-apk-size]", cfg.fileSize);
  setText("[data-hotel-apk-updated]", cfg.lastUpdated);
  setText("[data-hotel-apk-android]", cfg.minAndroid);
  setText("[data-hotel-apk-filename]", cfg.apkFileName);

  var downloadBtns = document.querySelectorAll("[data-hotel-apk-download]");
  var downloadNote = document.getElementById("hotel-download-feedback");

  downloadBtns.forEach(function (btn) {
    btn.setAttribute("href", cfg.apkUrl);
    btn.setAttribute("download", cfg.apkFileName);

    btn.addEventListener("click", function () {
      if (downloadNote) {
        downloadNote.textContent =
          "Starting Hotel Billing Software APK (" + cfg.version + " • " + cfg.fileSize + ") download...";
        downloadNote.hidden = false;
        setTimeout(function () {
          downloadNote.textContent =
            "Download complete. Open your notification panel or Downloads folder to install. Enable 'Install Unknown Apps' if prompted.";
        }, 3500);
      }
    });
  });
})();
