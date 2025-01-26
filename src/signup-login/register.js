const wrapper = document.querySelector(".wrapper");
const loginForm = document.querySelector(".form.login");
const signupForm = document.querySelector(".form.signup");
const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");

showSignup.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.classList.remove("active");
  signupForm.classList.add("active");
  adjustWrapperHeight();
});

showLogin.addEventListener("click", (e) => {
  e.preventDefault();
  signupForm.classList.remove("active");
  loginForm.classList.add("active");
  adjustWrapperHeight();
});

function adjustWrapperHeight() {
  const activeForm = document.querySelector(".form.active");
  wrapper.style.height = `${activeForm.scrollHeight}px`;
}
adjustWrapperHeight();
