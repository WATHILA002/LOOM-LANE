const email = document.getElementById("zxEmail");
const pass = document.getElementById("zxPassword");
const bar = document.getElementById("zxBar");
const text = document.getElementById("zxStrengthText");
const form = document.getElementById("zxLoginForm");
const btn = document.getElementById("zxLoginBtn");

pass.addEventListener("input", () => {
  let strength = 0;

  if (pass.value.length >= 8) strength++;
  if (/[A-Z]/.test(pass.value)) strength++;
  if (/[0-9]/.test(pass.value)) strength++;
  if (/[@$!%*?&]/.test(pass.value)) strength++;

  if (strength <= 1) {
    bar.style.width = "25%";
    bar.style.background = "red";
    text.innerText = "Weak";
  } else if (strength === 2) {
    bar.style.width = "50%";
    bar.style.background = "orange";
    text.innerText = "Medium";
  } else {
    bar.style.width = "100%";
    bar.style.background = "green";
    text.innerText = "Strong";
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!email.value.includes("@")) {
    document.getElementById("zxEmailErr").innerText = "Invalid Email";
    return;
  } else {
    document.getElementById("zxEmailErr").innerText = "";
  }

  btn.classList.add("success");
  btn.innerText = "Success ✔";

  setTimeout(() => {
    window.location.href = "index.html"; // HOME PAGE linking // 
  }, 700);
});

// faq //
document.getElementById("questionForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  fetch("submit_question.php", { method: "POST", body: formData })
    .then(res => res.text())
    .then(data => {
      if (data.trim() === "success") {
        document.getElementById("formMessage").style.display = "block";
        this.reset();
      } else {
        alert("Something went wrong. Try again.");
      }
    })
    .catch(err => alert("Error sending message."));
});

