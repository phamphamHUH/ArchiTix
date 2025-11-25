const seatIcon = document.getElementById("seat-icons");
const seatPopup = document.getElementById("popup-1");
const shapeIcon = document.getElementById("shapes");
const shapePopup = document.getElementById("popup-2");
const iconsIcon = document.getElementById("icons");
const iconsPopup = document.getElementById("popup-3");

seatIcon.addEventListener("click", () => {
  if (seatPopup.style.display === "flex") {
    seatPopup.style.display = "none";
  } else {
    seatPopup.style.display = "flex";
  }
});

shapeIcon.addEventListener("click", () => {
  if (shapePopup.style.display === "flex") {
    shapePopup.style.display = "none";
  } else {
    shapePopup.style.display = "flex";
  }
});

iconsIcon.addEventListener("click", () => {
  if (iconsPopup.style.display === "flex") {
    iconsPopup.style.display = "none";
  } else {
    iconsPopup.style.display = "flex";
  }
});

window.addEventListener("click", (e) => {
  if (!seatPopup.contains(e.target) && e.target !== seatIcon) {
    seatPopup.style.display = "none";
  }

  if (!shapePopup.contains(e.target) && e.target !== shapeIcon) {
    shapePopup.style.display = "none";
  }

  if (!iconsPopup.contains(e.target) && e.target !== iconsIcon) {
    iconsPopup.style.display = "none";
  }
});

const tools = [
  "../../assets/images/SelectTool.png",
  "../../assets/images/SelectSeats.png",
  "../../assets/images/SelectionBrush.png",
  "../../assets/images/InsertRow.png",
  "../../assets/images/SelectTool.png",
  "../../assets/images/InsertSquare.png",
  "../../assets/images/TextBox.png",
  "../../assets/images/InsertImage.png",
  "../../assets/images/AllGender.png",
];
