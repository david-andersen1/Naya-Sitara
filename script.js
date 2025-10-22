// Mobile Menu Toggle
function toggleMenu() {
    let menu = document.getElementById("mobile-menu");
    let icon = document.querySelector(".menu-icon");
    let body = document.body; // Get the body element

    menu.classList.toggle("active");
    body.classList.toggle("no-scroll"); // Disable scrolling when menu is active

    // Toggle between ☰ and × icons
    icon.textContent = menu.classList.contains("active") ? "×" : "☰";
}

// Close the mobile menu when a menu item is clicked
function closeMenu() {
    let menu = document.getElementById("mobile-menu");
    let icon = document.querySelector(".menu-icon");
    let body = document.body; // Get the body element

    menu.classList.remove("active");
    body.classList.remove("no-scroll"); // Re-enable scrolling

    // Reset the icon to ☰
    icon.textContent = "☰";
}

// Ensure DOM is fully loaded before executing scripts
document.addEventListener("DOMContentLoaded", function() {

    // Dynamically set the current year in the footer
    let yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Contact Form Submission
    let contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", async function(event) {
            event.preventDefault();

            let form = event.target;
            let submitButton = form.querySelector("button");
            let successMessage = document.getElementById("success-message");

            submitButton.disabled = true; // Prevent duplicate submissions

            try {
                let formData = new FormData(form);
                let response = await fetch(form.action, {
                    method: "POST",
                    body: formData,
                    headers: { "Accept": "application/json" }
                });

                if (response.ok) {
                    successMessage.style.display = "block"; // Show success message
                    form.reset(); // Clear form fields
                } else {
                    alert("Error sending message. Please try again.");
                }
            } catch (error) {
                alert("Network error. Please check your connection and try again.");
            } finally {
                submitButton.disabled = false; // Re-enable button
            }
        });
    }

    // Ensure smooth scrolling to the correct section if navigating from another page
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(() => {
                target.scrollIntoView({ behavior: "smooth" });
            }, 100); // Small delay to ensure page is loaded
        }
    }

    // Smooth scroll for all anchor links on the page (even on the homepage)
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
});
