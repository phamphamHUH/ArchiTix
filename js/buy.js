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

function filter() {}

function search() {}
