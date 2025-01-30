async function searchJobs() {
  const input = document.getElementById("jobSearchInput").value.trim();
  if (!input) {
    alert("Please enter a skill or job title.");
    return;
  }

  fetchJobs(input);
}

async function fetchJobs(query) {
  const apiKey = "c702f5130cmshf015b655c4cd2ecp12af38jsndac6e386e09b";
  const apiUrl = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(
    query
  )}&page=1&num_pages=1&country=us&date_posted=all`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    displayJobs(data.data);
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }
}

function displayJobs(jobs) {
  const jobResults = document.getElementById("jobResults");
  jobResults.innerHTML = "";

  if (jobs.length === 0) {
    jobResults.innerHTML = "<p class='no-jobs'>No matching jobs found.</p>";
    return;
  }

  jobs.forEach((job) => {
    const jobCard = document.createElement("div");
    jobCard.classList.add("job-card");
    jobCard.innerHTML = `
            <h3>${job.job_title}</h3>
            <p>🏢 <strong>${job.employer_name}</strong></p>
            <p>📍 Location: ${job.job_city || "Not specified"}</p>
            <a href="${
              job.job_apply_link
            }" target="_blank" class="apply-btn">Apply Now</a>
        `;
    jobResults.appendChild(jobCard);
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
