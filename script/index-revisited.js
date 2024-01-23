// friends btn
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

// mid-banner dinamic
const midBanner = document.getElementById("bannerMid");
const myUrl = " https://striveschool-api.herokuapp.com/api/deezer/album";
let artistId = Math.floor(Math.random() * (756250 - 756200 + 1)) + 756200;

fetch(myUrl + "/" + artistId, {})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Status: ${response.status}`);
    }
  })
  .then((artist) => {
    console.log(artist);
    createBanner(artist);
  })
  .catch((err) => {
    console.log(err);
  });

const createBanner = (artist) => {
  const newBanner = document.createElement("div");
  newBanner.innerHTML = `
  <div class="row no-gutters">
              <div class="col-md-2">
                <img
                  src="${artist.cover_medium}"
                  class="card-img rounded-0 ms-2 my-4"
                  alt="Card Image"
                />
              </div>
              <div class="col-md-10">
                <div
                  class="card-body py-3 d-flex flex-column justify-content-between h-100"
                >
                  <div class="d-flex justify-content-between">
                    <p class="fw-semibold">ALMBUM</p>
                    <div
                      class="btn bg-grigino text-fontB rounded-5 fs-6"
                      id="hide-Banner-Btn"
                    >
                      NASCONDI ANNUNCI
                    </div>
                  </div>
                  <div class="mb-5">
                    <h5 class="card-title">${artist.title} </h5>
                    <p class="card-text">${artist.artist.name}</p>
                    <p class="card-text">
                      <small>Ascolta il nuovo singolo di ${artist.artist.name}</small>
                    </p>
                  </div>
                  <div >
                    <div
                      class="btn bg-primary text-light fw-semibold rounded-5 px-4 me-3"
                    >
                      Play
                    </div>

                    <div
                      class="btn bg-black text-light fw-semibold rounded-5 border border-grigino px-4 me-3"
                    >
                      Salva
                    </div>
                    <i class="bi bi-three-dots"></i>
                 </div>
            </div>
      </div>
</div>
  `;
  // hide banner btn
  midBanner.appendChild(newBanner);
  document.getElementById("hide-Banner-Btn").addEventListener("click", () => {
    if (midBanner.style.display === "none") {
      midBanner.style.display = "block";
    } else {
      midBanner.style.display = "none";
    }
  });
};
