document.getElementById('searchButton').addEventListener('click', function () {
    const skills = document.getElementById('skills').value;
    if (!skills) {
        alert("Please enter some skills.");
        return;
    }
    fetchGitHubProjects(skills);
});

function fetchGitHubProjects(skills) {
    const skillArray = skills.split(",");
    const query = skillArray.map((skill) => skill.trim()).join("+");
    const apiUrl = `https://api.github.com/search/repositories?q=${query}+stars:>10&sort=stars&order=desc`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            const projectResults = document.getElementById('projectResults');
            const noProjects = document.getElementById('noProjects');
            projectResults.innerHTML = "";
            noProjects.style.display = "none";

            if (data.items.length === 0) {
                noProjects.style.display = "block";
                return;
            }

            data.items.slice(0, 5).forEach((project) => {
                const projectCard = document.createElement('div');
                projectCard.classList.add('project-card');
                projectCard.innerHTML = `
                    <h3><a href="${project.html_url}" target="_blank">${project.name}</a></h3>
                    <p>${project.description || "No description available."}</p>
                `;
                projectResults.appendChild(projectCard);
            });
        })
        .catch((error) => {
            console.error("Error fetching projects:", error);
            document.getElementById('noProjects').innerHTML = "Failed to fetch projects.";
            document.getElementById('noProjects').style.display = "block";
        });
}
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

const hamburger = document.getElementById("hamburger");
const menuList = document.getElementById("menuList");

hamburger.addEventListener("click", () => {
    menuList.classList.toggle("show");
});
