// about us //
document.addEventListener('DOMContentLoaded', () => {
  const next1 = document.querySelector('.next1');
  const prev1 = document.querySelector('.prev1');
  const slider = document.querySelector('.slide1');

  function updatePositions() {
    const items = document.querySelectorAll('.item1');

    items.forEach((item, index) => {
      // Reset all common styles
      item.style.position = 'absolute';
      item.style.top = '50%';
      item.style.transform = 'translate(0, -50%)';
      item.style.borderRadius = '20px';
      item.style.width = '200px';
      item.style.height = '300px';
      item.style.opacity = '1';
      item.style.left = '';

      // Hide all content by default
      const content = item.querySelector('.content1');
      if (content) content.style.display = 'none';

      if (index === 0 || index === 1) {
        // First two slides: full size, top-left corner, no transform
        item.style.top = '0';
        item.style.left = '0';
        item.style.width = '100%';
        item.style.height = '100%';
        item.style.borderRadius = '0';
        item.style.transform = 'none';

        // Show content only on second slide (index 1)
        if (index === 1 && content) {
          content.style.display = 'block';
        }
      } else if (index === 2) {
        item.style.left = '50%';
      } else if (index === 3) {
        item.style.left = 'calc(50% + 220px)';
      } else if (index === 4) {
        item.style.left = 'calc(50% + 440px)';
      } else {
        item.style.left = 'calc(50% + 660px)';
        item.style.opacity = '0';
      }
    });
  }

  next1.addEventListener('click', () => {
    const items = document.querySelectorAll('.item1');
    slider.appendChild(items[0]);
    updatePositions();
  });

  prev1.addEventListener('click', () => {
    const items = document.querySelectorAll('.item1');
    slider.insertBefore(items[items.length - 1], items[0]);
    updatePositions();
  });

  // Initialize slider positions on page load
  updatePositions();
});

//faq
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
    .catch(err => alert("your massage was submitted.✅"));
});

