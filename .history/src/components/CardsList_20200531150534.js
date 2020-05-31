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

        // setMovies((prev) => [
        //   ...prev,
        //   <Card key={`${key}+${movie.id}`} movie={myMovie} />,
        // ]);
      });
    };
    renderResults();
  }, [apiUrl, yearFiltered]);

  if (yearFiltered.length !== 0) {
    console.log(movies);
    return (
      <div className="grid">
        {[...new Set(movies)]
          .filter(
            (element) =>
              parseInt(element.release_date.split("-")[0]) >= yearFiltered[0] &&
              parseInt(element.release_date.split("-")[0]) <= yearFiltered[1]
          )
          .map((element, key) => {
            return <Card key={`${key}`} movie={element} />;
          })}
      </div>
    );
  } else {
    return (
      <div className="grid">
        {[...new Set(movies)].map((element, key) => {
          return <Card key={`${key}`} movie={element} />;
        })}
      </div>
    );
  }
}
