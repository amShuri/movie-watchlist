import { 
    renderMovies,
    toggleUiState,
    saveToLocalStorage,
    loadFromLocalStorage 
} from './utils.js'

const watchlist = loadFromLocalStorage('watchlist')
const watchlistEl = document.getElementById('watchlist')
const uiStateEl = document.getElementById('ui-state')

watchlistEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.watch-btn')
    if (!btn) return
    
    const movieClicked = watchlist.find(
        movie => movie.imdbID === btn.dataset.movieId
    )
    
    const index = watchlist.findIndex(movie => movie.imdbID === movieClicked.imdbID)
    watchlist.splice(index, 1)
    
    renderMovies(watchlist, watchlist, watchlistEl)
    toggleUiState(watchlist, uiStateEl)
    saveToLocalStorage('watchlist', watchlist)
    e.preventDefault()
})

if (watchlist) {
    renderMovies(watchlist, watchlist, watchlistEl)
    toggleUiState(watchlist, uiStateEl)
}
