document.addEventListener("DOMContentLoaded", () => {
  function setupDynamicFields(sectionClass) {
    const container = document.querySelector(`.${sectionClass} .form-content`);
    const addButton = document.createElement("button");
    const removeButton = document.createElement("button");

    addButton.textContent = "+";
    addButton.classList.add("add-btn");
    removeButton.textContent = "-";
    removeButton.classList.add("remove-btn");

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add(`${sectionClass}-buttons`);
    buttonContainer.appendChild(addButton);
    buttonContainer.appendChild(removeButton);
    container.appendChild(buttonContainer);

    addButton.addEventListener("click", () => {
      const newForm = container.querySelector("form").cloneNode(true);

      newForm.querySelectorAll("input").forEach((input) => (input.value = ""));

      newForm.style.opacity = "0";
      newForm.style.transform = "translateY(10px)";
      container.insertBefore(newForm, buttonContainer);
      requestAnimationFrame(() => {
        newForm.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        newForm.style.opacity = "1";
        newForm.style.transform = "translateY(0)";
      });
    });

    removeButton.addEventListener("click", () => {
      const forms = container.querySelectorAll("form");
      if (forms.length > 1) {
        const lastForm = forms[forms.length - 1];
        lastForm.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        lastForm.style.opacity = "0";
        lastForm.style.transform = "translateY(-10px)";
        setTimeout(() => {
          container.removeChild(lastForm);
        }, 300);
      } else {
        alert(`At least one ${sectionClass} form must remain.`);
      }
    });
  }

  setupDynamicFields("Achievements");
  setupDynamicFields("Experience");
  setupDynamicFields("Education");
  setupDynamicFields("project");
  // setupDynamicFields("skills");
});

document.addEventListener("DOMContentLoaded", function () {
  function updateResume() {
    document.getElementById("resumeName").innerText =
      document.getElementById("firstName").value +
      " " +
      (document.getElementById("midName").value || "") +
      " " +
      document.getElementById("lastName").value;

    document.getElementById("resumeDesignation").innerText =
      document.getElementById("designation").value;
    document.getElementById("resumeEmail").innerText =
      "Email: " + document.getElementById("userEmail").value;
    document.getElementById("resumePhone").innerText =
      "Phone: " + document.getElementById("userPhone").value;
    document.getElementById("resumeAddress").innerText =
      "Address: " + document.getElementById("userAddress").value;
    document.getElementById("resumeSummary").innerText =
      document.getElementById("summary").value;

    function updateMultipleFields(sectionClass, outputId, formatFunction) {
      let sectionForms = document.querySelectorAll(`.${sectionClass} form`);
      let dataList = [];
      sectionForms.forEach((form) => {
        let inputs = form.querySelectorAll("input");
        let values = [];
        inputs.forEach((input) => values.push(input.value));
        if (values.some((v) => v.trim() !== "")) {
          dataList.push(formatFunction(values));
        }
      });
      document.getElementById(outputId).innerHTML =
        dataList.length > 0
          ? "<ul><li>" + dataList.join("</li><li>") + "</li></ul>"
          : "";
    }

    updateMultipleFields(
      "Achievements",
      "resumeAchievements",
      (values) => `${values[0]} - ${values[1]}`
    );

    updateMultipleFields(
      "Experience",
      "resumeExperience",
      (values) =>
        `${values[0]} at ${values[1]} (${values[3]} - ${values[4]}) - ${values[5]}`
    );

    updateMultipleFields(
      "Education",
      "resumeEducation",
      (values) =>
        `${values[0]}, ${values[1]} (${values[3]} - ${values[4]}) - ${values[5]}`
    );

    updateMultipleFields(
      "project",
      "resumeProjects",
      (values) => `${values[0]} - ${values[2]} (${values[1]})`
    );

    let skills = document.querySelectorAll(".skills form input");
    let skillList = [];
    skills.forEach((input) => {
      if (input.value.trim() !== "") {
        skillList.push(input.value);
      }
    });
    document.getElementById("resumeSkills").innerText = skillList.join(", ");
  }

  document.body.addEventListener("input", updateResume);

  document.getElementById("image").addEventListener("change", function (event) {
    const reader = new FileReader();
    reader.onload = function () {
      document.getElementById("resumeImage").src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  });
});

let designIndex = 0;
const designs = [
  "resume-modern",
  "resume-professional",
  "resume-elegant",
  "resume-dark",
];

function toggleDesign() {
  const resume = document.querySelector(".resume-container");

  resume.classList.remove(...designs);

  designIndex = (designIndex + 1) % designs.length;
  resume.classList.add(designs[designIndex]);
}

function printResume() {
  const resumeContainer = document.querySelector(".resume-container");
  const resumeClone = resumeContainer.cloneNode(true);
  const activeDesignClass = resumeContainer.classList[1];
  const printWindow = window.open("", "", "width=800,height=900");

  printWindow.document.write(`
    <html>
      <head>
        <title>Resume PDF</title>
        <style>
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            font-family: 'Poppins', sans-serif;
          }
          .resume-container {
            width: 100%;
            padding: 40px;
            border-radius: 20px;
            box-shadow: none !important;
            background: white !important;
            color: black !important;
          }
          .resume-header {
            background: linear-gradient(135deg, #4e54c8, #8f94fb) !important;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 15px 15px 0 0;
          }
          .resume-header img {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            border: 4px solid white;
          }
          .resume-section {
            background: #f8f9fa !important;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 10px;
          }
        </style>
      </head>
      <body>
        <div class="resume-container ${activeDesignClass}">
          ${resumeClone.innerHTML}
        </div>
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
}

function redirectToJobs() {
  let skillInputs = document.querySelectorAll(".skills form input");
  let skillsArray = [];

  skillInputs.forEach((input) => {
    if (input.value.trim() !== "") {
      skillsArray.push(input.value.trim());
    }
  });

  if (skillsArray.length === 0) {
    alert("Please enter at least one skill.");
    return;
  }

  const skillsQuery = skillsArray.join(",");
  window.location.href = `jobs.html?skills=${encodeURIComponent(skillsQuery)}`;
}


function redirectToProjects() {
  let skillInputs = document.querySelectorAll(".skills form input");
  let skillsArray = [];

  skillInputs.forEach((input) => {
    if (input.value.trim() !== "") {
      skillsArray.push(input.value.trim());
    }
  });

  if (skillsArray.length === 0) {
    alert("Please enter at least one skill.");
    return;
  }

  const skillsQuery = skillsArray.join(",");
  window.location.href = `projects.html?skills=${encodeURIComponent(skillsQuery)}`;
}


const hamburger = document.getElementById("hamburger");
const menuList = document.getElementById("menuList");

hamburger.addEventListener("click", () => {
    menuList.classList.toggle("show");
});


// Detect scroll event
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});
