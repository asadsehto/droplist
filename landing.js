// ============================================================
// DOM SELECTORS
// ============================================================
const top_movies = document.querySelector(".top-movies");
const main2 = document.querySelector(".main2");
const playlist = [];

// ============================================================
// API FETCH
// ============================================================
async function getdata() {
  try {
    const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=47e4fa0d75f28a0298434bef55557a04');
    const data = await response.json();
    display(data);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// ============================================================
// DISPLAY MOVIES
// ============================================================
function display(moviedata) {
  top_movies.innerHTML = "";
  const { results } = moviedata;

  results.forEach(result => {
    const { title: TITLE, release_date: YEAR, overview: plots, poster_path: IMG, vote_average: ratings } = result;

    // ============================================================
    // CREATE ELEMENTS
    // ============================================================
    const article = document.createElement("article");
    const imag = document.createElement("img");
    const tit = document.createElement("h1");
    const options = document.createElement("button");
    const popcard = document.createElement("p");
    const hidden = document.createElement("div");
    const plt = document.createElement("p");
    const dl = document.createElement("dl");
    const dt1 = document.createElement("dt");
    const dd1 = document.createElement("dd");
    const dt2 = document.createElement("dt");
    const dd2 = document.createElement("dd");

    // ============================================================
    // ADD CLASSES
    // ============================================================
    article.classList.add("moviecard");
    imag.classList.add("photo");
    tit.classList.add("title");
    options.classList.add("option-button");
    hidden.classList.add("overlay");
    plt.classList.add("plot");
    dl.classList.add("info");
    dd1.classList.add("rating");
    dd2.classList.add("release");

    // ============================================================
    // SET ATTRIBUTES
    // ============================================================
    popcard.id = "popup";
    popcard.setAttribute("popover", "auto");
    options.setAttribute("popovertarget", "popup");
    options.style.background = "transparent";
    options.style.border = "none";

    // ============================================================
    // SET CONTENT
    // ============================================================
    tit.textContent = TITLE;
    plt.textContent = plots;
    dd1.textContent = Number(ratings).toFixed(1) + " ⭐";
    dd2.textContent = YEAR;
    imag.src = `https://image.tmdb.org/t/p/w200${IMG}`;
    options.textContent = "❤️";
    popcard.textContent = "Added to playlist 💕";
    dt1.textContent = "Rating:";
    dt2.textContent = "Release Date:";

    // ============================================================
    // APPEND ELEMENTS
    // ============================================================
    dl.appendChild(dt1);
    dl.appendChild(dd1);
    dl.appendChild(dt2);
    dl.appendChild(dd2);

    hidden.appendChild(tit);
    hidden.appendChild(plt);
    hidden.appendChild(dl);

    article.appendChild(imag);
    article.appendChild(options);
    article.appendChild(popcard);
    article.appendChild(hidden);

    top_movies.appendChild(article);

    // ============================================================
    // EVENT LISTENERS
    // ============================================================
    imag.addEventListener("click", function() {
      hidden.classList.toggle("show");
      article.classList.toggle("active");
    });

    hidden.addEventListener("click", function() {
      hidden.classList.remove("show");
      article.classList.remove("active");
    });

    options.onclick = function() {
      options.textContent = "💖";
      playlist.push(article);
      console.log(playlist);
    };
  });
}

// ============================================================
// INITIALIZE
// ============================================================
getdata();