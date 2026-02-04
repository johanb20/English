document.querySelectorAll(".unit-header").forEach(header => {
  header.addEventListener("click", () => {
    const targetId = header.dataset.target;
    document
      .getElementById(targetId)
      .classList.toggle("active");
  });
});