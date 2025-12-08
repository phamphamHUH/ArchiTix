let venuesList;
const container = document.getElementById("event-places");
// FETCHING
async function fetchVenues() {
  const res = await fetch(
    "http://localhost/ArchiTIx/server/api/venues/getVenues.php"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch venues");
  }

  return await res.json();
}
// CREATING INDIVIDUAL VENUE CARD
function createCard(venue) {
  const card = document.createElement("div");
  card.classList.add("event");
  card.innerHTML = `
    <img src="${venue.image}" alt="Event Image" class="image"/>
    <div class="eventDetails">
      <h3>${venue.name}</h3>
      <h5>Location: ${venue.location}</h5>
      <h5>Rate: ${venue.rate}</h5>
      <h5>Capacity: ${venue.capacity}</h5>
        <a href="../../edit-event.html?name=${encodeURIComponent(venue.name)}">
          <button>
            <div><img src="../../assets/images/edit.png" alt="Edit Icon" /></div>
            Edit Venue
          </button>
        </a>
    </div>
 `;

  return card;
}
// LOADING VENUES INSIDE THE WEBSITE
async function loadVenues() {
  try {
    venuesList = await fetchVenues();

    container.innerHTML = "";
    venuesList.venues.forEach((venue) => {
      container.appendChild(createCard(venue));
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

loadVenues();
// SEARCH FUNCTION
const searchValue = document.getElementById("search-input");
searchValue.addEventListener("input", () => {
  search(searchValue.value);
});

searchIcon.addEventListener("click", () => {
  searchInput.focus();
});

function search(searchValue) {
  container.innerHTML = "";

  const filteredVenues = venuesList.venues.filter(
    (e) =>
      e.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      e.location.toLowerCase().includes(searchValue.toLowerCase())
  );

  filteredVenues.forEach((venue) => {
    container.appendChild(createCard(venue));
  });
}
// FILTER FUNCTION
const filterValue = document.getElementById("event-filter");

filterIcon.addEventListener("click", () => {
  filterInput.focus();
});

filterValue.addEventListener("change", () => {
  filter(filterValue.value);
});

function filter(filterCriteria) {
  container.innerHTML = "";

  let min = 0;
  let max = Infinity;
  let type = "";

  switch (filterCriteria) {
    case "Capacity: 0-10,000":
      type = "capacity";
      min = 0;
      max = 10000;
      break;

    case "Capacity: 10,001-20,000":
      type = "capacity";
      min = 10001;
      max = 20000;
      break;

    case "Capacity: 20,001-30,000":
      type = "capacity";
      min = 20001;
      max = 30000;
      break;

    case "Rate: 10-12":
      type = "rate";
      min = 10;
      max = 12;
      break;

    case "Rate: 13-15":
      type = "rate";
      min = 13;
      max = 15;
      break;

    default:
      break;
  }

  const filteredVenues = venuesList.venues.filter((v) => {
    if (type === "") return true;
    return v[type] >= min && v[type] <= max;
  });

  filteredVenues.forEach((venue) => {
    container.appendChild(createCard(venue));
  });
}
