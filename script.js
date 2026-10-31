(() => {
  "use strict";

  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const contactForm = document.getElementById("contact-form");
  const formNote = document.getElementById("form-note");
  const yearElement = document.getElementById("current-year");

  // Update the copyright year automatically.
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Mobile navigation.
  function closeMenu() {
    if (!menuToggle || !navMenu) return;

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    navMenu.classList.remove("is-open");
  }

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      const nextState = !isOpen;

      menuToggle.setAttribute("aria-expanded", String(nextState));
      menuToggle.setAttribute(
        "aria-label",
        nextState ? "Close navigation menu" : "Open navigation menu"
      );

      navMenu.classList.toggle("is-open", nextState);
    });

    // Close the menu after clicking a navigation link.
    navLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Close the menu when clicking outside it.
    document.addEventListener("click", (event) => {
      if (
        navMenu.classList.contains("is-open") &&
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    // Close the menu with the Escape key.
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navMenu.classList.contains("is-open")) {
        closeMenu();
        menuToggle.focus();
      }
    });

    // Close the mobile menu when returning to desktop width.
    window.addEventListener("resize", () => {
      if (window.innerWidth > 720) closeMenu();
    });
  }

  // Highlight the navigation link for the section currently in view.
  const sections = document.querySelectorAll("main section[id]");

  if ("IntersectionObserver" in window && sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          navLinks.forEach((link) => {
            const isCurrent =
              link.getAttribute("href") === `#${entry.target.id}`;

            link.classList.toggle("active", isCurrent);

            if (isCurrent) {
              link.setAttribute("aria-current", "location");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px"
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // Send contact enquiries through WhatsApp.
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const nameField = document.getElementById("name");
      const emailField = document.getElementById("email");
      const serviceField = document.getElementById("service");
      const messageField = document.getElementById("message");

      const name = nameField.value.trim();
      const email = emailField.value.trim();
      const service = serviceField.value.trim() || "Not specified";
      const message = messageField.value.trim();

      // Validate the visitor's name.
      if (name.length < 2) {
        nameField.setCustomValidity(
          "Please enter your name (at least 2 characters)."
        );
        nameField.reportValidity();
        nameField.focus();
        return;
      }

      nameField.setCustomValidity("");

      // Validate the email address.
      if (!emailField.checkValidity()) {
        emailField.reportValidity();
        emailField.focus();
        return;
      }

      // Validate the project message.
      if (message.length < 5) {
        messageField.setCustomValidity(
          "Please add a few details about your project."
        );
        messageField.reportValidity();
        messageField.focus();
        return;
      }

      messageField.setCustomValidity("");

      // Your WhatsApp number: country code + number.
      // Do not add a plus sign or spaces.
      const whatsappNumber = "2347026571314";

      // Prepare the message for WhatsApp.
      const whatsappText = [
        "Hello Aliyu, I found you through the JADA DIGITAL website.",
        "",
        `My name is ${name}.`,
        `Email: ${email}`,
        `Service needed: ${service}`,
        "",
        "Project details:",
        message,
        "",
        "Thank you."
      ].join("\n");

      // Encode the message so it works correctly in the WhatsApp URL.
      const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

      if (formNote) {
        formNote.textContent =
          "Your WhatsApp message is ready. Review the details in WhatsApp and tap Send to submit your enquiry.";
      }

      // Open WhatsApp in a new tab or window.
      // The visitor must still press Send inside WhatsApp.
      const whatsappWindow = window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
      );

      // Fallback if the browser blocks the new window.
      if (!whatsappWindow) {
        window.location.href = whatsappURL;
      }
    });

    // Clear validation messages when the visitor edits a field.
    ["name", "email", "message"].forEach((id) => {
      const field = document.getElementById(id);

      if (field) {
        field.addEventListener("input", () => {
          field.setCustomValidity("");
        });
      }
    });
  }
})();
