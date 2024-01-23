// DEFINIZIONE VARIABILI
const myUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementsByClassName("form-control")[0];
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
      resultItem.classList.add(
        "result-item",
        "col-6",
        "col-md-2",
        "bg-primary"
      );
      resultItem.innerHTML = `
          <h3>${result.title}</h3>
          <img src="${result.artist.picture}" alt="${result.title}" />
          `;
      resultSection.appendChild(resultItem);
    });
  };
  searchInput.addEventListener("input", handleSearch);
});
