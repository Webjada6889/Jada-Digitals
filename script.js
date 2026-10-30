
/* =========================================
   JADA DIGITAL
   Main JavaScript File
   ========================================= */


/* ---------- 1. MOBILE NAVIGATION ---------- */

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

// Open and close the mobile navigation menu
if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
        const isExpanded =
            menuToggle.getAttribute("aria-expanded") === "true";

        menuToggle.setAttribute("aria-expanded", String(!isExpanded));
        menuToggle.setAttribute(
            "aria-label",
            isExpanded ? "Open navigation menu" : "Close navigation menu"
        );

        navMenu.classList.toggle("active", !isExpanded);
    });

    // Close the menu after a navigation link is clicked
    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            navMenu.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        });
    });

    // Close the menu when the user clicks outside it
    document.addEventListener("click", function (event) {
        const clickedInsideMenu = navMenu.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {
            navMenu.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        }
    });

    // Close the mobile menu when returning to desktop layout
    window.addEventListener("resize", function () {
        if (window.innerWidth > 760) {
            navMenu.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        }
    });
}


/* ---------- 2. AUTOMATIC COPYRIGHT YEAR ---------- */

const currentYear = document.getElementById("current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* ---------- 3. CONTACT FORM ---------- */

// Replace this with your real email address before publishing.
const CONTACT_EMAIL = "YOUR_EMAIL@example.com";

const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get the values entered by the visitor
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const service = document.getElementById("service").value;
        const message = document.getElementById("message").value.trim();

        // Check that required fields are not empty
        if (!name || !email || !message) {
            alert("Please complete all required fields.");
            return;
        }

        // Validate the email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Prevent opening an email with the placeholder address
        if (
            !CONTACT_EMAIL ||
            CONTACT_EMAIL === "YOUR_EMAIL@example.com"
        ) {
            alert(
                "The contact form is almost ready! " +
                "Please add your real email address in script.js."
            );
            return;
        }

        // Prepare the email subject
        const subject = encodeURIComponent(
            "Website Enquiry from " + name
        );

        // Prepare the email body
        const body = encodeURIComponent(
            "Hello Aliyu,\n\n" +
            "You have received a new enquiry from your JADA DIGITAL website.\n\n" +
            "Name: " + name + "\n" +
            "Email: " + email + "\n" +
            "Service requested: " + (service || "Not specified") + "\n\n" +
            "Project details:\n" +
            message +
            "\n\nSent from the JADA DIGITAL website."
        );

        // Open the visitor's default email application
        const mailtoLink =
            "mailto:" + CONTACT_EMAIL +
            "?subject=" + subject +
            "&body=" + body;

        window.location.href = mailtoLink;
    });
}


/* ---------- 4. ACTIVE NAVIGATION LINKS ---------- */

// Highlight the navigation link for the section
// currently visible on the screen.

const pageSections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window && pageSections.length > 0) {
    const sectionObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;

                    navLinks.forEach(function (link) {
                        const linkTarget = link.getAttribute("href");

                        if (linkTarget === "#" + sectionId) {
                            link.classList.add("active");
                        } else {
                            link.classList.remove("active");
                        }
                    });
                }
            });
        },
        {
            root: null,
            rootMargin: "-30% 0px -60% 0px",
            threshold: 0
        }
    );

    pageSections.forEach(function (section) {
        sectionObserver.observe(section);
    });
}


/* ---------- 5. CONSOLE MESSAGE ---------- */

console.log(
    "%cJADA DIGITAL",
    "color: #36c878; font-size: 22px; font-weight: bold;"
);

console.log(
    "Build Digital. Grow Beyond."
);
