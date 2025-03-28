document.addEventListener("DOMContentLoaded", function () {
    const userForm = document.getElementById("user-form");
    const profileSummary = document.getElementById("profile-summary");
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const saveProgressBtn = document.getElementById("save-progress");
    const progressLog = document.getElementById("progress-log");
    const progressList = document.getElementById("progress-list");
    const workoutList = document.getElementById("workout-list");
    const deleteProgressBtn = document.getElementById("delete-progress");

    
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
        darkModeToggle.textContent = "Light Mode";
    }

    darkModeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        const mode = document.body.classList.contains("dark-mode") ? "enabled" : "disabled";
        localStorage.setItem("darkMode", mode);
        darkModeToggle.textContent = mode === "enabled" ? "Light Mode" : "Dark Mode";
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
    
    
    function displayWorkouts() {
        const workoutList = document.getElementById("workoutList");
        workoutList.innerHTML = ""; 
    
        let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
    
        workouts.forEach((workout, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<strong>${workout.date}:</strong> ${workout.desc} 
                                  <button class="deleteWorkout" data-index="${index}">❌</button>`;
    
            
            listItem.style.opacity = "0";
            workoutList.appendChild(listItem);
            setTimeout(() => {
                listItem.style.opacity = "1";
                listItem.style.transition = "opacity 0.5s ease-in-out";
            }, 100);
    
           
            listItem.querySelector(".deleteWorkout").addEventListener("click", () => {
                workouts.splice(index, 1); 
                localStorage.setItem("workouts", JSON.stringify(workouts));
                displayWorkouts(); 
            });
        });
    }
    
    
    document.getElementById("saveWorkout").addEventListener("click", () => {
        const date = document.getElementById("workoutDate").value.trim();
        const desc = document.getElementById("workoutDesc").value.trim();
        const messageDisplay = document.getElementById("motivationalMessage");
    
        if (date && desc) {
            let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
            workouts.push({ date, desc });
            localStorage.setItem("workouts", JSON.stringify(workouts));
    
            displayWorkouts(); 
            showMotivationalMessage(); 
    
            
            messageDisplay.textContent = "Workout saved! Keep going! 💪";
            messageDisplay.style.color = "green";
            messageDisplay.style.transition = "color 0.5s ease-in-out";
            messageDisplay.style.animation = "glow 1s ease-in-out"; 
            
            setTimeout(() => {
                messageDisplay.style.color = "";
            }, 2000);
    
            
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
        message.style.animation = "glow 1s ease-in-out 2"; 
    }
    
    function shakeButton() {
        const button = document.getElementById("saveWorkout");
        button.classList.add("shake");
     
        setTimeout(() => {
            button.classList.remove("shake");
        }, 1000);
    }
    
   
    document.getElementById("saveWorkout").addEventListener("click", () => {
        animateSuccess(); 
        showConfetti();   
        shakeButton();    
    });
    
   
    document.addEventListener("DOMContentLoaded", displayWorkouts);
})