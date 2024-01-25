// DEFINIZIONE VARIABILI
const myUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search");
  const resultSection = document.getElementById("results");

  // per fare in modo che tutte le prime lettere delle parole inserite nell'input diventino maiuscole

  const toTitleCase = function (str) {
    return str.replace(/\b\w/g, function (match) {
      return match.toUpperCase();
    });
  };

  const handleSearch = function () {
    const query = searchInput.value.trim();

    if (query.length === 0) {
      resultSection.innerHTML = " "; //pulisce i risultati se la query è vuota
      return;
    } else {
      fetch(myUrl + query)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(
              `Errore nella ricerca: ${response.status} - ${response.statusText}`
            );
          }
        })
        .then((data) => {
          console.log(data);
          const firstFiveResult = data.data.slice(0, 5);
          console.log("il risultato è:", firstFiveResult);
          displaySearchResults(firstFiveResult);
        })
        .catch((err) => {
          console.log("Errore durante la ricerca:", err);
        });
    }
  };

  const displaySearchResults = function (results) {
    resultSection.innerHTML = " "; //pulisce i risultati precedenti
    const query = searchInput.value.trim();
    const formattedQuery = toTitleCase(query);
    console.log(formattedQuery);

    // recupera il primo risultato
    const firstResult = results[0];

    // crea la col-6 per il relevant
    const colRelevant = document.createElement("div");
    colRelevant.classList.add(
      "col-8",
      "col-lg-6",
      "col-xl-4",
      "h-100",
      "results",
      "mt-3",
      "col-relevant"
    );

    // verifica se la formattedQuery è uguale al nome dell'artista
    if (formattedQuery === firstResult.artist.name) {
      console.log("nome artista:", firstResult.artist.name);
      colRelevant.innerHTML = `
      <div>
      <h2>Risultato più rilevante</h2>
      <div class="row d-flex flex-column rounded p-3" id="relevant">
        <div class="col">
          <div class="d-flex flex-column justify-content-around" >
              <a href="./artisti.html?artistID=${firstResult.artist.id}">
                  <img src="${firstResult.artist.picture_xl}" class="img-fluid w-50 rounded-circle shadow mb-3" alt="...">
                  <h3 class="card-title ">${firstResult.artist.name}</h3>
                  <p class="card-text text-fontB50 ">${firstResult.artist.type}</p>
              </a>
              <div class="text-end">
                  <button class="btn btn-primary btn-show rounded-circle bg-primary shadow" id="playButton"><i class="bi bi-play-fill fs-4"></i></button>
              </div>
          </div>
        </div>
      </div>
    </div>
      `;
    } else if (formattedQuery === firstResult.album.title) {
      console.log("nome album:", firstResult.album.title);
      colRelevant.innerHTML = `
      <h2>Risultato più rilevante</h2>
      <div class="row d-flex flex-column rounded p-3" id="relevant">
        <div class="col">
            <div class="d-flex flex-column justify-content-around">
              <a href="./album.html?albumId=${firstResult.album.id}">
                <img src="${firstResult.album.cover_medium}" class="img-fluid w-50 rounded shadow mb-3" alt="...">
                <h3 class="card-title">${firstResult.album.title}</h3>
                <p class="card-text text-fontB50">${firstResult.album.type}<i class="bi bi-dot"></i><a href="./artisti.html?artistID=${firstResult.artist.id}">${firstResult.artist.name}</a></p>
              </a>
              <div class="text-end">
                <button id="playButton" class="btn btn-primary btn-show rounded-circle bg-primary shadow"><i class="bi bi-play-fill fs-4"></i></button>
              </div>
            </div>
        </div>
      </div>
      `;
    } else if (formattedQuery === firstResult.title) {
      console.log("nome traccia:", firstResult.title);
      colRelevant.innerHTML = `
      <h2>Risultato più rilevante</h2>
      <div class="row d-flex flex-column rounded p-3" id="relevant" >
        <div class="col">
          <div class="d-flex flex-column justify-content-around">
          <a href="./album.html?albumId=${firstResult.album.id}">
            <img src="${firstResult.album.cover_medium}" class="img-fluid w-50 rounded shadow mb-3" alt="...">
            <h3 class="card-title ">${firstResult.title}</h3>
            <p class="card-text text-fontB50 ">${firstResult.type}<i class="bi bi-dot"></i><a href="./artisti.html?artistID=${firstResult.artist.id}">${firstResult.artist.name}</a></p>
          </a>
          <div class="text-end">
            <button id="playButton" class="btn btn-primary btn-show rounded-circle bg-primary shadow" id="playButton"><i class="bi bi-play-fill fs-4"></i></button>
          </div>
          </div>
        </div>
      </div>
      `;
    }
    resultSection.appendChild(colRelevant);

    const colTracks = document.createElement("div");
    colTracks.classList.add("col-12", "col-lg-6", "col-xl-8", "h-100", "mt-3");
    const divColTracks = document.createElement("div");
    divColTracks.innerHTML = `
      <h2>Brani</h2>
    `;
    resultSection.appendChild(colTracks);
    const rowTracks = document.createElement("div");
    rowTracks.classList.add("row", "results", "gy-2");
    divColTracks.appendChild(rowTracks);
    colTracks.appendChild(divColTracks);

    // funzione per formattare in minuti:secondi

    const convertTime = function (secondiStringa) {
      const seconds = parseInt(secondiStringa, 10);
      const minutes = Math.floor(seconds / 60);
      const secondsRemains = seconds % 60;
      return `${minutes}:${secondsRemains < 10 ? "0" : ""}${secondsRemains}`;
    };

    for (let i = 1; i < results.length; i++) {
      const colTrack = document.createElement("div");
      colTrack.classList.add("col-12");
      colTrack.innerHTML = `
        <div class="row sfoglia rounded align-items-center p-1 track">
        <div class="col-2">
            <img src="${
              results[i].album.cover_small
            }" class="img-fluid rounded">
            <div class="overlay justify-content-start rounded">
             <i style="margin-left:0.97em"class="bi bi-play-fill fs-2"></i>
            </div>
          </div>
          <div class="col-8 z-3">
            <div class="row">
              <div class="col-12">
                <h6 class="mb-0">${results[i].title}</h6>
              </div>
              <div class="col-12 text-fontB50">
                <a href="./artisti.html?artistID=${firstResult.artist.id}">
                  <p class="mb-0">${results[i].artist.name}</p>
                </a>
              </div>
            </div>
          </div>
          <div class="col-2 text-fontB50 z-3">${convertTime(
            results[i].duration
          )}</div>
        </div>
      `;
      rowTracks.appendChild(colTrack);
    }

    // FUNZIONE BOTTONE PLAYER

    const playButton = document.querySelector("#playButton");
    const icon = playButton.querySelector("i");
    playButton.addEventListener("click", function () {
      if (icon.classList.contains("bi-play-fill")) {
        icon.classList.remove("bi-play-fill");
        icon.classList.add("bi-pause-fill");
      } else {
        icon.classList.remove("bi-pause-fill");
        icon.classList.add("bi-play-fill");
      }
      // mostra il pulsante anche quando non è in hover
      playButton.classList.toggle("active");
    });
  };
  searchInput.addEventListener("input", handleSearch);
});

// funzione per mostrare le card all'avvio della pagina

const arrayOfImages = [
  "./assets/imgs/search/image-1.jpeg",
  "./assets/imgs/search/image-2.jpg",
  "./assets/imgs/search/image-3.jpg",
  "./assets/imgs/search/image-4.jpg",
  "./assets/imgs/search/image-5.jpg",
  "./assets/imgs/search/image-6.jpg",
  "./assets/imgs/search/image-7.jpg",
  "./assets/imgs/search/image-8.jpg",
  "./assets/imgs/search/image-9.jpg",
  "./assets/imgs/search/image-10.jpg",
  "./assets/imgs/search/image-11.jpg",
  "./assets/imgs/search/image-12.jpg",
  "./assets/imgs/search/image-13.jpeg",
  "./assets/imgs/search/image-14.jpg",
  "./assets/imgs/search/image-15.jpg",
  "./assets/imgs/search/image-16.jpg",
  "./assets/imgs/search/image-17.jpg",
  "./assets/imgs/search/image-18.jpg",
  "./assets/imgs/search/image-19.jpg",
  "./assets/imgs/search/image-20.jpg",
  "./assets/imgs/search/image-21.jpg",
  "./assets/imgs/search/image-22.jpg",
  "./assets/imgs/search/image-23.jpg",
  "./assets/imgs/search/image-24.jpg",
  "./assets/imgs/search/image-25.jpeg",
  "./assets/imgs/search/image-26.jpg",
  "./assets/imgs/search/image-27.jpg",
  "./assets/imgs/search/image-28.jpg",
  "./assets/imgs/search/image-29.jpg",
  "./assets/imgs/search/image-30.jpg",
  "./assets/imgs/search/image-31.jpg",
  "./assets/imgs/search/image-32.jpg",
  "./assets/imgs/search/image-33.jpg",
  "./assets/imgs/search/image-34.jpg",
  "./assets/imgs/search/image-35.jpg",
  "./assets/imgs/search/image-36.jpg",
  "./assets/imgs/search/image-37.jpeg",
  "./assets/imgs/search/image-38.jpg",
  "./assets/imgs/search/image-39.jpg",
  "./assets/imgs/search/image-40.jpg",
  "./assets/imgs/search/image-41.jpg",
  "./assets/imgs/search/image-42.png",
  "./assets/imgs/search/image-43.png",
  "./assets/imgs/search/image-44.png",
  "./assets/imgs/search/image-45.png",
  "./assets/imgs/search/image-46.jpeg",
  "./assets/imgs/search/image-47.jpg",
  "./assets/imgs/search/image-48.jpeg",
  "./assets/imgs/search/image-49.jpg",
  "./assets/imgs/search/image-50.jpg",
  "./assets/imgs/search/image-51.jpg",
  "./assets/imgs/search/image-52.jpg",
];

const titles = [
  "Scopri",
  "Disco",
  "Indie",
  "Dance/Elettronica",
  "Latina",
  "R&B",
  "Rock",
  "Allenamento",
  "Hip-Hop",
  "Lo-Fi",
  "Viaggi",
  "Anni",
  "Summer-Hits",
  "Classifiche",
  "Amore",
  "Soul",
  "A casa",
  "Dormire",
  "Pop",
  "Jazz",
  "Classifiche podcast",
  "Folk",
  "Concentrazione",
  "Relax",
  "Podcast",
  "FRIDA",
  "Party",
  "Afro",
  "Classica",
  "League of Legends",
  "Metal",
  "Funk",
  "Punk",
  "Ambient",
  "K-pop",
  "Blues",
  "Di tendenza",
  "Autori",
  "Country",
  "Elettronica",
  "Arab Pop",
  "Pop mondiale",
  "Radar",
  "Bambini e famiglia",
  "In auto",
  "Suoni e natura",
  "Top hits",
  "Techno",
  "Rap",
  "Rock spagnolo",
  "Mood",
  "Gaming",
];

const colors = [
  "#dc148c",
  "#006450",
  "#8400e7",
  "#1e3264",
  "#e8105b",
  "#26856b",
  "#503751",
  "#158a06",
  "#e1128b",
  "#0f73ec",
  "#8e66ac",
  "#777777",
  "#e91529",
  "#d84000",
  "#ba5d08",
  "#8c1a32",
  "#e61d32",
  "#8c1a32",
];
const rowToDisplay = document.getElementById("rowSfoglia");

arrayOfImages.forEach((imageSrc, index) => {
  const divElement = document.createElement("div");
  divElement.classList.add("col-6", "col-md-4", "col-lg-2");
  // divElement.id = "playlist";
  divElement.innerHTML = `
  <div style="overflow:hidden;"  class="sfoglia rounded p-2 h-100">
    <h3 class="mb-5 ms-2">${titles[index]}</h3>
    <div class="playlist h-100 text-end">
      <img
        src="${imageSrc}"
        class="w-75 shadow"
      />
    </div>
  </div>
  `;

  // Imposta colore casuale per lo sfondo delle card
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  divElement.querySelector(".sfoglia").style.backgroundColor = randomColor;

  rowToDisplay.appendChild(divElement);
});
