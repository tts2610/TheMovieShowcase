import React, { useEffect, useState } from "react";
import Card from "./Card";

export default function CardsList({ apiUrl }) {
  const [movies, setMovies] = useState(new Set());

  useEffect(() => {
    const renderResults = async () => {
      let response = await fetch(apiUrl);
      let data = await response.json();
      data.results.forEach((movie, key) => {
        let myMovie = {
          id: movie.id,
          image: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
          title: movie.original_title,
          overview: movie.overview,
          genres: movie.genre_ids,
        };
        // setMovies((prev) => [
        //   ...prev,
        //   <Card key={`${key}+${movie}`} movie={myMovie} />,
        // ]);
        setMovies(
          new Set(movies).add(<Card key={`${key}+${movie}`} movie={myMovie} />)
        );
      });
    };
    renderResults();
  }, [apiUrl, movies]);

  return <div className="grid">{movies}</div>;
}
