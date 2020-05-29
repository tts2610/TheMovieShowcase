import React, { useEffect } from "react";
import Card from "./Card";
const API_KEY = process.env.REACT_APP_APIKEY;

export default function CardsList({ apiUrl }) {
  let moviesList = [];
  let renderResults = async () => {
    try {
      let response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`
      );
      let data = await response.json();
      data.results.forEach((movie) => {
        let myMovie = {
          id: movie.id,
          image: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
          title: movie.original_title,
          overview: movie.overview,
          genres: [],
        };
        moviesList.push(<Card movie={myMovie} />);
      });
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    renderResults();
  });

  return <>{moviesList}</>;
}
