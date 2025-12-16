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
      <h5>Place: ${event.venue_name}</h5>
      <h5>Price: ₱${Number(event.min_price).toLocaleString()} - ₱${Number(
    event.max_price
  ).toLocaleString()}</h5>
      <h5>Date: ${event.start_time.split(" ")[0]}</h5>
        <a href="../../event-details.html">
          <button>
            <div><img src="../../assets/icons/seat.png" alt="Seat Icon" /></div>
            View Seats
          </button>
        </a>
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
