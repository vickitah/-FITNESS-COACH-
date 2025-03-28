document.addEventListener("DOMContentLoaded", async () => {
    console.log("Fitness Coach Loaded!");

    // Fetch user data (name and dark mode preference) from db.json
    try {
        const response = await fetch("http://localhost:3000/user");
        const userData = await response.json();

        // Set the user's name
        let userName = userData.name || prompt("Enter your name:");
        if (userName && !userData.name) {
            await fetch("http://localhost:3000/user", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: userName })
            });
        }
        document.querySelector("h2").textContent = `Welcome, ${userName}! Ready to start your workout?`;

        // Set dark mode if enabled
        if (userData.darkMode === "enabled") {
            document.body.classList.add("dark-mode");
            darkModeToggle.textContent = "Light Mode";
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
});

// Dark mode toggle
const darkModeToggle = document.getElementById("dark-mode-toggle");

darkModeToggle.addEventListener("click", async () => {
    const body = document.body;
    const newMode = body.classList.contains("dark-mode") ? "disabled" : "enabled";

    body.classList.toggle("dark-mode");
    darkModeToggle.textContent = newMode === "enabled" ? "Light Mode" : "Dark Mode";

    // Update dark mode setting in db.json
    try {
        await fetch("http://localhost:3000/user", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ darkMode: newMode })
        });
    } catch (error) {
        console.error("Error updating dark mode:", error);
    }
});
