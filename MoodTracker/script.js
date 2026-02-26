// Check if user already logged in
window.onload = function () {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
        showApp(savedUser);
    }
};

// LOGIN FUNCTION
function login() {
    const username = document.getElementById("usernameInput").value.trim();

    if (username === "") {
        alert("Please enter your name");
        return;
    }

    localStorage.setItem("currentUser", username);
    showApp(username);
}

// SHOW APP AFTER LOGIN
function showApp(username) {
    document.getElementById("loginSection").classList.add("hidden");
    document.getElementById("appSection").classList.remove("hidden");
    document.getElementById("welcomeText").innerText = 
        "Welcome, " + username + " 👋";
}

// LOGOUT FUNCTION
function logout() {
    localStorage.removeItem("currentUser");
    location.reload();
}

// SET DAILY MOOD
function setMood(mood) {

    const username = localStorage.getItem("currentUser");
    const today = new Date().toISOString().split("T")[0];

    let allUsers = JSON.parse(localStorage.getItem("allUsers")) || {};

    if (!allUsers[username]) {
        allUsers[username] = {};
    }

    allUsers[username][today] = mood;

    localStorage.setItem("allUsers", JSON.stringify(allUsers));

    document.getElementById("todayMessage").innerText =
        "Today's mood saved as: " + mood + " ✅";
}

// SHOW MONTHLY MOODS
function showMonthlyMoods() {

    const username = localStorage.getItem("currentUser");
    const allUsers = JSON.parse(localStorage.getItem("allUsers")) || {};
    const reportDiv = document.getElementById("monthlyReport");

    const userMoods = allUsers[username] || {};
    const currentMonth = new Date().toISOString().slice(0, 7);

    let output = "<h3>This Month's Moods:</h3>";

    let found = false;

    for (let date in userMoods) {
        if (date.startsWith(currentMonth)) {
            output += `<p>${date} : ${userMoods[date]}</p>`;
            found = true;
        }
    }

    if (!found) {
        output += "<p>No moods recorded this month.</p>";
    }

    reportDiv.innerHTML = output;
}