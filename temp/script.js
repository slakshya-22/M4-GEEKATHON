document.getElementById("firstName").addEventListener("input", updateResume);
document.getElementById("midName").addEventListener("input", updateResume);
document.getElementById("lastName").addEventListener("input", updateResume);
document.getElementById("designation").addEventListener("input", updateResume);
document.getElementById("userAddress").addEventListener("input", updateResume);
document.getElementById("userEmail").addEventListener("input", updateResume);
document.getElementById("userPhone").addEventListener("input", updateResume);
document.getElementById("summary").addEventListener("input", updateResume);
document.getElementById("image").addEventListener("change", updateImage);

function updateResume() {
  const firstName = document.getElementById("firstName").value;
  const midName = document.getElementById("midName").value;
  const lastName = document.getElementById("lastName").value;
  const designation = document.getElementById("designation").value;
  const address = document.getElementById("userAddress").value;
  const email = document.getElementById("userEmail").value;
  const phone = document.getElementById("userPhone").value;
  const summary = document.getElementById("summary").value;

  document.getElementById("displayName").innerText = `${firstName} ${midName} ${lastName}`.trim();
  document.getElementById("displayDesignation").innerText = designation;
  document.getElementById("displayAddress").innerText = address;
  document.getElementById("displayEmail").innerText = email;
  document.getElementById("displayPhone").innerText = phone;
  document.getElementById("displaySummary").innerText = summary;
}

function updateImage(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("displayImage").src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}
