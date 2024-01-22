const friendsSection = document.getElementById("friends-section");
const sxSection = document.getElementById("sx-part");
const midSection = document.getElementById("mid-part");

document.getElementById("friendBtn").addEventListener("click", () => {
  if (friendsSection.style.display === "none") {
    friendsSection.style.display = "block";
    midSection.classList.remove("col-10");
  } else {
    friendsSection.style.display = "none";
    midSection.classList.add("col-10");
  }
});

const midBanner = document.getElementById("bannerMid");
document.getElementById("hide-Banner-Btn").addEventListener("click", () => {
  if (midBanner.style.display === "none") {
    midBanner.style.display = "block";
  } else {
    midBanner.style.display = "none";
  }
});
