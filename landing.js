const top_movies = document.querySelector(".top-movies");
const main2 = document.querySelector(".main2");
async function getdata(){

    try{
         const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=47e4fa0d75f28a0298434bef55557a04')
        
           const data = await response.json(); 
           display(data);
           console.log(data);
    }
catch(error) {
    console.error(error);  
}

}

function display(moviedata){
    top_movies.innerHTML="";
const {results } = moviedata;

results.forEach(result=>{
let article = document.createElement("article");
article.classList.add("moviecard");  

const { title: TITLE, release_date: YEAR, overview: plots, poster_path: IMG, vote_average: ratings } = result;

const toph1 = document.createElement("h1");
toph1.textContent = "PEAK CINEMA"
const tit =document.createElement( "h1")
const plt = document.createElement("p")
const imag =document.createElement("img")

const options = document.createElement("button");
const popcard = document.createElement("p");
popcard.id="popup";
popcard.setAttribute("popover" , "auto")
popcard.textContent="Added to playlist 💕";
options.setAttribute("popovertarget" , "popup");
options.textContent =  "❤️";
options.classList.add("option-button");

options.style.background ="transparent";
options.style.border = "none";
const dl = document.createElement("dl");
dl.classList.add("info");

const dt1 = document.createElement("dt");
dt1.textContent = "Rating:";
const dd1 = document.createElement("dd");
dd1.classList.add("rating");

const dt2 = document.createElement("dt");
dt2.textContent = "Release Year:";
const dd2 = document.createElement("dd");
dd2.classList.add("release");


tit.classList.add("title");
plt.classList.add("plot");
imag.classList.add("photo");

 tit.textContent = TITLE;
 plt.textContent = plots;
dd1.textContent = ratings;
 dd2.textContent = YEAR;
 imag.src = `https://image.tmdb.org/t/p/w200${IMG}`;


article.appendChild(imag);   
article.appendChild(tit);   
article.appendChild(options);
article.appendChild(plt);    
article.appendChild(dl);
article.appendChild(popcard);

dl.appendChild(dt1);
dl.appendChild(dd1);
dl.appendChild(dt2);
dl.appendChild(dd2);


top_movies.appendChild(article);
options.onclick = function() {
  options.textContent = "💖";
  playlist.push(article)
  console.log(playlist);
};

})
}
getdata();