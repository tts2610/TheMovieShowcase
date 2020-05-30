import React, { useEffect, useState, useRef, useCallback } from "react";
import Card from "./Card";

export default function CardsList({ apiUrl }) {
  const [movies, setMovies] = useState([]);
  const observer = useRef();
  const lastElement = useCallback((node) => {
    console.log(node);
  });

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
        if (data.results.length === key + 1)
          setMovies((prev) => [
            ...prev,
            <Card key={movie} movie={myMovie} ref={lastElement} />,
          ]);
        else
          setMovies((prev) => [...prev, <Card key={movie} movie={myMovie} />]);
      });
    };
    renderResults();
  }, [apiUrl, lastElement]);

  return <div className="grid">{movies}</div>;
}
