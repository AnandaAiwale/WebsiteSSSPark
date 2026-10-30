(function () {
  "use strict";

  const header = document.querySelector(".site-header");
  const nav = document.getElementById("site-nav");
  const toggle = document.querySelector(".nav-toggle");
  const yearEl = document.getElementById("year");
  const productGrid = document.getElementById("product-grid");
  const teamGrid = document.getElementById("team-grid");
  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("form-status");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* Mobile nav */
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
      nav.classList.toggle("is-open", !open);
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
        nav.classList.remove("is-open");
      });
    });
  }

  /* Sticky header state */
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Render products from js/products.js */
  function renderProducts() {
    if (!productGrid || !Array.isArray(window.NEXUS_PRODUCTS)) return;

    if (window.NEXUS_PRODUCTS.length === 1) {
      productGrid.classList.add("product-grid--single");
    }

    productGrid.innerHTML = window.NEXUS_PRODUCTS.map(function (product) {
      const href = product.link || "#contact";
      return (
        '<a class="product-card product-card--compact reveal" href="' +
        escapeAttr(href) +
        '">' +
        '<span class="product-tag">' +
        escapeHtml(product.tag) +
        "</span>" +
        "<h3>" +
        escapeHtml(product.name) +
        "</h3>" +
        "<p>" +
        escapeHtml(product.description) +
        "</p>" +
        '<span class="product-card-cta">View product</span>' +
        "</a>"
      );
    }).join("");
  }

  /* Render team from js/team.js */
  function renderTeam() {
    if (!teamGrid || !Array.isArray(window.NEXUS_TEAM)) return;

    teamGrid.innerHTML = window.NEXUS_TEAM.map(function (member) {
      return (
        '<article class="team-member reveal">' +
        '<img class="team-photo" src="' +
        escapeAttr(member.photo) +
        '" alt="' +
        escapeAttr(member.name) +
        '" width="400" height="400" loading="lazy" />' +
        "<h3>" +
        escapeHtml(member.name) +
        "</h3>" +
        '<p class="team-role">' +
        escapeHtml(member.role) +
        "</p>" +
        "</article>"
      );
    }).join("");
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function escapeAttr(value) {
    return escapeHtml(value).replace(/'/g, "&#39;");
  }

  renderProducts();
  renderTeam();

  /* Scroll reveal */
  const revealEls = function () {
    return document.querySelectorAll(".reveal");
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    // Observe after dynamic content is injected
    revealEls().forEach(function (el) {
      observer.observe(el);
    });

    document.querySelectorAll(".section .eyebrow, .section h2, .service-cards li").forEach(function (el) {
      el.classList.add("reveal");
      observer.observe(el);
    });
  } else {
    revealEls().forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* Open Gmail with the text the person typed, addressed to the company inbox. */
  var inbox = "shivshambhusoft@gmail.com";

  function openMail(subject, body) {
    var gmail =
      "https://mail.google.com/mail/?view=cm&fs=1&to=" +
      encodeURIComponent(inbox) +
      "&su=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body);
    var opened = window.open(gmail, "_blank", "noopener");
    if (!opened) {
      window.location.href =
        "mailto:" + inbox + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    }
  }

  /* Contact form */
  if (form && statusEl) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const nameInput = form.querySelector("#name");
      const emailInput = form.querySelector("#email");
      const messageInput = form.querySelector("#message");
      const fields = [nameInput, emailInput, messageInput];

      fields.forEach(function (field) {
        field.classList.remove("is-invalid");
      });
      statusEl.hidden = true;
      statusEl.className = "form-status";

      let valid = true;

      if (!nameInput.value.trim()) {
        nameInput.classList.add("is-invalid");
        valid = false;
      }

      const email = emailInput.value.trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailInput.classList.add("is-invalid");
        valid = false;
      }

      if (!messageInput.value.trim()) {
        messageInput.classList.add("is-invalid");
        valid = false;
      }

      if (!valid) {
        statusEl.hidden = false;
        statusEl.classList.add("is-error");
        statusEl.textContent = "Please fill in your name, a valid email, and a message.";
        return;
      }

      var messageText =
        "Name: " +
        nameInput.value.trim() +
        "\nEmail: " +
        email +
        "\n\n" +
        messageInput.value.trim();
      openMail("Website inquiry from " + nameInput.value.trim(), messageText);
      statusEl.hidden = false;
      statusEl.classList.add("is-success");
      statusEl.textContent =
        "Gmail opened with your message to shivshambhusoft@gmail.com. Press Send there.";
      form.reset();
    });
  }

  /* SSSPark order form */
  const orderForm = document.getElementById("order-form");
  const orderStatus = document.getElementById("order-status");

  if (orderForm && orderStatus) {
    orderForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const nameInput = orderForm.querySelector("#order-name");
      const phoneInput = orderForm.querySelector("#order-phone");
      const emailInput = orderForm.querySelector("#order-email");
      const cityInput = orderForm.querySelector("#order-city");
      const vehicleInput = orderForm.querySelector("#order-vehicle");
      const qtyInput = orderForm.querySelector("#order-qty");
      const notesInput = orderForm.querySelector("#order-notes");
      const requiredFields = [nameInput, phoneInput, emailInput, cityInput, vehicleInput, qtyInput];

      requiredFields.forEach(function (field) {
        field.classList.remove("is-invalid");
      });
      orderStatus.hidden = true;
      orderStatus.className = "form-status";

      let valid = true;

      if (!nameInput.value.trim()) {
        nameInput.classList.add("is-invalid");
        valid = false;
      }

      const phone = phoneInput.value.replace(/\s+/g, "");
      if (!/^[0-9+\-()]{8,16}$/.test(phone)) {
        phoneInput.classList.add("is-invalid");
        valid = false;
      }

      const email = emailInput.value.trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailInput.classList.add("is-invalid");
        valid = false;
      }

      if (!cityInput.value.trim()) {
        cityInput.classList.add("is-invalid");
        valid = false;
      }

      if (!vehicleInput.value) {
        vehicleInput.classList.add("is-invalid");
        valid = false;
      }

      const qty = Number(qtyInput.value);
      if (!qty || qty < 1) {
        qtyInput.classList.add("is-invalid");
        valid = false;
      }

      if (!valid) {
        orderStatus.hidden = false;
        orderStatus.classList.add("is-error");
        orderStatus.textContent = "Please add a name, phone, email, city, vehicle, and at least one sticker.";
        return;
      }

      var orderText =
        "Name: " +
        nameInput.value.trim() +
        "\nPhone: " +
        phone +
        "\nEmail: " +
        email +
        "\nCity: " +
        cityInput.value.trim() +
        "\nVehicle: " +
        vehicleInput.value +
        "\nStickers: " +
        String(qty) +
        "\n\n" +
        notesInput.value.trim();
      openMail("SSSPark sticker order from " + nameInput.value.trim(), orderText);
      orderStatus.hidden = false;
      orderStatus.classList.add("is-success");
      orderStatus.textContent =
        "Gmail opened with your order to shivshambhusoft@gmail.com. Press Send there.";
      orderForm.reset();
      qtyInput.value = "1";
    });
  }

  /* Interactive Category Filter in Products Showcase */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".product-item-card");

  if (filterBtns.length && productCards.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const filter = btn.getAttribute("data-filter");

        filterBtns.forEach(function (b) {
          b.classList.remove("is-active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("is-active");
        btn.setAttribute("aria-selected", "true");

        productCards.forEach(function (card) {
          const category = card.getAttribute("data-category") || "";
          if (filter === "all" || category.indexOf(filter) !== -1) {
            card.style.display = "";
            card.style.opacity = "0";
            card.style.transform = "translateY(12px)";
            setTimeout(function () {
              card.style.transition = "opacity 0.3s ease, transform 0.3s ease";
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
              card.classList.add("is-visible");
            }, 40);
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }

  /* Pre-fill Contact Form Message from Product Card CTAs */
  const prefillBtns = document.querySelectorAll("[data-prefill]");
  const messageArea = document.getElementById("message");

  if (prefillBtns.length && messageArea) {
    prefillBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const type = btn.getAttribute("data-prefill");
        let prefillText = "";
        if (type === "medical") {
          prefillText = "Hi Shivshambhu Software team,\n\nI would like to request a demo and feature details for the Medical Store Desktop Application.\n\nStore Name:\nCity:\nPhone:";
        } else if (type === "cashcount") {
          prefillText = "Hi Shivshambhu Software team,\n\nI am interested in early access and updates for the CashCount App.\n\nPlease notify me upon release.";
        } else if (type === "custom") {
          prefillText = "Hi Shivshambhu Software team,\n\nI would like to discuss a custom software project for our business.\n\nProject Overview:";
        }

        if (prefillText && (!messageArea.value.trim() || messageArea.value.indexOf("Hi Shivshambhu") !== -1)) {
          messageArea.value = prefillText;
          setTimeout(function () {
            messageArea.focus();
          }, 300);
        }
      });
    });
  }
})();
