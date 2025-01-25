const wrapper = document.querySelector(".wrapper");
const loginForm = document.querySelector(".form.login");
const signupForm = document.querySelector(".form.signup");
const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");

// Handle signup click
showSignup.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.classList.remove("active");
  signupForm.classList.add("active");
  adjustWrapperHeight();
});

// Handle login click
showLogin.addEventListener("click", (e) => {
  e.preventDefault();
  signupForm.classList.remove("active");
  loginForm.classList.add("active");
  adjustWrapperHeight();
});

// Adjust the height dynamically
function adjustWrapperHeight() {
  const activeForm = document.querySelector(".form.active");
  wrapper.style.height = `${activeForm.scrollHeight}px`;
}

// Initialize height
adjustWrapperHeight();
