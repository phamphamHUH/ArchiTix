// ADDS FOCUS FEATURE WHEN ASSIGNED ICON IS CLICKED
const searchInput = document.getElementById("search-input");
const searchIcon = document.querySelector(".search-icon");
const filterInput = document.getElementById("event-filter");
const filterIcon = document.querySelector(".filter-icon");
// CONTAINERS
const showingContainer = document.getElementById("events-showing");
const upcomingContainer = document.getElementById("events-upcoming");
// FILTER AND SEARCH VALUE
const filterValue = document.getElementById("event-filter");
const searchValue = document.getElementById("search-input");
// DATA VARIABLE
let eventsList;

async function fetchEvents() {
  const res = await fetch(
    "http://localhost/ArchiTIx/server/api/events/getEvents.php"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  return await res.json();
}

function createCard(event) {
  const card = document.createElement("div");
  card.classList.add("event");
  card.innerHTML = `
    <img src="${event.event_image}" alt="Event Image" class="image"/>
    <div class="eventDetails">
      <h3>${event.event_name}</h3>
      <h5>Venue: ${event.venue_name}</h5>
      <h5>Price: ₱${Number(event.min_price).toLocaleString()} - ₱${Number(
    event.max_price
  ).toLocaleString()}</h5>
      <h5>Date: ${event.start_time.split(" ")[0]}</h5>
      <button class="viewSeatsBtn" data-id="${event.id}">
        <div><img src="../../assets/icons/seat.png" alt="Seat Icon" /></div>
        View Seats
      </button>
    </div> 
    
  `;
  return card;
}

async function loadEvents() {
  try {
    eventsList = await fetchEvents();
    console.log(eventsList);

    showingContainer.innerHTML = "";
    upcomingContainer.innerHTML = "";
    eventsList.events.forEach((event) => {
      if (event.status === "upcoming") {
        showingContainer.appendChild(createCard(event));
      } else {
        upcomingContainer.appendChild(createCard(event));
      }
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

loadEvents();

filterIcon.addEventListener("click", () => {
  filterInput.focus();
});

filterValue.addEventListener("change", () => {
  filter(filterValue.value);
});

function filter(filterCriteria) {
  showingContainer.innerHTML = "";
  upcomingContainer.innerHTML = "";

  let sortedEvents = [...eventsList.events];

  switch (filterCriteria) {
    case "Min Price - Low to High":
      sortedEvents.sort((a, b) => {
        const aMin = a.min_price;
        const bMin = b.min_price;
        return aMin - bMin;
      });
      break;
    case "Min Price - High to Low":
      sortedEvents.sort((a, b) => {
        const aMin = a.min_price;
        const bMin = b.min_price;
        return bMin - aMin;
      });
      break;
    case "Max Price - Low to High":
      sortedEvents.sort((a, b) => {
        const aMax = a.max_price;
        const bMax = b.max_price;
        return aMax - bMax;
      });
      break;
    case "Max Price - High to Low":
      sortedEvents.sort((a, b) => {
        const aMax = a.max_price;
        const bMax = b.max_price;
        return bMax - aMax;
      });
      break;
    case "Newest First":
      sortedEvents.sort(
        (a, b) =>
          new Date(b.start_time.split(" ")[0]) -
          new Date(a.start_time.split(" ")[0])
      );

      break;
    case "Oldest First":
      sortedEvents.sort(
        (a, b) =>
          new Date(a.start_time.split(" ")[0]) -
          new Date(b.start_time.split(" ")[0])
      );
      break;
  }

  sortedEvents.forEach((event) => {
    if (event.status === "upcoming")
      upcomingContainer.appendChild(createCard(event));
    else showingContainer.appendChild(createCard(event));
  });
}

searchIcon.addEventListener("click", () => {
  searchInput.focus();
});

searchValue.addEventListener("input", () => {
  search(searchValue.value);
});

function search(searchValue) {
  showingContainer.innerHTML = "";
  upcomingContainer.innerHTML = "";

  const filteredEvents = eventsList.events.filter(
    (event) =>
      event.event_name.toLowerCase().includes(searchValue.toLowerCase()) ||
      event.venue_name.toLowerCase().includes(searchValue.toLowerCase())
  );

  filteredEvents.forEach((e) => {
    if (e.status === "upcoming") upcomingContainer.appendChild(createCard(e));
    else showingContainer.appendChild(createCard(e));
  });
}

// REGISTER/LOGIN/TERMS POPUP
const registerModal = document.getElementById("profile-overlay-register");
const loginModal = document.getElementById("profile-overlay-login");
const termsModal = document.getElementById("profile-overlay-terms");
const registerToLogin = document.getElementById("open-login");
const registerToTerms = document.getElementById("open-terms");
const loginToRegister = document.getElementById("open-register");
// BUTTON VARIABLES
const agree = document.getElementById("agree");
const decline = document.getElementById("decline");
const agreeBox = document.getElementById("agreeBox");
const googleReg = document.getElementById("google-register");
const appleReg = document.getElementById("apple-register");
const googleLog = document.getElementById("google-login");
const appleLog = document.getElementById("apple-login");

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".viewSeatsBtn");
  if (!btn) return;

  const eventId = btn.dataset.id;

  if (!Auth.isLoggedIn()) {
    registerModal.style.display = "flex";
    document.body.style.overflow = "hidden";
    return;
  }

  window.location.href = `../../event-details.html?id=${eventId}`;
});

// TEXT REDIRECTS FUNCTIONALITY
registerToLogin.addEventListener("click", () => {
  registerModal.style.display = "none";
  loginModal.style.display = "flex";
  document.body.style.overflow = "hidden";
});
registerToTerms.addEventListener("click", () => {
  registerModal.style.display = "none";
  termsModal.style.display = "flex";
  document.body.style.overflow = "hidden";
});
loginToRegister.addEventListener("click", () => {
  loginModal.style.display = "none";
  registerModal.style.display = "flex";
  document.body.style.overflow = "hidden";
});

// BUTTONS FUNCTIONALITY
agree.addEventListener("click", () => {
  termsModal.style.display = "none";
  registerModal.style.display = "flex";
  document.body.style.overflow = "hidden";
  agreeBox.checked = true;
});

decline.addEventListener("click", () => {
  termsModal.style.display = "none";
  registerModal.style.display = "flex";
  document.body.style.overflow = "hidden";
  agreeBox.checked = false;
});

googleReg.addEventListener("click", () => {
  alert("Signing-in using Google account");
});

appleReg.addEventListener("click", () => {
  alert("Signing-in using Apple account");
});

googleLog.addEventListener("click", () => {
  alert("Logging-in using Google account");
});

appleLog.addEventListener("click", () => {
  alert("Logging-in using Apple account");
});
// CLOSE BUTTONS FUNCTIONALITY
attachClose("closeProfileRegister", "profile-overlay-register");
attachClose("closeProfileLogin", "profile-overlay-login");
attachClose("closeTerms", "profile-overlay-terms");
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
  if (e.target === termsModal) termsModal.style.display = "none";
  if (e.target === registerModal) registerModal.style.display = "none";
  if (e.target === loginModal) loginModal.style.display = "none";
  document.body.style.overflow = "auto";
});

document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!agreeBox || !agreeBox.checked) {
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
      registerModal.style.display = "none";
      loginModal.style.display = "flex";
      document.body.style.overflow = "hidden";
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
        Auth.saveToken(result.payload);

        if (loginModal) loginModal.style.display = "none";
        document.body.style.overflow = "auto";
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
