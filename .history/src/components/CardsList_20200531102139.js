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
          yearFiltered.length !== 0 &&
          parseInt(myMovie.release_date.split("-")[0]) >= yearFiltered[0] &&
          parseInt(myMovie.release_date.split("-")[0]) <= yearFiltered[1]
        ) {
          console.log(myMovie.release_date.split("-")[0], yearFiltered);
          setMovies([]);
          setMovies((prev) => [
            ...prev,
            <Card key={`${key}+${movie.id}`} movie={myMovie} />,
          ]);
        } else if (yearFiltered.length === 0) {
          console.log("no filter");
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
