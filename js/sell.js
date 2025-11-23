const customMessage = document.getElementById("custom-message");
const customImage = document.getElementById("custom");
const premadeMessage = document.getElementById("premade-message");
const premadeImage = document.getElementById("premade");

customImage.addEventListener("mouseenter", () => {
  customMessage.textContent = "CREATE YOUR OWN STAGE";
});
customImage.addEventListener("mouseleave", () => {
  customMessage.textContent = "";
});

premadeImage.addEventListener("mouseenter", () => {
  premadeMessage.textContent = "CHOOSE THE BEST STAGE";
});
premadeImage.addEventListener("mouseleave", () => {
  premadeMessage.textContent = "";
});
