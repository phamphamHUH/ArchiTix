document.addEventListener("DOMContentLoaded", () => {
  if (!Auth.isLoggedIn() && window.location.pathname !== "/index.html") {
    Auth.logout();
  }
});

const eventId = new URLSearchParams(window.location.search).get("id");

async function fetchEventDetails(eventId) {
  const res = await fetch(
    `http://localhost/ArchiTIx/server/api/events/getEvent.php?id=${eventId}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  return await res.json();
}

async function loadEvents() {
  try {
    const result = await fetchEventDetails(eventId);
    const eventDetails = result.event;
    const container = document.getElementById("event-details-container");
    container.appendChild(createCard(eventDetails));
  } catch (error) {
    console.error("Error:", error);
  }
}

function createCard(event) {
  const card = document.createElement("div");
  card.classList.add("event");

  // Parse seating map
  const seatingMap = JSON.parse(event.seating_map);
  console.log(seatingMap);
  const categories = Object.keys(seatingMap);
  renderSeats(seatingMap);

  // Event HTML
  card.innerHTML = `
    <img src="${event.event_image}" alt="Event Image" class="image"/>
    <div class="eventDetails">
      <h3>${event.event_name}</h3>
      <h4>${event.description}</h4>
      <h5>Venue: ${event.venue_name}</h5>
      <h5>Address: ${event.address}</h5>
      <h5>Price: ₱${Number(event.min_price).toLocaleString()} - ₱${Number(
    event.max_price
  ).toLocaleString()}</h5>
      <h5>Date: ${event.start_time.split(" ")[0]}</h5>
      <h5>Start Time: ${event.start_time.split(" ")[1]}</h5>
      <h5>End Time: ${event.end_time.split(" ")[1]}</h5>
      <h5>Organizer: ${event.organizer_name}</h5>
      <h5>Organizer's Contact: ${event.phone}</h5>
      <div class="button-categories" id="button-container"></div>
    </div>
  `;

  // Button container
  const buttonContainer = card.querySelector("#button-container");

  // Create category buttons
  categories.forEach((category) => {
    const button = document.createElement("button");
    const hyperlink = document.createElement("a");
    hyperlink.href = `#${category}`;
    button.textContent = category;

    button.addEventListener("click", () => {
      console.log("Category clicked:", category);
    });
    hyperlink.appendChild(button);
    buttonContainer.appendChild(hyperlink);
  });

  return card;
}

function renderSeats(seatingMap) {
  const seatsContainer = document.getElementById("seats-container");
  seatsContainer.innerHTML = "";
  const header = document.createElement("h3");
  header.textContent = "VENUE SEATS";
  seatsContainer.appendChild(header);

  Object.entries(seatingMap).forEach(([category, seats]) => {
    // Category wrapper
    const categoryDiv = document.createElement("div");
    categoryDiv.classList.add("seat-category");

    // Category title
    const title = document.createElement("h3");
    title.textContent = category;
    title.id = category;

    // Seat grid
    const grid = document.createElement("div");
    grid.classList.add("seat-grid");

    seats.forEach((seatObj) => {
      const seat = document.createElement("div");
      seat.classList.add("seat");
      seat.classList.add(seatObj.available ? "available" : "unavailable");
      seat.textContent = seatObj.seat;
      let selectedSeats = [];

      if (seatObj.available) {
        seat.addEventListener("click", () => {
          const seatKey = `${category}-${seatObj.seat}`;

          if (seat.classList.contains("selected")) {
            seat.classList.remove("selected");
            selectedSeats = selectedSeats.filter((s) => s !== seatKey);
          } else {
            seat.classList.add("selected");
            selectedSeats.push(seatKey);
          }
        });
      }

      grid.appendChild(seat);
    });

    categoryDiv.appendChild(title);
    categoryDiv.appendChild(grid);
    seatsContainer.appendChild(categoryDiv);
  });
}

const proceed = document.getElementById("proceed");
proceed.addEventListener("click", () => {
  alert("proceeding to payment");
});

const back = document.getElementById("backButton");
back.addEventListener("click", () => {
  window.location.href = "../../buy.html";
});
loadEvents();
