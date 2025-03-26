document.addEventListener("DOMContentLoaded", () => {
     // Dark Mode Toggle
     const darkModeToggle = document.getElementById("dark-mode-toggle");
     darkModeToggle.addEventListener("click", () => {
         document.body.classList.toggle("dark-mode");
         localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
     });
     if (localStorage.getItem("darkMode") === "true") {
         document.body.classList.add("dark-mode");
     }
 
    // User Profile Handling
    const userForm = document.getElementById("user-form");
    const profileSummary = document.getElementById("profile-summary");
    const deleteProfileBtn = document.getElementById("delete-profile");

    userForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const age = document.getElementById("age").value;
        const weight = document.getElementById("weight").value;
        const goal = document.getElementById("goal").value;

        localStorage.setItem("userProfile", JSON.stringify({ name, age, weight, goal }));
        displayProfile();
    });

    function displayProfile() {
        const profile = JSON.parse(localStorage.getItem("userProfile"));
        if (profile) {
            document.getElementById("summary-name").textContent = profile.name;
            document.getElementById("summary-age").textContent = profile.age;
            document.getElementById("summary-weight").textContent = profile.weight;
            document.getElementById("summary-goal").textContent = profile.goal;
            profileSummary.style.display = "block";
        }
    }

    deleteProfileBtn.addEventListener("click", () => {
        localStorage.removeItem("userProfile");
        profileSummary.style.display = "none";
    });

    displayProfile();

    // Suggested Workouts
    const workoutList = document.getElementById("workout-list");
    const customizeBtn = document.getElementById("customizeWorkout");

    customizeBtn.addEventListener("click", () => {
        let newPlan = prompt("Enter your custom workout plan (separate exercises with commas):");
        if (newPlan) {
            let exercises = newPlan.split(",").map(ex => ex.trim());
            workoutList.innerHTML = "";
            exercises.forEach(ex => {
                let li = document.createElement("li");
                li.innerHTML = `${ex} - <button class='delete-btn'>❌</button>`;
                workoutList.appendChild(li);
            });
        }
    });

    workoutList.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-btn")) {
            event.target.parentElement.remove();
        }
    });

    // Progress Tracking
    const progressLog = document.getElementById("progress-log");
    const saveProgressBtn = document.getElementById("save-progress");
    const progressList = document.getElementById("progress-list");

    function displayProgress() {
        progressList.innerHTML = "";
        let progress = JSON.parse(localStorage.getItem("progressLog")) || [];
        progress.forEach((entry, index) => {
            const li = document.createElement("li");
            li.innerHTML = `${entry} <button class='delete-progress' data-index='${index}'>❌</button>`;
            progressList.appendChild(li);
        });
    }

    saveProgressBtn.addEventListener("click", () => {
        let logEntry = progressLog.value.trim();
        if (logEntry) {
            let progress = JSON.parse(localStorage.getItem("progressLog")) || [];
            progress.push(logEntry);
            localStorage.setItem("progressLog", JSON.stringify(progress));
            displayProgress();
            progressLog.value = "";
            showMotivationalMessage();
            showConfetti();
        }
    });

    progressList.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-progress")) {
            let progress = JSON.parse(localStorage.getItem("progressLog")) || [];
            progress.splice(event.target.dataset.index, 1);
            localStorage.setItem("progressLog", JSON.stringify(progress));
            displayProgress();
        }
    });

    displayProgress();

    // Motivational Quotes
    const messages = [
        "Keep pushing! You're stronger than you think. 💪",
        "Every rep counts! Stay consistent. 🔥",
        "You're making progress! Keep going! 🚀",
        "Small progress is still progress. Don't stop! 🏋️",
        "Believe in yourself. You’ve got this! ✨",
        "Pain today, strength tomorrow. Keep at it! 💯"
    ];

    function showMotivationalMessage() {
        const randomIndex = Math.floor(Math.random() * messages.length);
        const quoteElement = document.getElementById("motivational-quote");
        quoteElement.textContent = messages[randomIndex];
        quoteElement.style.color = "green";
        quoteElement.style.transition = "color 0.5s ease-in-out";
        setTimeout(() => {
            quoteElement.style.color = "";
        }, 2000);
    }

    document.getElementById("new-quote").addEventListener("click", showMotivationalMessage);

    // Confetti Effect
    function showConfetti() {
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 },
        });
    }
});
