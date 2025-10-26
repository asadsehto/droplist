const form = document.querySelector(".form");  
const searchbar = document.getElementById("searchbar");
const searchbtn = document.getElementById("searchbtn");
const title =document.querySelectorAll(".title");      
const plot = document.querySelectorAll(".plot");        
const rating = document.querySelectorAll(".rating");    
const release =document.querySelectorAll(".release");  
const photo = document.querySelectorAll(".img"); 
const apikey = "47e4fa0d75f28a0298434bef55557a04" ;
const main = document.querySelector("main")     

form.addEventListener("submit", async function(event){
        event.preventDefault();
        const movie = searchbar.value;
        console.log(movie);
        if(movie){
          const moviedata = await  getdata(movie);
        display(moviedata);
        }
        else{
            console.log("enter a movie name")            
        }
})

async function getdata(movie){

    try{
         const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${encodeURIComponent(movie)}`)
        
           const data = await response.json(); 
           console.log(data);
           return data;
    }
catch(error) {
    console.error(error);  
}

}

function display(moviedata){
    main.innerHTML="";
const {results } = moviedata;

results.forEach(result=>{
let article = document.createElement("article");
article.classList.add("moviecard");  

 const { title: TITLE, release_date: YEAR, overview: plots, poster_path: IMG, vote_average: ratings } = result;


 const tit =document.createElement( "h1")
const plt = document.createElement("p")
const imag =document.createElement("img")

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
article.appendChild(plt);    
article.appendChild(dl);
dl.appendChild(dt1);
dl.appendChild(dd1);
dl.appendChild(dt2);
dl.appendChild(dd2);


main.appendChild(article);

})

}

/*movie = results[0];
const { title: TITLE, release_date:YEAR, overview: plots, poster_path: IMG, vote_average: ratings } = movie;

title.forEach((value)=>value.textContent = TITLE);
release.forEach((value)=>value.textContent = YEAR);
photo.forEach((value)=> value.src=`https://image.tmdb.org/t/p/w200` +IMG);
plot.forEach((value)=>value.textContent =plots)
rating.forEach((value)=>value.textContent =ratings) */

