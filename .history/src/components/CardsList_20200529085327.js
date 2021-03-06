import React, { useEffect, useState } from "react";
import Card from "./Card";
const API_KEY = process.env.REACT_APP_APIKEY;

export default function CardsList({ apiUrl }) {
  let moviesList = [];
  const [movies, setMovies] = useState([]);
  let renderResults = async (apiUrl) => {
    alert("aaa");
    let response = await fetch(apiUrl);
    let data = await response.json();
    data.results.forEach((movie, key) => {
      let myMovie = {
        id: movie.id,
        image: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
        title: movie.original_title,
        overview: movie.overview,
        genres: [],
      };
      setMovies([...movies, myMovie]);
    });

    console.log(movies);
  };

  renderResults(apiUrl);

  return <div>{moviesList}</div>;
}
