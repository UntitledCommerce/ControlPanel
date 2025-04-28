function generateCaptcha() {
    const captchaText = document.getElementById('captchaText');
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
        captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    captchaText.innerText = captcha;
}

function generateCaptchaSignup() {
    const captchaText = document.getElementById('captchaTextSignup');
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
        captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    captchaText.innerText = captcha;
}

function login() {
    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;
    let captchaInput = document.getElementById("captchaInput").value;
    let captchaText = document.getElementById("captchaText").innerText;

    if (username === "" || password === "") {
        alert("Please fill in all fields");
        return;
    }

    if (captchaInput !== captchaText) {
        alert("CAPTCHA is incorrect. Try again.");
        generateCaptcha();
        return;
    }

    // ✅ Hardcoded username and password
    if (username === "admin" && password === "password123") {
        alert("Logged in successfully!");
        window.location.href = "index.html"; // Redirect to your control panel
    } else {
        alert("Incorrect username or password!");
    }
}

function signup() {
    let username = document.getElementById("signupUsername").value;
    let password = document.getElementById("signupPassword").value;
    let captchaInput = document.getElementById("captchaInputSignup").value;
    let captchaText = document.getElementById("captchaTextSignup").innerText;

    if (username === "" || password === "") {
        alert("Please fill in all fields");
        return;
    }

    if (captchaInput !== captchaText) {
        alert("CAPTCHA is incorrect. Try again.");
        generateCaptchaSignup();
        return;
    }

    // 🚀 Fake signup success
    alert("Signup successful! Now login with your new credentials.");

    window.location.href = "login.html"; // Go back to login page
}

// Auto generate captcha when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('captchaText')) {
        generateCaptcha();
    }
    if (document.getElementById('captchaTextSignup')) {
        generateCaptchaSignup();
    }
});

