// Select the navbar element
const navbar = document.querySelector(".navbar");

// event listener for the scroll event
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Get On Top Button
const getOnTopButton = document.getElementById("getOnTop");
const landingPage = document.getElementById("landingPage");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    getOnTopButton.style.display = "block";
  } else {
    getOnTopButton.style.display = "none";
  }
});

getOnTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});


const hamburger = document.getElementById("hamburger");
const menuList = document.getElementById("menuList");

hamburger.addEventListener("click", () => {
    menuList.classList.toggle("show");
});
