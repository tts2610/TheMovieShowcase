import React, { useEffect, useState } from "react";
import Card from "./Card";

export default function CardsList({ apiUrl, yearFiltered }) {
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
          release_date: movie.release_date,
        };
        if (
          yearFiltered.length !== 0 &&
          myMovie.release_date.split("-")[0] >= toString(yearFiltered[0]) &&
          myMovie.release_date.split("-")[0] <= toString(yearFiltered[1])
        ) {
          console.log("filtering...");
          setMovies([]);
          setMovies((prev) => [
            ...prev,
            <Card key={`${key}+${movie.id}`} movie={myMovie} />,
          ]);
        } else {
          setMovies((prev) => [
            ...prev,
            <Card key={`${key}+${movie.id}`} movie={myMovie} />,
          ]);
        }
      });
    };
    renderResults();
  }, [apiUrl, yearFiltered]);

  return <div className="grid">{movies}</div>;
}
