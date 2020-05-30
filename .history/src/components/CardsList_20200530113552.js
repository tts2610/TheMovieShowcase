import React, { useEffect, useState, useCallback } from "react";
import Card from "./Card";

export default function CardsList({ apiUrl }) {
  const [movies, setMovies] = useState([]);
  const lastElementRef = useCallback((node) => {
    console.log(node);
  }, []);
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
        if (data.results.length === key + 1) {
          setMovies((prev) => [
            ...prev,
            <Card ref={lastElementRef} key={key} movie={myMovie} />,
          ]);
        } else
          setMovies((prev) => [...prev, <Card key={key} movie={myMovie} />]);
      });
    };
    renderResults();
  }, [apiUrl]);

  return <div className="grid">{movies}</div>;
}
