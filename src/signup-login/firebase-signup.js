import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

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

// Handle user signup
const signupButton = document.getElementById("signup");
signupButton.addEventListener("click", function (event) {
  event.preventDefault();

  const email = document.getElementById("semail").value;
  const password = document.getElementById("spassword").value;
  const rePassword = document.getElementById("rePassword").value;

  // Validate both passwords match
  if (password !== rePassword) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Passwords do not match.',
    });
    return;
  }

  // Validate email and password
  if (!email || !password) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please enter both email and password.',
    });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please enter a valid email address.',
    });
    return;
  }

  if (password.length < 6) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Password should be at least 6 characters.',
    });
    return;
  }

  // Create user with Firebase
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'User signed up successfully.',
      });

      // Redirect to loading page after a short delay
      setTimeout(() => {
        window.location.href = "loading.html"; // Redirect to loading page
      }, 2000); // Delay of 2 seconds
    })
    .catch((error) => {
      const errorMessage = error.message;
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
      });
    });
});

// Handle user login
const loginButton = document.getElementById("login");
loginButton.addEventListener("click", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please enter both email and password.',
    });
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'User logged in successfully.',
      });

      // Redirect to loading page after a short delay
      setTimeout(() => {
        window.location.href = "loading.html"; // Redirect to loading page
      }, 2000); // Delay of 2 seconds
    })
    .catch((error) => {
      const errorMessage = error.message;
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
      });
    });
});

// Handle password reset (forgot password)
const forgotPasswordButton = document.getElementById("forgotPassword");
forgotPasswordButton.addEventListener("click", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;  // The email entered for password reset

  if (email) {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Password reset email sent! Please check your inbox.',
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage,
        });
      });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please enter your email to reset your password.',
    });
  }
});
