const API_KEY = process.env.REACT_APP_APIKEY;

export const fetchNowPlaying = async() => {
    let response = await fetch(
        `https://api.themoviedb.org/3/movie/696007?api_key=${API_KEY}&language=en-US`
    );
    let data = await response.json();
    alert(data.original_title);
    return data;
};