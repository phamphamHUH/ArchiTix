const tools = [
  {
    src: "../../assets/icons/SelectTool.png",
    id: "non-clickable",
  },
  {
    src: "../../assets/icons/SelectSeats.png",
    id: "non-clickable",
  },
  {
    src: "../../assets/icons/SelectionBrush.png",
    id: "non-clickable",
  },
  {
    src: "../../assets/icons/InsertRow.png",
    id: "seat-icons",
  },
  {
    src: "../../assets/icons/Line.png",
    id: "non-clickable",
  },
  {
    src: "../../assets/icons/InsertSquare.png",
    id: "shapes",
  },
  {
    src: "../../assets/icons/TextBox.png",
    id: "non-clickable",
  },
  {
    src: "../../assets/icons/InsertImage.png",
    id: "non-clickable",
  },
  {
    src: "../../assets/icons/AllGender.png",
    id: "icons",
  },
];

const rows = [
  "../../assets/icons/InsertRow.png",
  "../../assets/icons/InsertRows.png",
];

const icons = [
  "../../assets/icons/AllGender.png",
  "../../assets/icons/Male.png",
  "../../assets/icons/Female.png",
  "../../assets/icons/FoodSection.png",
  "../../assets/icons/DrinkSection.png",
  "../../assets/icons/Stairs.png",
  "../../assets/icons/Exit.png",
  "../../assets/icons/PWD.png",
  "../../assets/icons/Warning.png",
];

const seatPopupContent = document.querySelector(".popup-content-1");
const iconsPopupContent = document.querySelector(".popup-content-3");
const toolsContent = document.querySelector(".tools-container");

// LOADS ALL ICONS AND IMAGES DYNAMICALLY
function loadImages(array, container) {
  container.innerHTML = "";
  array.forEach((item) => {
    const img = document.createElement("img");

    if (typeof item === "string") {
      // For rows[], icons[]
      img.src = item;
    } else {
      // For tools[]
      img.src = item.src;
      img.id = item.id;
    }

    img.alt = "Tools";
    container.appendChild(img);
  });
}

loadImages(rows, seatPopupContent);
loadImages(icons, iconsPopupContent);
loadImages(tools, toolsContent);

const seatIcon = document.getElementById("seat-icons");
const seatPopup = document.getElementById("popup-1");
const shapeIcon = document.getElementById("shapes");
const shapePopup = document.getElementById("popup-2");
const iconsIcon = document.getElementById("icons");
const iconsPopup = document.getElementById("popup-3");
// DETECTS ICON CLICK TO OPEN OR CLOSE POPUP
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

// DETECTS MOUSE CLICK TO CANCEL POPUP
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

// DETECTS MOUSE MOVEMENT FOR MOUSE GLOW
document.addEventListener("mousemove", (e) => {
  const glow = document.getElementById("mouse-glow");
  glow.style.transform = `translate(${e.clientX - 125}px, ${
    e.clientY - 125
  }px)`;
});

const hideIcon = document.getElementById("hide");
const expandIcon = document.getElementById("expand");
const infoPopup = document.getElementById("event-info");

hideIcon.addEventListener("click", () => {
  infoPopup.classList.add("hide");
  hideIcon.classList.add("hidden");
  expandIcon.classList.remove("hidden");
});

expandIcon.addEventListener("click", () => {
  infoPopup.classList.remove("hide");
  expandIcon.classList.add("hidden");

  setTimeout(() => {
    hideIcon.classList.remove("hidden");
  }, 300);
});

const seatImages = [
  {
    name: "Sta. Rosa Complex",
    src: "../../assets/images/StaRosaSportsComplex.png",
  },
  {
    name: "FilOil EcoOil Centre",
    src: "../../assets/images/FilOilEcoilCentre.png",
  },
  { name: "Candon City Arena", src: "../../assets/images/CandonCityArena.png" },
  {
    name: "Newport Performing Arts Theatre",
    src: "../../assets/images/7.png",
  },
  { name: "DL Umali Auditorium", src: "../../assets/images/DL.png" },
  { name: "CCF Center Auditorium", src: "../../assets/images/CGF.png" },
];

const params = new URLSearchParams(window.location.search);
const name = params.get("name");

const venue = seatImages.find((v) => v.name === name);

if (venue) {
  document.getElementById("seat-image").src = venue.src;
}
