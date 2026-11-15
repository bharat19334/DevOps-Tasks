
const token = localStorage.getItem("access_token");

if (!token) {
    window.location.replace("/");
}

// Load authenticated user profile
async function loadDashboard() {
    try {
        const response = await fetch("/api/me", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            localStorage.removeItem("access_token");
            window.location.replace("/");
            return;
        }

        const user = await response.json();

        document.getElementById("userEmail").textContent = user.email;

        const createdDate = new Date(user.created_at);

        document.getElementById("userCreated").textContent =
            "Account created: " + createdDate.toLocaleString();

    } catch (error) {
        document.getElementById("dashboardMessage").textContent =
            "Unable to connect to authentication server.";
    }
}


// Logout functionality
document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("access_token");
    window.location.replace("/");
});


// Initialize dashboard
loadDashboard();
