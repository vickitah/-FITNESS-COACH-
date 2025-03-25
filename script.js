document.addEventListener("DOMContentLoaded", () => {
    let darkModeToggle = document.getElementById("darkModeToggle");

    // Check if dark mode was enabled before
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
        darkModeToggle.textContent = "Light Mode"; // Update button text
    }

    // Dark mode toggle functionality
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
            darkModeToggle.textContent = "Light Mode"; // Change button text
        } else {
            localStorage.setItem("darkMode", "disabled");
            darkModeToggle.textContent = "Dark Mode"; // Change button text
        }
    });
});
