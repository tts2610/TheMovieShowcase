import React from "react";
import Card from "./Card";

export default function CardsList({ results }) {
  let moviesList = [];
  results.forEach((movie) => {
    moviesList.push({
      id: movie.id,
      image: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
      title: movie.original_title,
      overview: movie.overview,
      genres: [],
    });
  });
  let renderedMovies = [];
  moviesList.forEach((movie) => {
    renderedMovies.push(<Card movie={movie} />);
  });
  return <>{moviesList}</>;
}
