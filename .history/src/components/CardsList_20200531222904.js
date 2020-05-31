import React, { useEffect, useState } from "react";
import Card from "./Card";
const API_KEY = process.env.REACT_APP_APIKEY;

const genres_api = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;

export default function CardsList({
  apiUrl,
  yearFiltered,
  ratingFiltered,
  searchString,
}) {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    console.log(searchString);
    if (apiUrl.includes("page=1")) setMovies([]);
    const renderResults = async () => {
      let response = await fetch(apiUrl, { cache: "force-cache" });
      let genre_response = await fetch(genres_api);
      let data = await response.json();
      let data_genre = await genre_response.json();
      data.results.forEach((movie, key) => {
        let genreNameList = [];
        movie.genre_ids.forEach((element) => {
          let genreObj = data_genre.genres.find((x) => x.id === element);
          genreNameList.push(genreObj.name);
        });

        let myMovie = {
          id: movie.id,
          image: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
          title: movie.original_title,
          overview: movie.overview,
          genres: genreNameList,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
        };

        setMovies((prev) => [...prev, myMovie]);
      });
    };
    renderResults();
  }, [apiUrl]);

  if (yearFiltered.length !== 0 || ratingFiltered.length !== 0) {
    let filterList = movies.filter(
      (element) =>
        parseInt(element.release_date.split("-")[0]) >= yearFiltered[0] &&
        parseInt(element.release_date.split("-")[0]) <= yearFiltered[1] &&
        element.vote_average / 2 >= ratingFiltered[0] &&
        element.vote_average / 2 <= ratingFiltered[1]
    );
    if (filterList.length === 0) {
      return (
        <img
          className="mt-5"
          src={process.env.PUBLIC_URL + "shrug.webp"}
          alt="ohwell!"
        ></img>
      );
    }
    return (
      <div className="grid">
        {filterList.map((element, key) => {
          return <Card key={`${key}`} movie={element} />;
        })}
      </div>
    );
  }
  if (searchString === "") {
    alert("aaa");
    return (
      <div className="grid">
        {movies
          .filter((element) =>
            element.title.toLowerCase().includes(searchString.toLowerCase())
          )
          .map((element, key) => (
            <Card key={`${key}`} movie={element} />
          ))}
      </div>
    );
  } else {
    return (
      <div className="grid">
        {movies.map((element, key) => {
          return <Card key={`${key}`} movie={element} />;
        })}
      </div>
    );
  }
}

// [...new Set(movies)].map
