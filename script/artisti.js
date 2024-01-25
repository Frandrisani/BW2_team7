// getting reference of elements to fill
const artistCover = document.getElementById("artist-cover");
const artistName = document.getElementById("artist-name");
const artistListeners = document.getElementById("nb-fan");
const tracksContainer = document.getElementById("traccia-album");
const artistCircular = document.getElementById("artist-circular");
const byArtist = document.getElementById("by-artist");
const numberOfLikes = document.getElementById("likes-num");
const moreButton = document.getElementById("visaulizza");

//funzione svuota col
const emptyCol = () => {
  tracksContainer.innerHTML = ``;
};
//funzione random mi piace
const randomLikes = () => {
  let likes = Math.ceil(Math.random() * 11);
  numberOfLikes.innerText = `${likes}`;
};

// FUNZIONE di Francesco per il minutaggio
function convertiSecondiAMinutiESecondi(secondi) {
  const minuti = Math.floor(secondi / 60);
  const restantiSecondi = secondi % 60;
  if (restantiSecondi > 59) {
    minuti += 1;
    restantiSecondi -= 60;
  }
  const formatoMinutiSecondi = `${minuti}:${
    restantiSecondi < 10 ? "0" : ""
  }${restantiSecondi}`;

  return formatoMinutiSecondi;
}
// funzione punto
const riproduzioniConIlPunto = function (numero) {
  const numeroFormattato = numero.toLocaleString();
  console.log(numeroFormattato);
  return numeroFormattato;
};

//funzione tracklist
const gettingTracks = (tracks) => {
  tracks.forEach((track, i) => {
    // emptyCol();
    const newRow = document.createElement("div");
    newRow.classList.add("row", "align-items-center", "g-1");
    newRow.innerHTML = `
                <div class="col">
                <h5>${i + 1}</h5>
                </div>
                <div class="col">
                <img src="${
                  track.album.cover_small
                }" class="img-thumbnail" alt="album-cover">
              </div>
              <div class="col">
                <h5>${track.title_short}</h5>
              </div>
              <div class="col d-sm-none">
                <i class="bi bi-three-dots-vertical text-fontB50 fs-1"></i>
              </div>
              <div class="col">
                <h6 class="fw-light">${riproduzioniConIlPunto(track.rank)}</h6>
              </div>
              <div class="col d-none d-sm-block">
                <h6 class="fw-light">${convertiSecondiAMinutiESecondi(
                  track.duration
                )}</h6>
              </div>`;
    tracksContainer.appendChild(newRow);
    if (i > 9) {
      newRow.classList.add("d-none");
    }
    moreButton.addEventListener("click", () => {
      newRow.classList.toggle("d-none");
    });
  });
};

// riempio dinamicamente la pagina
const artistURL = "https://striveschool-api.herokuapp.com/api/deezer/artist";
const addressBar = new URLSearchParams(location.search);
const artistID = addressBar.get("artistID");
// questa la commento per il momento e assegno alla const un valore statico
// const artistID = 412;
fetch(`${artistURL}/${artistID}`)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(response.status);
    }
  })
  .then((artist) => {
    console.log(artist);
    //condizione bg-img con media queries
    // if (window.innerWidth <= 576) {
    //   artistCover.style.backgroundImage = `url(${artist.picture_medium})`;
    // } else {
    // }
    artistCover.style.backgroundImage = `url(${artist.picture_xl})`;
    artistCover.style.backgroundRepeat = "no-repeat";
    artistCover.style.backgroundSize = "cover";
    artistCover.classList.add("img-fluid");
    artistName.innerText = artist.name;
    artistListeners.innerText = artist.nb_fan;
    artistCircular.src = `${artist.picture}`;
    byArtist.innerText = `di ${artist.name}`;
    //richaimo funzione per dare like a random
    randomLikes();

    // faccio fetch dell'api nell'api
    const artistTracklist = artist.tracklist;
    console.log(artistTracklist);
    fetch(artistTracklist)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.status);
        }
      })
      //ora posso lavorare con l'array delle tracce
      .then((tracklist) => {
        console.log(tracklist.data);
        gettingTracks(tracklist.data);
      });
  })

  // qui gestisco l'errore che ho'gettato' nell'else
  .catch((err) => {
    alert(err);
  });
