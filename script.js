
/* Enter the WhatsApp number that should receive the message */
const myNumber = "2347026571314";

// Find the three buttons on the page
const yesButton = document.getElementById("yesButton");
const talkButton = document.getElementById("talkButton");
const laterButton = document.getElementById("laterButton");

// Find the response message
const response = document.getElementById("response");

// Function to open WhatsApp with a prepared message
function replyToMe(message) {
    const whatsappLink =
        "https://wa.me/" + myNumber +
        "?text=" + encodeURIComponent(message);

    // Open WhatsApp in a new tab
    window.open(whatsappLink, "_blank");
}

// If Yaya agrees to help
yesButton.addEventListener("click", function() {
    response.textContent =
        "Thank you, Yaya. WhatsApp is opening.";

    replyToMe(
        "I agree to help you with the ₦7,000 for your shoes."
    );
});

// If Yaya wants to discuss the request
talkButton.addEventListener("click", function() {
    response.textContent =
        "Thank you, Yaya. WhatsApp is opening.";

    replyToMe(
        "Let's talk about your request for ₦7,000 for shoes."
    );
});

// If Yaya cannot help right now
laterButton.addEventListener("click", function() {
    response.textContent =
        "Thank you for letting me know, Yaya.";

    replyToMe(
        "I cannot help with the ₦7,000 for shoes right now."
    );
});
