document.addEventListener("DOMContentLoaded", () => {
    console.log("Fitness Coach Loaded!");
  

    
    const userName = prompt("Enter your name:");
    if (userName) {
        document.querySelector("h2").textContent = `Welcome, ${userName}! Ready to start your workout?`;
    }
});

const darkModeToggle = document.getElementById("dark-mode-toggle");
const body = document.body;


if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark-mode");
    darkModeToggle.textContent = "Light Mode";
}

darkModeToggle.addEventListener("click", () => {
    if (body.classList.contains("dark-mode")) {
        body.classList.remove("dark-mode");
        darkModeToggle.textContent = "Dark Mode";
        localStorage.setItem("darkMode", "disabled");
    } else {
        body.classList.add("dark-mode");
        darkModeToggle.textContent = "Light Mode";
        localStorage.setItem("darkMode", "enabled");
    }
});
