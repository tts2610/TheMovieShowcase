import React, { useEffect, useState } from "react";
import Card from "./Card";

export default function CardsList({ apiUrl, yearFiltered }) {
  const [movies, setMovies] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  useEffect(() => {
    setIsFiltering(yearFiltered.length !== 0);
    if (apiUrl.includes("page=1") && isFiltering) setMovies([]);
    const renderResults = async () => {
      let response = await fetch(apiUrl);
      let data = await response.json();
      data.results.forEach((movie, key) => {
        console.log(data.results.length);
        let myMovie = {
          id: movie.id,
          image: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
          title: movie.original_title,
          overview: movie.overview,
          genres: movie.genre_ids,
          release_date: movie.release_date,
        };

        if (
          parseInt(myMovie.release_date.split("-")[0]) >= yearFiltered[0] &&
          parseInt(myMovie.release_date.split("-")[0]) <= yearFiltered[1]
        ) {
          setMovies((prev) => [
            ...prev,
            <Card key={`${key}+${movie.id}`} movie={myMovie} />,
          ]);
        }
        if (!isFiltering) {
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
