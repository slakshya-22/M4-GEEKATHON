// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCo-z0Jpd771vQF6WbSXGhg8VFKcp-koRs",
  authDomain: "resume-builder-22july.firebaseapp.com",
  projectId: "resume-builder-22july",
  storageBucket: "resume-builder-22july.firebasestorage.app",
  messagingSenderId: "828812785355",
  appId: "1:828812785355:web:0c557e5c315ca4ed8f4d4e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const signupButton = document.getElementById("signup");
signupButton.addEventListener("click", function (event) {
  event.preventDefault();

  const email = document.getElementById("semail").value;
  const password = document.getElementById("spassword").value;

  console.log("Email:", email);
  console.log("Password:", password);

  if (!email || !password) {
    alert("Please enter both email and password.");
    return; 
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return; 
  }

  if (password.length < 6) {
    alert("Password should be at least 6 characters.");
    return; 
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up successfully
      const user = userCredential.user;
      alert("User signed up successfully");
      window.location.href = "../landing-page/index.html"; // Redirect to a different page
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert("Error: " + errorMessage);
    });
});

const loginButton = document.getElementById("login");
loginButton.addEventListener("click", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email && password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert("User logged in successfully");
        window.location.href = "../landing-page/index.html"; // Redirect to a different page
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert("Error: " + errorMessage);
      });
  } else {
    alert("Please enter both email and password.");
  }
});

const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");

showSignup.addEventListener("click", function () {
  document.querySelector(".login").classList.remove("active");
  document.querySelector(".signup").classList.add("active");
});

showLogin.addEventListener("click", function () {
  document.querySelector(".signup").classList.remove("active");
  document.querySelector(".login").classList.add("active");
});
