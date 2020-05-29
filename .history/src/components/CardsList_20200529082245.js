import React, { useEffect } from "react";
import Card from "./Card";

export default function CardsList({ apiUrl }) {
  let moviesList = [];
  let renderResults = async () => {
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
      console.log(myMovie);
      moviesList.push(<Card movie={myMovie} />);
    });
  };

  useEffect(() => {
    renderResults();
  });

  return <>{moviesList}</>;
}
