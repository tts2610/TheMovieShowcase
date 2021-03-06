import React, { useEffect, useState, Component } from "react";
import Card from "./Card";
import { render } from "@testing-library/react";
const API_KEY = process.env.REACT_APP_APIKEY;

export default function CardsList({ apiUrl }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const renderResults = async () => {
      let response = await fetch(apiUrl);
      if (response.status === 200) {
        let data = await response.json();
        data.results.forEach((movie, key) => {
          let myMovie = {
            id: movie.id,
            image: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
            title: movie.original_title,
            overview: movie.overview,
            genres: [],
          };
          setMovies((prev) => [...prev, <Card key={key} movie={myMovie} />]);
        });
      }
    };
    renderResults();
  }, [apiUrl]);

  return <div className="grid">{movies}</div>;
}
