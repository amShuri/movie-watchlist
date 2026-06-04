import { 
    renderMovies,
    toggleUiState,
    saveToLocalStorage,
    loadFromLocalStorage
} from './utils.js'

const moviesEl = document.getElementById('movie-list')
const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')
const uiStateEl = document.getElementById('ui-state')

let movies = []
const watchlist = loadFromLocalStorage('watchlist') || []

moviesEl.addEventListener('click', (e) => {    
    const btn = e.target.closest('.watch-btn')
    if (!btn) return

    const movieClicked = movies.find(
        movie => movie.imdbID === btn.dataset.movieId
    )

    const alreadySaved = watchlist.some(
        movie => movie.imdbID === movieClicked.imdbID
    )

    if (!alreadySaved) {
        watchlist.push(movieClicked)
    }
    else {
        const index = watchlist.findIndex(movie => movie.imdbID === movieClicked.imdbID)
        watchlist.splice(index, 1)
    }
    
    renderMovies(movies, watchlist, moviesEl)
    saveToLocalStorage('watchlist', watchlist)
})

searchForm.addEventListener('submit', (e) => {
    fetch(`http://www.omdbapi.com/?apikey=7c778b9f&s=${searchInput.value}`)
        .then(res => res.json())
        .then(data => {
            if (data.Response === 'False') {
                movies = []
                renderNoResults()
                return
            }
            
            return Promise.all(data.Search.map((movie) => {
                return fetch(`http://www.omdbapi.com/?apikey=7c778b9f&i=${movie.imdbID}&type=movie`)
                    .then(res => res.json())
            }))
        })
        .then(list => {
            if (!list) return
            
            movies = list
            renderMovies(list, watchlist, moviesEl)
            toggleUiState(list, uiStateEl)
            saveToLocalStorage('movie-list', list)
        })
    e.preventDefault()
})

function renderNoResults() {
    uiStateEl.querySelector('p').textContent = 
    "Unable to find what you're looking for. Please try another search"
}

renderMovies(movies, watchlist, moviesEl)
toggleUiState(movies, uiStateEl)