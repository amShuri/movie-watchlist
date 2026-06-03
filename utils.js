export function renderMovies(movies, watchlist, el) {
    el.innerHTML = getMovieHtml(movies, watchlist)
    
    handleBrokenPosters(movies)
}

function getMovieHtml(movies, watchlist) {
    return movies.map((movie) => {
        const { Poster, Title, imdbRating, Runtime, Genre, Plot, imdbID} = movie
        const isInWatchlist = watchlist.some(item => item.imdbID === movie.imdbID)
        
        return `
        <article class="movie-card">
            <img src="${Poster}" alt="${Title} poster" class="movie-poster">
            <div class="movie-content">
                <div class="movie-header">
                    <h2>${Title}</h2>
                    <div class="movie-rating">
                        <img src="images/star-icon.png" alt="">
                        <span>${imdbRating}</span>
                    </div>
                </div>

                <div class="movie-meta">
                    <span>${Runtime}</span>
                    <span>${Genre}</span>
                    <button class="watch-btn" data-movie-id="${imdbID}">
                    ${
                        !isInWatchlist
                            ? `
                                <span class="material-symbols-outlined card-icon">
                                    add_circle
                                </span> Watchlist
                              `
                            : `
                                <span class="material-symbols-outlined card-icon">
                                    do_not_disturb_on
                                </span> Remove
                              ` 
                    }
                    </button>
                </div>

                <p class="movie-plot">${Plot}</p>
            </div>
        </article>
        `
    }).join('')
}

function handleBrokenPosters(movies) {
    document.querySelectorAll('.movie-poster').forEach((poster) => {
        poster.addEventListener('error', () => {
            const movie = movies.find(movie => movie.Poster === poster.src)
            if (movie) {
                movie.Poster = 'images/data-icon.png'
            }

            poster.src = 'images/data-icon.png'
        })
    })
}

export function saveToLocalStorage(str, list) {
    localStorage.setItem(str, JSON.stringify(list))
}

export function loadFromLocalStorage(str) {
    return JSON.parse(localStorage.getItem(str))
}

export function toggleUiState(arr, el) {
    arr.length 
        ? el.classList.add('hidden')
        : el.classList.remove('hidden')
}