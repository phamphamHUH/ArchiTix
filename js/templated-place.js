const contents = [
  {
    src: "../../assets/images/StaRosaSportsComplex.png",
    name: "Sta. Rosa Sports Complex",
    location: "Sta. Rosa, Laguna",
    rate: "10%",
  },
  {
    src: "../../assets/images/FilOilEcoilCentre.png",
    name: "FilOil EcoOil Centre",
    location: "San Juan, Metro Manila",
    rate: "15%",
  },
  {
    src: "../../assets/images/CandonCityArena.png",
    name: "Candon City Arena",
    location: "Candon, Ilocos Sur",
    rate: "12%",
  },
  {
    src: "../../assets/images/7.png",
    name: "Newport Performing Arts Theatre",
    location: "Pasay City",
    rate: "13%",
  },
  {
    src: "../../assets/images/DL.png",
    name: "DL Umali Auditorium",
    location: "Los Baños, Laguna",
    rate: "14%",
  },
  {
    src: "../../assets/images/CGF.png",
    name: "CCF Center Auditorium",
    location: "Ortigas, Pasig City",
    rate: "11%",
  },
];

const container = document.getElementById("event-places");

contents.forEach((place) => {
  const card = document.createElement("div");
  card.classList.add("event");
  card.innerHTML = `
    <img src="${place.img}" alt="Event Image" class="image"/>
    <div class="eventDetails">
      <h3>${place.name}</h3>
      <h5>Location: ${place.place}</h5>
      <h5>Price: ${place.price}</h5>
        <a href="../../edit-event.html">
          <button>
            <div><img src="../../assets/images/edit.png" alt="Edit Icon" /></div>
            Edit Venue
          </button>
        </a>
    </div>
 `;
  container.appendChild(card);
});
