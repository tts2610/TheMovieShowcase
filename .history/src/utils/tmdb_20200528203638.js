const API_KEY = process.env.REACT_APP_APIKEY;

function fetchNowPlaying() {
    let response = await fetch(
        `https://api.themoviedb.org/3/movie/696007?api_key=${API_KEY}&language=en-US`
    );
    let data = await response.json();
    return data;
}