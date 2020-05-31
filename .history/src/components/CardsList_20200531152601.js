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

        setMovies((prev) => [...prev, myMovie]);
      });
    };
    renderResults();
  }, [apiUrl]);

  if (yearFiltered.length !== 0) {
    let filterList = movies.filter(
            (element) =>
              parseInt(element.release_date.split("-")[0]) >= yearFiltered[0] &&
              parseInt(element.release_date.split("-")[0]) <= yearFiltered[1]
          );
    return (
      <div className="grid">
        {
          .map((element, key) => {
            return <Card key={`${key}`} movie={element} />;
          })}
      </div>
    );
  } else {
    return (
      <div className="grid">
        {movies.map((element, key) => {
          return <Card key={`${key}`} movie={element} />;
        })}
      </div>
    );
  }
}

// [...new Set(movies)].map
