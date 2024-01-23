// getting reference of elements to fill
const artistCover = document.getElementById("artist-cover");
const artistName = document.getElementById("artist-name");
const artistListeners = document.getElementById("nb-fan");
const colInside = document.getElementById("traccia-album");
const artistCircular = document.getElementById("artist-circular");
const byArtist = document.getElementById("by-artist");
const numberOfLikes = document.getElementById("likes-num");

//funzione svuota col
const emptyCol = () => {
  colInside.innerHTML = ``;
};
//funzione random mi piace
const randomLikes = () => {
  let likes = Math.ceil(Math.random() * 11);
  numberOfLikes.innerText = `${likes}`;
};

//funzione tracklist
const gettingTracks = (tracks) => {
  tracks.forEach((track, i) => {
    // emptyCol();
    const newCol = document.createElement("div");
    newCol.classList.add(
      "col-8",
      "m-1",
      "p-1",
      "d-flex",
      "justify-content-evenly",
      "align-items-center",
      "flex-wrap",
      "flex-row"
    );
    newCol.innerHTML = `
              <h3>${i + 1}</h3>
            <img src="${
              track.album.cover_small
            }" class="img-thumbnail" alt="album-cover">
            <h4>${track.title_short}</h4>
            <i class="bi bi-three-dots-vertical text-fontB50 fs-1 d-sm-none"></i>
            <h5>${track.rank}</h5>
            <h6 class="d-none d-sm-block">${track.duration}</h6>
          </div>`;
    colInside.appendChild(newCol);
  });
};

// riempio dinamicamente la pagina
const artistURL = "https://striveschool-api.herokuapp.com/api/deezer/artist";
const addressBar = new URLSearchParams(location.search);
// const artistID= addressBar.get('artistID') questa la commento per il momento e assegno alla const un valore statico
const artistID = 412;
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
    artistCover.style.backgroundImage = `url(${artist.picture_xl})`;
    artistCover.style.backgroundRepeat = "no-repeat";
    artistCover.style.backgroundSize = "cover";
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
