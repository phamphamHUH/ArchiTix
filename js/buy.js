// ADDS FOCUS FEATURE WHEN ASSIGNED ICON IS CLICKED
const searchInput = document.getElementById("search-input");
const searchIcon = document.querySelector(".search-icon");
const filterInput = document.getElementById("event-filter");
const filterIcon = document.querySelector(".filter-icon");

searchIcon.addEventListener("click", () => {
  searchInput.focus();
});

filterIcon.addEventListener("click", () => {
  filterInput.focus();
});

const events = [
  {
    name: "Twice",
    place: "Cebu",
    price: "₱1200 - ₱5600",
    img: "assets/images/twice.jpg",
    date: "January 10, 2026",
    status: "upcoming",
  },
  {
    name: "Now You See Me",
    place: "Manila",
    price: "₱1200 - ₱5000",
    img: "assets/images/seeya.jpg",
    date: "March 11, 2026",
    status: "showing",
  },
  {
    name: "Tyler, The Creator",
    place: "Araneta",
    price: "₱1200 - ₱5000",
    img: "assets/images/chroma.jpg",
    date: "February 27, 2026",
    status: "upcoming",
  },
  {
    name: "New Jeans",
    place: "Araneta",
    price: "₱1200 - ₱5000",
    img: "assets/images/njz.png",
    date: "January 06, 2026",
    status: "showing",
  },
  {
    name: "Fantastic 4",
    place: "SM MOA Arena",
    price: "₱1500 - ₱7000",
    img: "assets/images/Fantastic4.png",
    date: "March 20, 2026",
    status: "showing",
  },
  {
    name: "Superman",
    place: "Araneta",
    price: "₱2000 - ₱8000",
    img: "assets/images/superman.jpg",
    date: "April 05, 2026",
    status: "upcoming",
  },
  {
    name: "Coldplay",
    place: "Cebu",
    price: "₱1800 - ₱7500",
    img: "assets/images/coldplay.jpg",
    date: "May 12, 2026",
    status: "showing",
  },
  {
    name: "Imagine Dragons",
    place: "Manila",
    price: "₱1500 - ₱6000",
    img: "assets/images/imagine-dragons.jpg",
    date: "June 02, 2026",
    status: "upcoming",
  },
  {
    name: "BLACKPINK World Tour",
    place: "Araneta",
    price: "₱2000 - ₱9000",
    img: "assets/images/blackpink.jpg",
    date: "July 18, 2026",
    status: "showing",
  },
  {
    name: "Maroon 5",
    place: "Cebu",
    price: "₱1200 - ₱5500",
    img: "assets/images/maroon-5.jpg",
    date: "August 08, 2026",
    status: "upcoming",
  },
  {
    name: "Tyler, The Creator",
    place: "SM MOA Arena",
    price: "₱1200 - ₱5000",
    img: "assets/images/chroma.jpg",
    date: "January 06, 2026",
    status: "showing",
  },
  {
    name: "New Jeans",
    place: "SM MOA Arena",
    price: "₱1200 - ₱5000",
    img: "assets/images/njz.png",
    date: "March 06, 2026",
    status: "upcoming",
  },
];

const showingContainer = document.getElementById("events-showing");
const upcomingContainer = document.getElementById("events-upcoming");

events.forEach((e) => {
  const card = document.createElement("div");
  card.classList.add("event");
  card.innerHTML = `
    <img src="${e.img}" alt="Event Image" class="image"/>
    <div class="eventDetails">
      <h3>${e.name}</h3>
      <h5>Event's Place: ${e.place}</h5>
      <h5>Price: ${e.price}</h5>
      <h5>Date: ${e.date}</h5>
      <button>
        <div><img src="../../assets/icons/seat.png" alt="Seat Icon" /></div>
        View Seats
      </button>
    </div>
    
  `;
  if (e.status === "upcoming") {
    upcomingContainer.appendChild(card);
  } else {
    showingContainer.appendChild(card);
  }
});

const filterValue = document.getElementById("event-filter");

filterValue.addEventListener("change", () => {
  filter(filterValue.value);
});

function filter(filterCriteria) {
  showingContainer.innerHTML = "";
  upcomingContainer.innerHTML = "";

  let sortedEvents = [...events];

  switch (filterCriteria) {
    case "Price - Low to High":
      sortedEvents.sort((a, b) => {
        const aMin = parseInt(
          a.price
            .replace(/[^0-9]/g, "")
            .split("")
            .slice(0, 4)
            .join("")
        );
        const bMin = parseInt(
          b.price
            .replace(/[^0-9]/g, "")
            .split("")
            .slice(0, 4)
            .join("")
        );
        return aMin - bMin;
      });
      break;
    case "Price - High to Low":
      sortedEvents.sort((a, b) => {
        const aMin = parseInt(
          a.price
            .replace(/[^0-9]/g, "")
            .split("")
            .slice(0, 4)
            .join("")
        );
        const bMin = parseInt(
          b.price
            .replace(/[^0-9]/g, "")
            .split("")
            .slice(0, 4)
            .join("")
        );
        return bMin - aMin;
      });
      break;
    case "Newest First":
      sortedEvents.sort((a, b) => new Date(b.date) - new Date(a.date));

      break;
    case "Oldest First":
      sortedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
  }

  sortedEvents.forEach((e) => {
    const card = document.createElement("div");
    card.classList.add("event");
    card.innerHTML = `
      <img src="${e.img}" alt="Event Image" class="image"/>
      <div class="eventDetails">
        <h3>${e.name}</h3>
        <h5>Event's Place: ${e.place}</h5>
        <h5>Price: ${e.price}</h5>
        <h5>Date: ${e.date}</h5>
        <button>
          <div><img src="../../assets/icons/seat.png" alt="Seat Icon" /></div>
          View Seats
        </button>
      </div>
    `;
    if (e.status === "upcoming") upcomingContainer.appendChild(card);
    else showingContainer.appendChild(card);
  });
}

const searchValue = document.getElementById("search-input");

searchValue.addEventListener("input", () => {
  search(searchValue.value);
});

function search(searchValue) {
  showingContainer.innerHTML = "";
  upcomingContainer.innerHTML = "";

  const filteredEvents = events.filter(
    (e) =>
      e.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      e.place.toLowerCase().includes(searchValue.toLowerCase())
  );

  filteredEvents.forEach((e) => {
    const card = document.createElement("div");
    card.classList.add("event");
    card.innerHTML = `
      <img src="${e.img}" alt="Event Image" class="image"/>
      <div class="eventDetails">
        <h3>${e.name}</h3>
        <h5>Event's Place: ${e.place}</h5>
        <h5>Price: ${e.price}</h5>
        <h5>Date: ${e.date}</h5>
        <button>
          <div><img src="../../assets/icons/seat.png" alt="Seat Icon" /></div>
          View Seats
        </button>
      </div>
    `;
    if (e.status === "upcoming") upcomingContainer.appendChild(card);
    else showingContainer.appendChild(card);
  });
}
