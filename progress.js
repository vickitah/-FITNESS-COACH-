document.addEventListener("DOMContentLoaded", function () {
    const userForm = document.getElementById("user-form");
    const profileSummary = document.getElementById("profile-summary");
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const saveProgressBtn = document.getElementById("save-progress");
    const progressLog = document.getElementById("progress-log");
    const progressList = document.getElementById("progress-list");
    const workoutList = document.getElementById("workout-list");
    const deleteProgressBtn = document.getElementById("delete-progress");

    // Dark mode setup
    const body = document.body;

    // Fetch dark mode setting from db.json
    async function loadDarkMode() {
        try {
            const response = await fetch("http://localhost:4000/settings");
            const data = await response.json();
            
            if (data.darkMode === "enabled") {
                body.classList.add("dark-mode");
                darkModeToggle.textContent = "Light Mode";
            } else {
                body.classList.remove("dark-mode");
                darkModeToggle.textContent = "Dark Mode";
            }
        } catch (error) {
            console.error("Error fetching dark mode setting:", error);
        }
    }

    loadDarkMode();

    // Toggle dark mode
    darkModeToggle.addEventListener("click", async () => {
        const isDarkMode = body.classList.toggle("dark-mode");
        const mode = isDarkMode ? "enabled" : "disabled";
        darkModeToggle.textContent = isDarkMode ? "Light Mode" : "Dark Mode";

        // Update db.json with the new mode
        try {
            await fetch("http://localhost:4000/settings", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ darkMode: mode })
            });
        } catch (error) {
            console.error("Error updating dark mode setting:", error);
        }
    });

    // Form submit logic
    userForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const age = document.getElementById("age").value;
        const weight = document.getElementById("weight").value;
        const goal = document.getElementById("goal").value.toLowerCase();

        document.getElementById("summary-name").textContent = name;
        document.getElementById("summary-age").textContent = age;
        document.getElementById("summary-weight").textContent = weight;
        document.getElementById("summary-goal").textContent = goal;

        profileSummary.style.display = "block";
        generateWorkouts(goal);
    });

    // Generate workouts based on user goal
    function generateWorkouts(goal) {
        workoutList.innerHTML = "";
        let workouts = [];

        if (goal.includes("muscle") || goal.includes("strength")) {
            workouts = [
                "💪 Push-ups - 3 sets of 15 reps",
                "🏋️ Squats - 3 sets of 20 reps",
                "🏋️ Deadlifts - 3 sets of 10 reps",
                "🏋️ Bench Press - 3 sets of 12 reps",
                "🧗 Pull-ups - 3 sets of 8 reps"
            ];
        } else if (goal.includes("weight") || goal.includes("fat") || goal.includes("lose")) {
            workouts = [
                "🔥 Jump Rope - 5 minutes",
                "🏃‍♂️ Running - 20 minutes",
                "💥 Burpees - 3 sets of 12 reps",
                "🚴‍♂️ Cycling - 30 minutes",
                "🦵 Mountain Climbers - 3 sets of 20 reps"
            ];
        } else if (goal.includes("stamina") || goal.includes("endurance")) {
            workouts = [
                "🏃‍♂️ Long-distance Running - 40 minutes",
                "🚴‍♂️ Cycling - 30 minutes",
                "🏊‍♂️ Swimming - 20 laps",
                "💪 Rowing Machine - 15 minutes"
            ];
        } else if (goal.includes("flexibility") || goal.includes("mobility")) {
            workouts = [
                "🧘‍♂️ Yoga Stretches - 15 minutes",
                "🤸‍♂️ Dynamic Stretching - 10 minutes",
                "🏋️ Resistance Band Mobility - 3 sets of 15 reps",
                "🦵 Hip Openers - 10 minutes"
            ];
        } else {
            workouts = ["🤔 Please enter a valid fitness goal (e.g., 'Build muscle', 'Lose weight')."];
        }

        workouts.forEach(workout => {
            const li = document.createElement("li");
            li.textContent = workout;
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "❌";
            deleteButton.addEventListener("click", function () {
                workoutList.removeChild(li);
            });
            li.appendChild(deleteButton);
            workoutList.appendChild(li);
        });
    }

    // Motivational messages
    const messages = [
        "Great job! Keep pushing! 💪",
        "You're doing amazing! 💥",
        "Stay consistent, you'll get there! 🚀",
        "No pain, no gain! 🔥"
    ];

    // Display motivational message after workout
    function showMotivationalMessage() {
        const randomIndex = Math.floor(Math.random() * messages.length);
        document.getElementById("motivationalMessage").textContent = messages[randomIndex];
    }

    // Save workout data
    async function saveWorkout(date, desc) {
        const messageDisplay = document.getElementById("motivationalMessage");

        try {
            // Send POST request to save workout
            const response = await fetch("http://localhost:4000/workouts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ date, desc })
            });

            if (response.ok) {
                displayWorkouts(); // Refresh workout list
                showMotivationalMessage(); // Show motivational message
                messageDisplay.textContent = "Workout saved! Keep going! 💪";
                messageDisplay.style.color = "green";
                setTimeout(() => {
                    messageDisplay.style.color = "";
                }, 2000);
                // Clear input fields
                document.getElementById("workoutDate").value = "";
                document.getElementById("workoutDesc").value = "";
            } else {
                alert("Failed to save workout. Please try again.");
            }
        } catch (error) {
            console.error("Error saving workout:", error);
            alert("Failed to save workout. Please try again.");
        }
    }

    // Display workouts
    async function displayWorkouts() {
        const workoutList = document.getElementById("workoutList");
        workoutList.innerHTML = "";

        try {
            const response = await fetch("http://localhost:4000/workouts");
            let workouts = await response.json();

            workouts.forEach((workout) => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `<strong>${workout.date}:</strong> ${workout.desc}
                                      <button class="deleteWorkout" data-id="${workout.id}">❌</button>`;

                listItem.style.opacity = "0";
                workoutList.appendChild(listItem);
                setTimeout(() => {
                    listItem.style.opacity = "1";
                    listItem.style.transition = "opacity 0.5s ease-in-out";
                }, 100);

                // Delete workout
                listItem.querySelector(".deleteWorkout").addEventListener("click", async () => {
                    await fetch(`http://localhost:4000/workouts/${workout.id}`, {
                        method: "DELETE"
                    });
                    displayWorkouts(); // Refresh the workout list
                });
            });
        } catch (error) {
            console.error("Error fetching workouts:", error);
        }
    }

    // Save workout button click event
    document.getElementById("saveWorkout").addEventListener("click", async () => {
        const date = document.getElementById("workoutDate").value.trim();
        const desc = document.getElementById("workoutDesc").value.trim();

        if (date && desc) {
            await saveWorkout(date, desc); // Call saveWorkout function
        } else {
            alert("Please enter a date and workout description.");
        }
    });

    // Load workouts when page loads
    displayWorkouts();
});
