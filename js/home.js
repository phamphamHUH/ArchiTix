const heroTitle = document.getElementById("hero-title");

heroTitle.addEventListener("mouseenter", () => {
  heroTitle.textContent = "Discover Amazing Events.";
});

heroTitle.addEventListener("mouseleave", () => {
  heroTitle.textContent = "The Easiest Way to Fill Every Seat.";
});

async function fetchTrendingEvents() {
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
    <img src="${event.event_image}" alt="Event Image" />
    <div class="eventDetails">
      <h3>${event.event_name}</h3>
      <h5>Place: ${event.venue_name}</h5>
      <h5>Price: ₱${Number(event.min_price).toLocaleString()} - ₱${Number(
    event.max_price
  ).toLocaleString()}</h5>
      <h5>Date: ${event.start_time.split(" ")[0]}</h5>
    </div>
  `;

  return card;
}

async function loadEvents() {
  try {
    const data = await fetchTrendingEvents();
    console.log(data.events);
    const container = document.getElementById("events");

    container.innerHTML = "";

    data.events.forEach((event) => {
      if (event.trending) {
        container.appendChild(createCard(event));
      }
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

loadEvents();
