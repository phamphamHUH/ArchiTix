// HOVER MESSAGE EFFECT
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

// CALENDAR POPUP
function dateAvailability(length) {
  return Array.from({ length }, (_, i) => ({
    date: i + 1,
    availability: Math.random() < 0.7,
  }));
}
const months = [
  { month: "January", length: 31 },
  { month: "February", length: 28 },
  { month: "March", length: 31 },
  { month: "April", length: 30 },
  { month: "May", length: 31 },
  { month: "June", length: 30 },
  { month: "July", length: 31 },
  { month: "August", length: 31 },
  { month: "September", length: 30 },
  { month: "October", length: 31 },
  { month: "November", length: 30 },
  { month: "December", length: 31 },
];
// DATE POPUP
const modal = document.getElementById("popup-modal");
const openButtons = document.querySelectorAll(".openModalBtn");
const closeDateBtn = document.getElementById("closeModal");
const monthName = document.getElementById("month-name");
const datesContainer = document.querySelector(".dates");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const proceedBtn = document.querySelector(".proceedBtn");
// REGISTER/LOGIN POPUP
const registerModal = document.getElementById("profile-overlay-register");
const loginModal = document.getElementById("profile-overlay-login");
const closeProfileBtn = document.getElementById("closeProfileBtn");
const registerToLogin = document.getElementById("open-login");
const loginToRegister = document.getElementById("open-register");

let currentMonth = 10;
let isLoggedIn = false;
openButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (!isLoggedIn) {
      registerModal.style.display = "block";
      return;
    }
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

registerToLogin.addEventListener("click", () => {
  registerModal.style.display = "none";
  loginModal.style.display = "flex";
  document.body.style.overflow = "hidden";
});
loginToRegister.addEventListener("click", () => {
  loginModal.style.display = "none";
  registerModal.style.display = "flex";
  document.body.style.overflow = "hidden";
});

// CLOSE BUTTON FUNCTIONALITY
attachClose("closeDateModal", "popup-modal");
attachClose("closeProfileRegister", "profile-overlay-register");
attachClose("closeProfileLogin", "profile-overlay-login");
function attachClose(btnId, modalId) {
  const btn = document.getElementById(btnId);
  const modal = document.getElementById(modalId);

  if (!btn || !modal) return;

  btn.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  });
}
// CLOSES MODAL AFTER OUTSIDE MODAL CLICK FUNCTIONALITY
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
  if (e.target === registerModal) registerModal.style.display = "none";
  if (e.target === loginModal) loginModal.style.display = "none";
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

// DATE PICKER BUTTONS FUNCTIONALITY
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

document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const agree = document.getElementById("agree");
    if (!agree || !agree.checked) {
      alert("You must agree to the Terms and Conditions to register.");
      return;
    }
    const data = {
      firstName: document.getElementById("firstName").value.trim(),
      lastName: document.getElementById("lastName").value.trim(),
      email: document.getElementById("email").value.trim(),
      password: document.getElementById("password").value,
    };

    try {
      const res = await fetch(
        "http://localhost/ArchiTIx/server/api/auth/register.php",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();

      if (result.error) {
        alert(result.error);
        return;
      }

      alert("Registration successful");
    } catch (err) {
      console.error("Register error:", err);
      alert("Server error");
    }
  });

// LOGIN
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      email: document.getElementById("logEmail").value.trim(),
      password: document.getElementById("logPassword").value,
    };
    try {
      const res = await fetch(
        "http://localhost/ArchiTIx/server/api/auth/login.php",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      let result;
      try {
        result = await res.json();
      } catch (err) {
        console.error("Invalid Server Response:", err);
        alert("Server Error. Please try again.");
        return;
      }

      if (result.success) {
        alert(result.success);
        localStorage.setItem("token", result.payload);
        if (loginModal) loginModal.style.display = "none";
        document.body.style.overflow = "auto";
        isLoggedIn = true;
      } else if (result.error) {
        alert(result.error);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Network error. Check server and try again.");
    }
  });
}
