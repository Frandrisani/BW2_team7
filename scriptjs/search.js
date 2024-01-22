// DEFINIZIONE VARIABILI
const myUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search");
  const resultSection = document.getElementById("results");

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

    results.forEach((result) => {
      const resultItem = document.createElement("div");
      resultItem.classList.add("result-item", "col-6", "col-md-2");

      if (searchInput.value === result.title) {
        resultItem.innerHTML = `
            <div class="card">
                <img src="${result.album.cover_big}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${result.title}</h5>
                    <p class="card-text">${result.type}<span><i class="bi bi-dot"></i></span><strong>${result.artist.name}</strong></p>
                </div>
            </div>
          `;
      } else if (searchInput.value === result.artist.name) {
        resultItem.innerHTML = `
        <h3>${result.name}</h3>
        <img src="${result.artist.picture_small}" alt="${result.name}" />
        `;
      } else if (searchInput.value === result.album.title) {
        resultItem.innerHTML = `
        <h3>${result.name}</h3>
        <img src="${result.album.cover_big}" alt="${result.name}" />
        `;
      }
      //   <h3>${result.title}</h3>
      //   <h4>${result.}
      //   <img src="${result.artist.picture}" alt="${result.title}" />
      resultSection.appendChild(resultItem);
    });
  };
  searchInput.addEventListener("input", handleSearch);
});
