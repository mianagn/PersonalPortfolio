let currentSection = 0; // Tracks the current section
const sections = document.querySelectorAll(".section");
const navButtons = document.querySelectorAll(".button-link");
let isScrolling = false; // Cooldown flag

// Scroll to a specific section
function scrollToSection(index) {
    if (index < 0 || index >= sections.length || isScrolling) return;

    isScrolling = true;
    sections[index].scrollIntoView({ behavior: "smooth" });

    // Highlight the active button
    updateActiveButton(index);

    // Update the current section
    currentSection = index;

    // Cooldown to prevent multiple scrolls
    setTimeout(() => {
        isScrolling = false;
    }, 100); // Adjust cooldown time as needed
}

// Update the active button based on the current section
function updateActiveButton(index) {
    navButtons.forEach((btn, i) => {
        btn.classList.toggle("active", i === index);
    });
}

// Handle scroll events
window.addEventListener("wheel", (event) => {
    if (event.deltaY > 0) {
        scrollToSection(currentSection + 1); // Scroll down
    } else {
        scrollToSection(currentSection - 1); // Scroll up
    }
});

// Handle navigation button clicks
navButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => scrollToSection(index));
});

// Detect the current section in view on scroll
window.addEventListener("scroll", () => {
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
            updateActiveButton(index);
            currentSection = index;
        }
    });
});

// Initialize the active button on page load
document.addEventListener("DOMContentLoaded", () => {
    updateActiveButton(currentSection); // Highlight the "Home" button
});