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

function dateAvailability(length) {
  return Array.from({ length }, (_, i) => ({
    date: i + 1,
    availability: Math.random() < 0.7,
  }));
}

const months = [
  {
    month: "January",
    length: 31,
  },
  {
    month: "February",
    length: 28,
  },
  {
    month: "March",
    length: 31,
  },
  {
    month: "April",
    length: 30,
  },
  {
    month: "May",
    length: 31,
  },
  {
    month: "June",
    length: 30,
  },
  {
    month: "July",
    length: 31,
  },
  {
    month: "August",
    length: 31,
  },
  {
    month: "September",
    length: 30,
  },
  {
    month: "October",
    length: 31,
  },
  {
    month: "November",
    length: 30,
  },
  {
    month: "December",
    length: 31,
  },
];

const modal = document.getElementById("popup-modal");
const openButtons = document.querySelectorAll(".openModalBtn");
const closeBtn = document.getElementById("closeModal");
const monthName = document.getElementById("month-name");
const datesContainer = document.querySelector(".dates");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const proceedBtn = document.querySelector(".proceedBtn");

let currentMonth = 10;

openButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";

    if (btn.id === "customBtn") {
      currentRedirect = "/customize-place.html";
    } else if (btn.id === "templatedBtn") {
      currentRedirect = "/templated-place.html";
    }

    loadDates();
  });
});
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
});
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
  document.body.style.overflow = "auto";
});

function loadDates() {
  monthName.textContent = months[currentMonth].month;
  const dates = dateAvailability(months[currentMonth].length);
  datesContainer.innerHTML = "";
  proceedBtn.classList.add("disabled");
  dates.forEach((date) => {
    const dateElement = document.createElement("div");
    dateElement.textContent = date.date;
    dateElement.className = date.availability ? "available" : "unavailable";

    if (date.availability) {
      dateElement.addEventListener("click", () => {
        const isSelected = dateElement.classList.contains("selected");

        datesContainer.querySelectorAll(".selected").forEach((el) => {
          el.classList.remove("selected");
        });

        if (!isSelected) {
          dateElement.classList.add("selected");
          proceedBtn.classList.remove("disabled");
        } else {
          proceedBtn.classList.add("disabled");
        }
      });
    }
    datesContainer.appendChild(dateElement);
  });
}

nextBtn.addEventListener("click", () => {
  if (currentMonth < months.length - 1) {
    currentMonth++;
  } else {
    currentMonth = 0;
  }
  loadDates();
});
prevBtn.addEventListener("click", () => {
  if (currentMonth > 0) {
    currentMonth--;
  } else {
    currentMonth = months.length - 1;
  }
  loadDates();
});
proceedBtn.addEventListener("click", () => {
  if (!proceedBtn.classList.contains("disabled") && currentRedirect) {
    window.location.href = currentRedirect;
  }
});

