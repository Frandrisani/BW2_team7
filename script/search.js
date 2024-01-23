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
          displaySearchResults(data.data);
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
    results.forEach((result) => {
      const resultItem = document.createElement("div");
      resultItem.classList.add("result-item", "col-6", "col-md-2");

      if (formattedQuery) {
        resultItem.innerHTML = `
        <div class="col-6">
          <h2>Risultato più rilevante</h2>
          <div class="row" id="relevant">
            <div class="col-6 bg-tertiary">
            </div>
          </div>
        </div>
        <div class="col-6">
          <h2>Brani</h2>
          <div class="row" id="tracks">
            <div class="col"></div>
          </div>
        </div>
        `;
      }

      const rowRelevant = document.getElementById("relevant");
      const rowTracks = document.getElementById("tracks");

      if (formattedQuery === result.artist.name) {
        resultItem.innerHTML = `
      <div class="card">
          <img src="${result.artist.picture_big}" class="card-img-top" alt="...">
          <div class="card-body">
              <h5 class="card-title">${result.artist.name}</h5>
              <p class="card-text">${result.artist.type}</p>
          </div>
      </div>
    `;
      } else if (formattedQuery === result.album.title) {
        resultItem.innerHTML = `
        <div class="card">
            <img src="${result.album.cover_xl}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${result.album.title}[0]</h5>
                <p class="card-text">${result.album.type}<span><i class="bi bi-dot"></i></span><strong>${result.artist.name}</strong></p>
            </div>
        </div>
      `;
      } else if (formattedQuery === result.title) {
        resultItem.innerHTML = `
        <div class="card">
            <img src="${result.album.cover_xl}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${result.title}</h5>
                <p class="card-text">${result.type}<span><i class="bi bi-dot"></i></span><strong>${result.artist.name}</strong></p>
            </div>
        </div>
      `;
      }

      // resultItem.innerHTML = `
      //         <div class="card">
      //             <img src="${result.album.cover_big}" class="card-img-top" alt="...">
      //             <div class="card-body">
      //                 <h5 class="card-title">${result.title}</h5>
      //                 <p class="card-text">${result.type}<span><i class="bi bi-dot"></i></span><strong>${result.artist.name}</strong></p>
      //             </div>
      //         </div>
      //       `;

      resultSection.appendChild(resultItem);
    });
  };
  searchInput.addEventListener("input", handleSearch);
});
