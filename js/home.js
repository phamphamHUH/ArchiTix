const heroTitle = document.getElementById("hero-title");

heroTitle.addEventListener("mouseenter", () => {
  heroTitle.textContent = "Discover Amazing Events.";
});

heroTitle.addEventListener("mouseleave", () => {
  heroTitle.textContent = "The Easiest Way to Fill Every Seat.";
});

const events = [
  {
    name: "Twice",
    place: "Cebu",
    price: "₱1200 - ₱5600",
    img: "assets/images/twice.jpg",
    date: "January 10, 2026",
  },
  {
    name: "Tyler, The Creator",
    place: "Araneta",
    price: "₱1200 - ₱5000",
    img: "assets/images/chroma.jpg",
    date: "February 27, 2026",
  },
  {
    name: "Now You See Me, Now You Don't",
    place: "Manila",
    price: "₱1200 - ₱5000",
    img: "assets/images/seeya.jpg",
    date: "March 11, 2026",
  },
  {
    name: "New Jeans",
    place: "Araneta",
    price: "₱1200 - ₱5000",
    img: "assets/images/njz.png",
    date: "January 06, 2026",
  },
];

const container = document.getElementById("events");

events.forEach((e) => {
  const card = document.createElement("div");
  card.classList.add("event");
  card.innerHTML = `
    <img src="${e.img}" alt="Event Image" />
    <div class="eventDetails">
      <h3>${e.name}</h3>
      <h5>Event's Place: ${e.place}</h5>
      <h5>Price: ${e.price}</h5>
      <h5>Date: ${e.date}</h5>
    </div>
  `;
  container.appendChild(card);
});
