
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

function showMessage(element, message, success = false) {
    element.textContent = message;
    element.style.color = success ? "#249568" : "#c34f45";
}

// ---------------- SIGNUP ----------------

if (signupForm) {
    signupForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("signupEmail").value.trim();
        const password = document.getElementById("signupPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        const message = document.getElementById("signupMessage");
        const button = document.getElementById("signupBtn");

        if (password !== confirmPassword) {
            showMessage(message, "Passwords do not match.");
            return;
        }

        button.disabled = true;
        button.textContent = "Creating account...";

        try {
            const response = await fetch("/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.detail || "Signup failed");
            }

            showMessage(
                message,
                "Account created successfully! Redirecting...",
                true
            );

            setTimeout(() => {
                window.location.href = "/";
            }, 1200);

        } catch (error) {
            showMessage(message, error.message);

        } finally {
            button.disabled = false;
            button.textContent = "Create Account";
        }
    });
}


// ---------------- LOGIN ----------------

if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        const message = document.getElementById("loginMessage");
        const button = document.getElementById("loginBtn");

        button.disabled = true;
        button.textContent = "Signing in...";

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.detail || "Login failed");
            }

            localStorage.setItem("access_token", result.access_token);

            showMessage(message, "Login successful!", true);

            window.location.href = "/dashboard";

        } catch (error) {
            showMessage(message, error.message);

        } finally {
            button.disabled = false;
            button.textContent = "Sign In";
        }
    });
}
