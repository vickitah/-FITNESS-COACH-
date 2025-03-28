document.addEventListener("DOMContentLoaded", function () {
    const userForm = document.getElementById("user-form");
    const profileSummary = document.getElementById("profile-summary");
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const saveProgressBtn = document.getElementById("save-progress");
    const progressLog = document.getElementById("progress-log");
    const progressList = document.getElementById("progress-list");
    const workoutList = document.getElementById("workout-list");
    const deleteProgressBtn = document.getElementById("delete-progress");

    document.addEventListener("DOMContentLoaded", async () => {
        const darkModeToggle = document.getElementById("dark-mode-toggle");
        const body = document.body;
    
        // Fetch dark mode setting from db.json
        try {
            const response = await fetch("http://localhost:3000/settings");
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
    
        // Toggle dark mode
        darkModeToggle.addEventListener("click", async () => {
            const isDarkMode = body.classList.toggle("dark-mode");
            const mode = isDarkMode ? "enabled" : "disabled";
            darkModeToggle.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
    
            // Update db.json with the new mode
            try {
                await fetch("http://localhost:3000/settings", {
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
    });
    

    
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
            workouts = ["🤔 Please enter a valid fitness goal (e.g., 'Build muscle', 'Lose weight' )."];
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
        document.getElementById("motivationalMessage").textContent = messages[randomIndex];
    }
    
    
    async function displayWorkouts() {
        const workoutList = document.getElementById("workoutList");
        workoutList.innerHTML = "";
    
        try {
            const response = await fetch("http://localhost:3000/workouts");
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
                    await fetch(`http://localhost:3000/workouts/${workout.id}`, {
                        method: "DELETE"
                    });
                    displayWorkouts();
                });
            });
        } catch (error) {
            console.error("Error fetching workouts:", error);
        }
    }
    
    async function addWorkout(date, desc) {
        try {
            await fetch("http://localhost:3000/workouts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ date, desc })
            });
            displayWorkouts();
        } catch (error) {
            console.error("Error adding workout:", error);
        }
    }
    
    document.getElementById("saveWorkout").addEventListener("click", async () => {
        const date = document.getElementById("workoutDate").value.trim();
        const desc = document.getElementById("workoutDesc").value.trim();
        const messageDisplay = document.getElementById("motivationalMessage");
    
        if (date && desc) {
            try {
                // Send a POST request to add workout to db.json
                await fetch("http://localhost:3000/workouts", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ date, desc })
                });
    
                displayWorkouts(); // Refresh the workout list
                showMotivationalMessage(); // Show motivation message
    
                // Success message
                messageDisplay.textContent = "Workout saved! Keep going! 💪";
                messageDisplay.style.color = "green";
                messageDisplay.style.transition = "color 0.5s ease-in-out";
                messageDisplay.style.animation = "glow 1s ease-in-out";
    
                setTimeout(() => {
                    messageDisplay.style.color = "";
                }, 2000);
    
                // Clear input fields
                document.getElementById("workoutDate").value = "";
                document.getElementById("workoutDesc").value = "";
    
                // Trigger animations
                animateSuccess();
                showConfetti();
                shakeButton();
    
            } catch (error) {
                console.error("Error saving workout:", error);
                alert("Failed to save workout. Please try again.");
            }
        } else {
            alert("Please enter a date and workout description.");
        }
    });
    
    // Load workouts when page loads
    document.addEventListener("DOMContentLoaded", displayWorkouts);
})    