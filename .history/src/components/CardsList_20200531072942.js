import React, { useEffect, useState } from "react";
import Card from "./Card";
import Badge from "@material-ui/core/Badge";

export default function CardsList({ apiUrl }) {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    if (apiUrl.includes("page=1")) setMovies([]);
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
        setMovies((prev) => [
          ...prev,
          <Badge badgeContent={4} color="primary">
            <Card key={`${key}+${movie.id}`} movie={myMovie} />
          </Badge>,
        ]);
      });
    };
    renderResults();
  }, [apiUrl]);

  return <div className="grid">{movies}</div>;
}
