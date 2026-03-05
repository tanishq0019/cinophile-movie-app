let input = document.querySelector(".search input");
let btn = document.querySelector(".search button"); // Specific selector
let container = document.querySelector(".container");
let genrebtn = document.querySelectorAll(".options li")
const apikey = "2c6af368".trim();

const getmovie = async (term) => {
    // Note: Use https to avoid mixed-content errors in some browsers
    let url = `https://www.omdbapi.com/?apikey=${apikey}&s=${term}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // FIXED: Response is Capitalized in OMDb API
        if (data.Response === "True") {
            displaymovie(data.Search);
        } else {
            container.innerHTML = `<h2 style="color: antiquewhite;">Movie not found!</h2>`;
        }
    }
    catch (error) {
        console.error("error in fetching data!!!", error);
    }
}

const displaymovie = (movies) => { // FIXED: Added movies parameter
    container.innerHTML = "";
    console.log(movies)
    movies.map((movie) => {
        const moviecard = document.createElement("div");
        moviecard.classList.add("movie_box");
    
        moviecard.innerHTML = `
                    <div class="movie_tilte">${movie.Title}</div>
            <div class="poster">
                <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/380x550?text=No+Poster'}" alt="${movie.Title}">
            </div>
            <hr class="movie_line">

            <div class="genre">${movie.Type.toUpperCase()}</div>
            <div class="rating">${movie.Year}</div>
        `;
        
        // FIXED: Append happens INSIDE the loop
        container.appendChild(moviecard);
    });
}

btn.addEventListener("click", () => {
    // FIXED: Use input.value.trim(), ariaValueMax is for progress bars
    if (input.value.trim() !== "") {
        getmovie(input.value);

    }
});

genrebtn.forEach((button)=>{
    button.addEventListener("click",()=>{
        const genre=button.textContent;
        getmovie(genre);
    })
})
getmovie("Action")