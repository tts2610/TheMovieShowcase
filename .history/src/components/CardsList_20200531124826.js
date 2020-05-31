import React, { useEffect, useState } from "react";
import Card from "./Card";

export default function CardsList({ apiUrl, yearFiltered }) {
  const [movies, setMovies] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  useEffect(() => {
    if (apiUrl.includes("page=1")) setMovies([]);
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

        if (yearFiltered.length !== 0 && !isFiltering) {
          console.log("first time");
          setIsFiltering(true);
          setMovies([]);
        }
        if (
          isFiltering &&
          parseInt(myMovie.release_date.split("-")[0]) >= yearFiltered[0] &&
          parseInt(myMovie.release_date.split("-")[0]) <= yearFiltered[1]
        ) {
          setMovies((prev) => [
            ...prev,
            <Card key={`${key}+${movie.id}`} movie={myMovie} />,
          ]);
        }
        if (yearFiltered.length === 0) {
          setMovies((prev) => [
            ...prev,
            <Card key={`${key}+${movie.id}`} movie={myMovie} />,
          ]);
        }
      });

      setIsFiltering(false);
    };
    renderResults();
  }, [apiUrl, isFiltering, yearFiltered]);

  return <div className="grid">{movies}</div>;
}
