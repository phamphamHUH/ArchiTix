document.addEventListener("DOMContentLoaded", () => {
  if (!Auth.isLoggedIn() && window.location.pathname !== "/index.html") {
    Auth.logout();
  }
});

const token = localStorage.getItem("token");
const payload = JSON.parse(atob(token.split(".")[1]));
const id = payload.user.id;

async function fetchEventDetails(id) {
  const res = await fetch(
    `http://localhost/ArchiTIx/server/api/users/getUserInfo.php?id=${id}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  return await res.json();
}

async function loadInfo(id) {
  try {
    const result = await fetchEventDetails(id);
    const info = result.info;
    setDetails(info);
  } catch (error) {
    console.error("Error:", error);
  }
}

function setDetails(info) {
  const userPicture = document.getElementById("profilePicture");
  userPicture.src = info.profile_pic;
  const userName = document.getElementById("userName");
  userName.textContent = `${info.first_name} ${info.last_name}`;
  const email = document.getElementById("userEmail");
  email.textContent = info.email;
  const contact = document.getElementById("contactNum");
  contact.textContent = "09121234431";
}

loadInfo(id);
