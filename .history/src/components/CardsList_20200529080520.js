import React from "react";
import Card from "./Card";
import { render } from "@testing-library/react";
const API_KEY = process.env.REACT_APP_APIKEY;

export default class CardsList({ results }) {
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


  render()
  return <>{moviesList}</>;
}
