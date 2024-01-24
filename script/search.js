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
      "mt-3"
    );

    // verifica se la formattedQuery è uguale al nome dell'artista
    if (formattedQuery === firstResult.artist.name) {
      console.log("nome artista:", firstResult.artist.name);
      colRelevant.innerHTML = `
      <h2>Risultato più rilevante</h2>
      <div class="row d-flex flex-column bg-tertiary rounded p-3 ">
        <div class="col-8">
          <div class="d-flex flex-column justify-content-around">
            <img src="${firstResult.artist.picture_xl}" class="img-fluid w-50 rounded-circle shadow mb-3" alt="...">
            <h3 class="card-title">${firstResult.artist.name}</h3>
            <p class="card-text text-fontB50">${firstResult.artist.type}</p>
          </div>
        </div>
      </div>
      `;
    } else if (formattedQuery === firstResult.album.title) {
      console.log("nome album:", firstResult.album.title);
      colRelevant.innerHTML = `
      <h2>Risultato più rilevante</h2>
      <div class="row d-flex flex-column bg-tertiary rounded p-3 ">
        <div class="col-10">
          <div class="d-flex flex-column justify-content-around">
            <img src="${firstResult.album.cover_medium}" class="img-fluid w-50 rounded shadow mb-3" alt="...">
            <h3 class="card-title">${firstResult.album.title}</h3>
            <p class="card-text text-fontB50">${firstResult.album.type}<i class="bi bi-dot"></i>${firstResult.artist.name}</p>
          </div>
        </div>
      </div>
      `;
    } else if (formattedQuery === firstResult.title) {
      console.log("nome traccia:", firstResult.title);
      colRelevant.innerHTML = `
      <h2>Risultato più rilevante</h2>
      <div class="row d-flex flex-column bg-tertiary rounded p-3 ">
        <div class="col-10">
          <div class="d-flex flex-column justify-content-around">
            <img src="${firstResult.album.cover_medium}" class="img-fluid w-50 rounded shadow mb-3" alt="...">
            <h3 class="card-title">${firstResult.title}</h3>
            <p class="card-text text-fontB50">${firstResult.type}<i class="bi bi-dot"></i>${firstResult.artist.name}</p>
          </div>
        </div>
      </div>
      `;
    }
    resultSection.appendChild(colRelevant);

    const colTracks = document.createElement("div");
    colTracks.classList.add("col-12", "col-lg-6", "col-xl-8", "h-100", "mt-3");
    colTracks.innerHTML = `
      <h2>Brani</h2>
    `;
    resultSection.appendChild(colTracks);
    const rowTracks = document.createElement("div");
    rowTracks.classList.add("row", "results", "gy-2");
    colTracks.appendChild(rowTracks);

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
      <div class="row justify-content-between ">
      <div class="col-10 d-flex">
      <div class="playerInImg">
        <img src="${
          results[i].album.cover_small
        }" class="img-fluid rounded  " />
        </div>
        <div class="d-flex flex-column ms-3 ">
          <h6 class="mb-0">${results[i].title}</h6>
          <p class="mb-0">${results[i].artist.name}</p>
          <div >
          <source src="${results[i].preview}" type="video/mp4" 
          class="d-none audioDivSrc"/>
          </div>
        </div>
      </div>
      <div class="col-2 text-fontB50">${convertTime(results[i].duration)}</div>
    </div>
      `;

      // funzione per richiamare l'audio e per animazioni circa
      const playerInImgDiv = colTrack.querySelector(".playerInImg");
      const audioDivSrc = colTrack.querySelector(".audioDivSrc");

      // stili
      const alphaCol = audioDivSrc.closest(".col-12");
      alphaCol.addEventListener("mouseover", () => {
        alphaCol.style.backgroundColor = "#131313";
        alphaCol.style.borderRadius = "5px";
      });

      alphaCol.addEventListener("mouseout", () => {
        alphaCol.style.backgroundColor = "";
      });

      console.log(alphaCol);

      // audio
      const audioSource = audioDivSrc.src;
      playerInImgDiv.addEventListener("click", () => {
        playAudio(audioSource);
        // alphaCol.classList.toggle("colOpacity");
        alphaCol.style.backgroundColor = "#414040";
        alphaCol.style.borderRadius = "5px";
      });

      rowTracks.appendChild(colTrack);
    }
  };
  searchInput.addEventListener("input", handleSearch);
});

// funzione per l'audio
let audioPlayer;

function playAudio(source) {
  if (!audioPlayer) {
    audioPlayer = new Audio();
  }

  if (audioPlayer.src === source && !audioPlayer.paused) {
    audioPlayer.pause();
  } else {
    audioPlayer.src = source;
    audioPlayer.play();
  }
}

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
];
const rowToDisplay = document.getElementById("rowSfoglia");

arrayOfImages.forEach((imageSrc) => {
  const divElement = document.createElement("div");
  divElement.classList.add("col-6", "col-md-4", "col-lg-2");
  // divElement.id = "playlist";
  divElement.innerHTML = `
  <div style="overflow:hidden"  class="bg-primary rounded p-2 h-100">
    <h3 class="mb-5">Musica</h3>
    <div class="playlist h-100 text-end">
      <img
        src="${imageSrc}"
        class="w-75 shadow"
      />
    </div>
  </div>
  `;

  rowToDisplay.appendChild(divElement);
});
