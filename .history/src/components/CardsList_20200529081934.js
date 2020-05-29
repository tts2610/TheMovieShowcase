import React, { Component } from "react";
import Card from "./Card";
const API_KEY = process.env.REACT_APP_APIKEY;

export default function CardsList({ apiUrl }) {
  moviesList = [];
  renderResults = async () => {
    let response = await fetch({ apiUrl });
    let data = await response.json();

    data.results.forEach((movie) => {
      let myMovie = {
        id: movie.id,
        image: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
        title: movie.original_title,
        overview: movie.overview,
        genres: [],
      };
      this.moviesList.push(<Card movie={myMovie} />);
    });
  };

  return <>{this.moviesList}</>;
}
