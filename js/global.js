// DETECTS MOUSE MOVEMENT FOR MOUSE GLOW
document.addEventListener("mousemove", (e) => {
  const glow = document.getElementById("mouse-glow");
  glow.style.transform = `translate(${e.clientX - 125}px, ${
    e.clientY - 125
  }px)`;
});
