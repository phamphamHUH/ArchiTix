const contents = [
  {
    src: "../../assets/images/placeholder.png",
    name: "Araneta",
    location: "Cubao",
    rate: "10%",
  },
  {
    src: "../../assets/images/placeholder.png",
    name: "Araneta",
    location: "Cubao",
    rate: "100%",
  },
  {
    src: "../../assets/images/placeholder.png",
    name: "Araneta",
    location: "Cubao",
    rate: "10%",
  },
  {
    src: "../../assets/images/placeholder.png",
    name: "Araneta",
    location: "Cubao",
    rate: "100%",
  },
  {
    src: "../../assets/images/placeholder.png",
    name: "Araneta",
    location: "Cubao",
    rate: "10%",
  },
  {
    src: "../../assets/images/placeholder.png",
    name: "Araneta",
    location: "Cubao",
    rate: "100%",
  },
];

const container = document.getElementById("event-places");

contents.forEach((place) => {
  const card = document.createElement("div");
  card.classList.add("event");
  const img = document.createElement("img");
  img.src = place.src;
  img.alt = "Event Place Picture";
  card.appendChild(img);
  const eventDetails = document.createElement("div");
  const h3 = document.createElement("h3");
  const location = document.createElement("h5");
  const price = document.createElement("h5");
  h3.textContent = `Venue: ${place.name}`;
  location.textContent = `Location: ${place.location}`;
  price.textContent = `Commission: ${place.rate}`;
  eventDetails.appendChild(h3);
  eventDetails.appendChild(location);
  eventDetails.appendChild(price);
  card.appendChild(eventDetails);
  container.appendChild(card);
});
