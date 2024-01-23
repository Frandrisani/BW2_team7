// * Qui dichiariamo all'interno di js TUTTI GLI ELEMENTI HTML
const imgAlbumTopSection = document.getElementById("imgAlbumTopSection");
const img2AlbumTopSection = document.getElementById("img2AlbumTopSection");
const titoloAlbumTopSection = document.getElementById("titoloAlbumTopSection");
const nomeArtistaTopSection = document.getElementById("nomeArtistaTopSection");
const numeroBraniAlbumTopSection = document.getElementById(
  "numeroBraniAlbumTopSection"
);
const totMinutiTopSection = document.getElementById("totMinutiTopSection");

const containerRowSongs = document.getElementById("containerRowSongs");
const spinenr = document.getElementById("spinner");
const myURL = "https://striveschool-api.herokuapp.com/api/deezer/album";

const addressBarContent = new URLSearchParams(location.search);
console.log(addressBarContent);

const albumId = addressBarContent.get("albumId");
console.log(albumId);

fetch(myURL + "/" + 76526962)
  .then((response) => {
    // * Qui aggiungiamo una classe "d-none" allo spinner di caricamento presente in HTML
    // INIZIO CODICE SPINNER
    spinenr.classList.add("d-none");
    // FINE CODICE SPINNER
    // * Ora controlliamo che la risposta da parte del server sia "ok"; se ok, chiediamo di servirci tutti i dati in file json
    if (response.ok) {
      return response.json();
    }
    // * ALTRIMENTI, IN BASE ALL'ERRORE ANDIAMO A FINIRE NEL CATCH
    else {
      throw new Error("Errore nella chiamata");
    }
  })
  .then((album) => {
    console.log(album);
    imgAlbumTopSection.src = `${album.cover_medium}`;
    img2AlbumTopSection.src = `${album.cover_small}`;
    titoloAlbumTopSection.innerText = `${album.title}`;
    nomeArtistaTopSection.innerText = `${album.artist.name} ·`;
    numeroBraniAlbumTopSection.innerText = `${album.tracks.data.lenght} ·`;
    totMinutiTopSection.innerText = `${album.duration} `;

    album.tracks.data.forEach((element, i) => {
      const rowSongDinamic = document.createElement("div");
      rowSongDinamic.classList.add("row");
      rowSongDinamic.innerHTML = `    
        <div class="row">
          <div class="col col-1 d-none d-md-block text-fontB50">${i + 1}</div>
          <div class="col col-6">
            <p class="mb-0 text-fontB fs-6 fw-medium">${element.title}</p>
            <p class="mt-0 text-fontB50 opacity-50 ">${element.artist.name}</p>
          </div>
          <div class="col col-4 d-none d-md-block">
            <p class="text-fontB50 ">${element.rank}</p>
          </div>
          <div class="col col-1 d-none d-md-block text-fontB50">${
            element.duration
          }</div>
        </div>`;
      containerRowSongs.appendChild(rowSongDinamic);
    });
  });
