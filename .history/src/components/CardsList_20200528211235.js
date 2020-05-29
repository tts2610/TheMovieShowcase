import React from "react";

export default function CardsList({ results }) {
  let moviesList = [];
  results.forEach((movie) => {
    moviesList.push({
      id: movie.id,
      image: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
      title: data.original_title,
      overview: data.overview,
      genres: [],
    });
  });
  return <></>;
}
