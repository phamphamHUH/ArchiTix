// DETECTS MOUSE MOVEMENT FOR MOUSE GLOW
document.addEventListener("mousemove", (e) => {
  const glow = document.getElementById("mouse-glow");
  if (glow) {
    glow.style.transform = `translate(${e.clientX - 125}px, ${
      e.clientY - 125
    }px)`;
  }
});

const contentsContainer = document.getElementById("contents-container");
const categories = [
  {
    title: "Entertainment",
    items: [
      "Concert",
      "Festival",
      "Movie",
      "Theater / Musical",
      "Comedy Show",
      "Talent Show",
    ],
  },
  {
    title: "Sports",
    items: [
      "Basketball",
      "Volleyball",
      "Football",
      "Baseball",
      "Martial Arts",
      "Racing",
      "Esports",
    ],
  },
  {
    title: "Community / Social",
    items: [
      "Birthday",
      "Reunion",
      "Wedding",
      "Anniversary",
      "Local Gathering",
      "Charity Event",
    ],
  },
  {
    title: "Business / Professional",
    items: [
      "Seminar",
      "Workshop",
      "Conference",
      "Expo / Trade Fair",
      "Networking Event",
    ],
  },
  {
    title: "Education",
    items: [
      "Graduation",
      "School Program",
      "Orientation",
      "Academic Conference",
    ],
  },
  {
    title: "Lifestyle / Culture",
    items: [
      "Art Exhibit",
      "Fashion Show",
      "Food Festival",
      "Cultural Event",
      "Religious Event",
    ],
  },
  {
    title: "Parties & Nightlife",
    items: ["Club Party", "Rave", "Bar Event", "New Year Countdown"],
  },
  {
    title: "Custom",
    items: ["Custom Event", "Private Event", "Miscellaneous"],
  },
];

categories.forEach((category) => {
  const wrapper = document.createElement("div");
  wrapper.className = category.title.toLowerCase().replace(/[\s&/]+/g, "-");

  const title = document.createElement("h5");
  title.textContent = category.title;
  wrapper.appendChild(title);

  category.items.forEach((item) => {
    const eventName = document.createElement("h6");
    eventName.textContent = item;
    wrapper.appendChild(eventName);
  });

  if (contentsContainer) contentsContainer.appendChild(wrapper);
});

const socmed = [
  {
    href: "https://www.facebook.com/randy.juanjr",
    icon: "assets/icons/facebook.png",
    alt: "Facebook Icon",
  },
  {
    href: "https://www.instagram.com/yourprofile",
    icon: "assets/icons/instagram.png",
    alt: "Instagram Icon",
  },
  {
    href: "https://twitter.com/yourprofile",
    icon: "assets/icons/twitter.png",
    alt: "Twitter Icon",
  },
  {
    href: "https://www.youtube.com/yourchannel",
    icon: "assets/icons/youtube.png",
    alt: "YouTube Icon",
  },
  {
    href: "https://www.tiktok.com/@yourprofile",
    icon: "assets/icons/tiktok.png",
    alt: "TikTok Icon",
  },
];

const socmedContainer = document.getElementById("socmed-container");

socmed.forEach((socials) => {
  const a = document.createElement("a");
  a.href = socials.href;
  a.target = "_blank";

  const img = document.createElement("img");
  img.src = socials.icon;
  img.alt = socials.alt;

  a.appendChild(img);
  if (socmedContainer) socmedContainer.appendChild(a);
});

const hamburger = document.getElementById("hamburger");
const nav = document.querySelector("nav");

if (nav) nav.classList.add("mobile-hidden");

if (hamburger && nav) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    nav.classList.toggle("show");
  });
}

window.Auth = {
  isTokenExpired(token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  },

  isLoggedIn() {
    const token = localStorage.getItem("token");

    if (!token || this.isTokenExpired(token)) {
      localStorage.removeItem("token");
      return false;
    }

    return true;
  },

  saveToken(token) {
    localStorage.setItem("token", token);
  },

  logout() {
    localStorage.removeItem("token");
    alert("You have been logged out");
    window.location.href = "/index.html";
  },
};

const pfp = document.getElementById("pfp");
const loadPfp = () => {
  if (pfp && Auth.isLoggedIn()) {
    const token = localStorage.getItem("token");
    const payload = JSON.parse(atob(token.split(".")[1]));
    pfp.src = payload.user.profile_pic;
  }
};
document.addEventListener("DOMContentLoaded", () => {
  loadPfp();
});
