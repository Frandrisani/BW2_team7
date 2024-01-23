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
const spinenr = document.getElementById("spinner");
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
fetch(myURL + "/" + 76644662)
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
    annoTopSection.innerText = `${annoRandom()} ·`;
    numeroBraniAlbumTopSection.innerText = `${album.tracks.data.length} brani ·`;
    totMinutiTopSection.innerText = `${convertiSecondiAMinutiESecondiTop(
      album.duration
    )} `;

    album.tracks.data.forEach((element, i) => {
      const rowSongDinamic = document.createElement("div");
      rowSongDinamic.classList.add("row");
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

// // crea un canvas con l'immagine e ne ritorno il context 2d
// const draw = function (img) {
//   let canvas = document.createElement('canvas')
//   let c = canvas.getContext('2d')
//   c.width = canvas.width = img.clientWidth
//   c.height = canvas.height = img.clientHeight
//   c.clearRect(0, 0, c.width, c.height)
//   c.drawImage(img, 0, 0, img.clientWidth, img.clientHeight)
//   return c
// }

// // scompone pixel per pixel e ritorna un oggetto con una mappa della loro frequenza nell'immagine
// const getColors = function (c) {
//   let col,
//     colors = {}
//   let pixels, r, g, b, a
//   r = g = b = a = 0
//   pixels = c.getImageData(0, 0, c.width, c.height)
//   for (let i = 0, data = pixels.data; i < data.length; i += 4) {
//     r = data[i]
//     g = data[i + 1]
//     b = data[i + 2]
//     a = data[i + 3]
//     if (a < 255 / 2) continue
//     col = rgbToHex(r, g, b)
//     if (!colors[col]) colors[col] = 0
//     colors[col]++
//   }
//   return colors
// }

// // trova il colore più ricorrente data una mappa di frequenza dei colori
// const findMostRecurrentColor = function (colorMap) {
//   let highestValue = 0
//   let mostRecurrent = null
//   for (const hexColor in colorMap) {
//     if (colorMap[hexColor] > highestValue) {
//       mostRecurrent = hexColor
//       highestValue = colorMap[hexColor]
//     }
//   }
//   return mostRecurrent
// }

// // converte un valore in rgb a un valore esadecimale
// const rgbToHex = function (r, g, b) {
//   if (r > 255 || g > 255 || b > 255) {
//     throw 'Invalid color component'
//   } else {
//     return ((r << 16) | (g << 8) | b).toString(16)
//   }
// }

// // inserisce degli '0' se necessario davanti al colore in esadecimale per renderlo di 6 caratteri
// const pad = function (hex) {
//   return ('000000' + hex).slice(-6)
// }

// const generateImage = function () {
//   // genero dinamicamente un tag <img /> in un <div> vuoto

//   let imageSrc =
//     'https://e-cdns-images.dzcdn.net/images/artist/7f6e8be161417ad8ce8f09b45721544f/500x500-000000-80-0-0.jpg'

//   let reference = document.getElementById('container')

//   // l'event listener "onload" nel tag <img /> si occupa di lanciare la funzione "start()" solamente
//   // al termine del caricamento della src
//   reference.innerHTML = `
//     <img
//       src=${imageSrc}
//       id="img"
//       crossorigin="anonymous"
//       onload="start()"
//     />`
// }

// const start = function () {
//   // prendo il riferimento all'immagine del dom
//   let imgReference = document.querySelector('#img')

//   // creo il context 2d dell'immagine selezionata
//   let context = draw(imgReference)

//   // creo la mappa dei colori più ricorrenti nell'immagine
//   let allColors = getColors(context)

//   // trovo colore più ricorrente in esadecimale
//   let mostRecurrent = findMostRecurrentColor(allColors)

//   // se necessario, aggiunge degli '0' per rendere il risultato un valido colore esadecimale
//   let mostRecurrentHex = pad(mostRecurrent)

//   // console.log del risultato
//   console.log(mostRecurrentHex)
// }

// generateImage()
