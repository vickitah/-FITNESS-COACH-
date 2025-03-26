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
document.getElementById("deleteProfile").addEventListener("click", function () {
    document.getElementById("userName").value = "";
    document.getElementById("userAge").value = "";
    document.getElementById("userWeight").value = "";
    document.getElementById("userGoal").value = "";
    document.getElementById("profileSummary").textContent = "Your profile details will appear here.";
});

document.getElementById("saveProfile").addEventListener("click", () => {
    const name = document.getElementById("userName").value;
    const age = document.getElementById("userAge").value;
    const weight = document.getElementById("userWeight").value;
    const goal = document.getElementById("userGoal").value;

    if (name && age && weight && goal) {
        document.getElementById("profileSummary").innerHTML = `
            <strong>Name:</strong> ${name} <br>
            <strong>Age:</strong> ${age} <br>
            <strong>Weight:</strong> ${weight} kg <br>
            <strong>Goal:</strong> ${goal}
        `;

        // Optional: Save to localStorage for persistence
        localStorage.setItem("userProfile", JSON.stringify({ name, age, weight, goal }));
    } else {
        alert("Please fill in all fields.");
    }
});

// Load saved profile when the page loads
window.addEventListener("load", () => {
    const savedProfile = JSON.parse(localStorage.getItem("userProfile"));
    if (savedProfile) {
        document.getElementById("userName").value = savedProfile.name;
        document.getElementById("userAge").value = savedProfile.age;
        document.getElementById("userWeight").value = savedProfile.weight;
        document.getElementById("userGoal").value = savedProfile.goal;

        document.getElementById("profileSummary").innerHTML = `
            <strong>Name:</strong> ${savedProfile.name} <br>
            <strong>Age:</strong> ${savedProfile.age} <br>
            <strong>Weight:</strong> ${savedProfile.weight} kg <br>
            <strong>Goal:</strong> ${savedProfile.goal}
        `;
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const workoutButton = document.getElementById("getWorkout");
    const workoutPlanDisplay = document.getElementById("workoutPlan");

    workoutButton.addEventListener("click", () => {
        const fitnessGoal = document.getElementById("fitnessGoal").value.trim().toLowerCase();
        let workoutPlan = "";

        if (fitnessGoal.includes("muscle") || fitnessGoal.includes("strength")) {
            workoutPlan = `
                <ol>
                    <li>💪 Push-ups - <strong>3 sets of 15 reps</strong></li>
                    <li>🏋️ Squats - <strong>3 sets of 20 reps</strong></li>
                    <li>🏋️ Deadlifts - <strong>3 sets of 10 reps</strong></li>
                    <li>🏋️ Bench Press - <strong>3 sets of 12 reps</strong></li>
                    <li>🧗 Pull-ups - <strong>3 sets of 8 reps</strong></li>
                </ol>
            `;
        } else if (fitnessGoal.includes("weight") || fitnessGoal.includes("fat") || fitnessGoal.includes("lose")) {
            workoutPlan = `
                <ol>
                    <li>🔥 Jump Rope - <strong>5 minutes</strong></li>
                    <li>🏃‍♂️ Running - <strong>20 minutes</strong></li>
                    <li>💥 Burpees - <strong>3 sets of 12 reps</strong></li>
                    <li>🚴‍♂️ Cycling - <strong>30 minutes</strong></li>
                    <li>🦵 Mountain Climbers - <strong>3 sets of 20 reps</strong></li>
                </ol>
            `;
        } else if (fitnessGoal.includes("stamina") || fitnessGoal.includes("endurance")) {
            workoutPlan = `
                <ol>
                    <li>🏃‍♂️ Long-distance Running - <strong>40 minutes</strong></li>
                    <li>🚴‍♂️ Cycling - <strong>30 minutes</strong></li>
                    <li>🏊‍♂️ Swimming - <strong>20 laps</strong></li>
                    <li>💪 Rowing Machine - <strong>15 minutes</strong></li>
                </ol>
            `;
        } else if (fitnessGoal.includes("flexibility") || fitnessGoal.includes("mobility")) {
            workoutPlan = `
                <ol>
                    <li>🧘‍♂️ Yoga Stretches - <strong>15 minutes</strong></li>
                    <li>🤸‍♂️ Dynamic Stretching - <strong>10 minutes</strong></li>
                    <li>🏋️ Resistance Band Mobility - <strong>3 sets of 15 reps</strong></li>
                    <li>🦵 Hip Openers - <strong>10 minutes</strong></li>
                </ol>
            `;
        } else {
            workoutPlan = "<p>🤔 Please enter a valid fitness goal (e.g., 'Build muscle', 'Lose weight' ).</p>";
        }

        workoutPlanDisplay.innerHTML = workoutPlan;
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const workoutList = document.getElementById("workoutPlan");
    const customizeBtn = document.getElementById("customizeWorkout");

    // Workout Details Data
    const workoutDetails = {
        "Push-ups": "Do 3 sets of 15 reps. Focus on full range of motion.",
        "Squats": "Perform 3 sets of 20 reps. Keep your back straight!",
        "Plank": "Hold for 30-60 seconds. Engages core muscles.",
        "Lunges": "12 reps per leg. Helps build leg strength.",
        "Dips": "3 sets of 12 reps. Targets triceps and shoulders."
    };

    // Make workouts clickable
    workoutList.addEventListener("click", (event) => {
        if (event.target.tagName === "LI") {
            const exerciseName = event.target.innerText.split(" - ")[0]; 
            alert(workoutDetails[exerciseName] || "More details coming soon!");
        }
    });

    // Enable Workout Customization
    customizeBtn.addEventListener("click", () => {
        let newPlan = prompt("Enter your custom workout plan (separate exercises with commas):");
        if (newPlan) {
            let exercises = newPlan.split(",").map(ex => ex.trim());
            workoutList.innerHTML = "";
            exercises.forEach(ex => {
                let li = document.createElement("li");
                li.innerHTML = `${ex} - Click for details <button class="delete-btn">❌</button>`;
                workoutList.appendChild(li);
            });
        }
    });

    // Delete an Exercise
    workoutList.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-btn")) {
            event.target.parentElement.remove(); // Remove the clicked exercise
        }
    });
});

const messages = [
    "Keep pushing! You're stronger than you think. 💪",
    "Every rep counts! Stay consistent. 🔥",
    "You're making progress! Keep going! 🚀",
    "Small progress is still progress. Don't stop! 🏋️",
    "Believe in yourself. You’ve got this! ✨",
    "Pain today, strength tomorrow. Keep at it! 💯"
];

// Function to Show a Random Motivational Message
function showMotivationalMessage() {
    const randomIndex = Math.floor(Math.random() * messages.length);
    document.getElementById("motivationalMessage").textContent = messages[randomIndex];
}

// Function to Display Workouts
function displayWorkouts() {
    const workoutList = document.getElementById("workoutList");
    workoutList.innerHTML = ""; // Clear list before displaying

    let workouts = JSON.parse(localStorage.getItem("workouts")) || [];

    workouts.forEach((workout, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${workout.date}:</strong> ${workout.desc} 
                              <button class="deleteWorkout" data-index="${index}">❌</button>`;

        // Add fade-in animation
        listItem.style.opacity = "0";
        workoutList.appendChild(listItem);
        setTimeout(() => {
            listItem.style.opacity = "1";
            listItem.style.transition = "opacity 0.5s ease-in-out";
        }, 100);

        // Delete button functionality
        listItem.querySelector(".deleteWorkout").addEventListener("click", () => {
            workouts.splice(index, 1); // Remove the clicked workout
            localStorage.setItem("workouts", JSON.stringify(workouts));
            displayWorkouts(); // Refresh the list
        });
    });
}

// Save Workout and Show Animation
document.getElementById("saveWorkout").addEventListener("click", () => {
    const date = document.getElementById("workoutDate").value.trim();
    const desc = document.getElementById("workoutDesc").value.trim();
    const messageDisplay = document.getElementById("motivationalMessage");

    if (date && desc) {
        let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
        workouts.push({ date, desc });
        localStorage.setItem("workouts", JSON.stringify(workouts));

        displayWorkouts(); // Refresh the list
        showMotivationalMessage(); // Show a new motivational message

        // **Add green glow effect for confirmation**
        messageDisplay.textContent = "Workout saved! Keep going! 💪";
        messageDisplay.style.color = "green";
        messageDisplay.style.transition = "color 0.5s ease-in-out";
        messageDisplay.style.animation = "glow 1s ease-in-out"; // Glow effect

        // Reset color after 2 seconds
        setTimeout(() => {
            messageDisplay.style.color = "";
        }, 2000);

        // Clear input fields
        document.getElementById("workoutDate").value = "";
        document.getElementById("workoutDesc").value = "";
    } else {
        alert("Please enter a date and workout description.");
    }
});
function showConfetti() {
    confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
    });
}

function animateSuccess() {
    const message = document.getElementById("motivationalMessage");
    message.style.animation = "glow 1s ease-in-out 2"; // Green glow effect
}

function shakeButton() {
    const button = document.getElementById("saveWorkout");
    button.classList.add("shake");

    // Remove the shake class after animation ends
    setTimeout(() => {
        button.classList.remove("shake");
    }, 1000);
}

// Updated event listener to trigger all effects
document.getElementById("saveWorkout").addEventListener("click", () => {
    animateSuccess(); // Green glow effect
    showConfetti();   // Confetti explosion
    shakeButton();    // Button shake effect
});


// Load saved workouts on page load
displayWorkouts();
