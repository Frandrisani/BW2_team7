// * Qui dichiariamo all'interno di js TUTTI GLI ELEMENTI HTML
const imgAlbumTopSection = document.getElementById("imgAlbumTopSection");
const img2AlbumTopSection = document.getElementById("img2AlbumTopSection");
const titoloAlbumTopSection = document.getElementById("titoloAlbumTopSection");
const nomeArtistaTopSection = document.getElementById("nomeArtistaTopSection");
const annoTopSection = document.getElementById("annoTopSection");

const numeroBraniAlbumTopSection = document.getElementById(
  "numeroBraniAlbumTopSection"
);
const totMinutiTopSection = document.getElementById("totMinutiTopSection");
const containerRowSongs = document.getElementById("containerRowSongs");
const myURL = "https://striveschool-api.herokuapp.com/api/deezer/album";

// * INIZIO ACQUISIZIONE ID URL
const addressBarContent = new URLSearchParams(location.search);
console.log(addressBarContent);
const albumId = addressBarContent.get("albumId");
console.log(albumId);
// * FINE ACQUISIZIONE ID URL

const annoRandom = function () {
  const anno = Math.floor(Math.random() * (2025 - 1990 + 1) + 1990);
  return anno;
};

// * INZIO FUNZIONE PER CONVERTIRE I BELLISSIMI NUMERI DI JAVASCRIPT IN MINUTI E SECONDI SENSATI parte riassunto album
function convertiSecondiAMinutiESecondiTop(secondi) {
  const minuti = Math.floor(secondi / 60);
  const restantiSecondi = secondi % 60;

  if (restantiSecondi > 59) {
    minuti += 1;
    restantiSecondi -= 60;
  }
  const formatoMinutiSecondi = `${minuti} min ${
    restantiSecondi < 10 ? "0" : ""
  }${restantiSecondi} sec.`;

  return formatoMinutiSecondi;
}
// * FINE FUNZIONE PER CONVERTIRE I BELLISSIMI NUMERI DI JAVASCRIPT IN MINUTI E SECONDI SENSATI parte riassunto album

// * INZIO FUNZIONE PER CONVERTIRE I BELLISSIMI NUMERI DI JAVASCRIPT IN MINUTI E SECONDI SENSATI parte canzoni
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
// * FINE FUNZIONE PER CONVERTIRE I BELLISSIMI NUMERI DI JAVASCRIPT IN MINUTI E SECONDI SENSATI parte canzoni

const riproduzioniConIlPunto = function (numero) {
  const numeroFormattato = numero.toLocaleString();
  console.log(numeroFormattato);
  return numeroFormattato;
};

// * INIZIO FETCH
fetch(myURL + "/" + albumId)
  .then((response) => {
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
    document
      .getElementsByClassName("section1")[0]
      // * INIZIO REMOVE DELLA CLASSE "bg-primary"
      .classList.remove("bg-primary");
    // * FINE REMOVE DELLA CLASSE "bg-primary"
    // * INIZIO REMOVE DELLA CLASSE "PLACEHOLDER"
    imgAlbumTopSection.classList.remove("placeholder");
    img2AlbumTopSection.classList.remove("placeholder");
    titoloAlbumTopSection.classList.remove("placeholder");
    nomeArtistaTopSection.classList.remove("placeholder");
    annoTopSection.classList.remove("placeholder");
    numeroBraniAlbumTopSection.classList.remove("placeholder");
    totMinutiTopSection.classList.remove("placeholder");
    // * FINE REMOVE DELLA CLASSE "PLACEHOLDER"

    imgAlbumTopSection.src = `${album.cover_medium}`;
    img2AlbumTopSection.src = `${album.cover_small}`;
    applyBackgroundColorToContainer(album.cover_medium);
    titoloAlbumTopSection.innerText = `${album.title}`;
    nomeArtistaTopSection.innerText = `${album.artist.name} ·`;
    annoTopSection.innerText = `${annoRandom()} ·`;
    numeroBraniAlbumTopSection.innerText = `${album.tracks.data.length} brani ·`;
    totMinutiTopSection.innerText = `${convertiSecondiAMinutiESecondiTop(
      album.duration
    )} `;

    album.tracks.data.forEach((element, i) => {
      const rowSongDinamic = document.createElement("div");
      rowSongDinamic.classList.add("row", "g-0");
      rowSongDinamic.innerHTML = `    
        <div class="row g-1 g-md-0">
          <div class="col col-1 d-none d-md-block text-fontB50">${i + 1}</div>
          <div class="col col-12 col-md-6">
            <p class="mb-0 text-fontB fs-5 fw-medium">${element.title}</p>
            <p class="mt-0 text-fontB50 opacity-50 ">${element.artist.name}</p>
          </div>
          <div class="col col-4 d-none d-md-block">
            <p class="text-fontB50 ">${riproduzioniConIlPunto(element.rank)}</p>
          </div>
          <div class="col col-1 d-none d-md-block text-fontB50">${convertiSecondiAMinutiESecondi(
            element.duration
          )}</div>
        </div>`;
      containerRowSongs.appendChild(rowSongDinamic);
    });
  });
// * FINE FETCH

// * INIZIO DELLE FUNZIONI PER OTTENERE IL COLORO DI BACKGROUND IN BASE AL MIX COLORI DELL'IMMAGINE DELL'ALBUM
// Funzione per ottenere il colore dominante dall'immagine
function getDominantColor(imageUrl, callback) {
  // Crea un elemento immagine invisibile
  const img = document.createElement("img");
  img.crossOrigin = "Anonymous"; // Per consentire il caricamento di immagini da origini diverse

  // Aggiungi un evento al caricamento dell'immagine
  img.onload = function () {
    // Crea un canvas per estrarre i dati dell'immagine
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Imposta le dimensioni del canvas
    canvas.width = img.width;
    canvas.height = img.height;

    // Disegna l'immagine sul canvas
    ctx.drawImage(img, 0, 0, img.width, img.height);

    // Estrai i dati dell'immagine
    const imageData = ctx.getImageData(0, 0, img.width, img.height).data;

    // Calcola il colore dominante
    let totalR = 0,
      totalG = 0,
      totalB = 0;

    for (let i = 0; i < imageData.length; i += 4) {
      totalR += imageData[i];
      totalG += imageData[i + 1];
      totalB += imageData[i + 2];
    }

    const averageR = Math.round(totalR / (imageData.length / 4));
    const averageG = Math.round(totalG / (imageData.length / 4));
    const averageB = Math.round(totalB / (imageData.length / 4));

    // Restituisci il colore dominante sotto forma di stringa "rgb(r, g, b)"
    const dominantColor = `rgb(${averageR}, ${averageG}, ${averageB})`;

    // Richiama la callback con il colore dominante
    callback(dominantColor);
  };

  // Imposta la sorgente dell'immagine
  img.src = imageUrl;
}

// Funzione per applicare il colore di sfondo al contenitoreImgAlbum
function applyBackgroundColorToContainer(imageUrl) {
  getDominantColor(imageUrl, function (dominantColor) {
    // Seleziona l'elemento con id "contenitoreImgAlbum"
    const containerImgAlbum = document.getElementById("contenitoreImgAlbum");

    // Applica il colore di sfondo
    containerImgAlbum.style.backgroundColor = dominantColor;
  });
}

// * FINE DELLE FUNZIONI PER OTTENERE IL COLORO DI BACKGROUND IN BASE AL MIX COLORI DELL'IMMAGINE DELL'ALBUM
