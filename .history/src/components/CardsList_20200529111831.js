import React, { useEffect, useState, Component } from "react";
import Card from "./Card";
import { render } from "@testing-library/react";
const API_KEY = process.env.REACT_APP_APIKEY;

export default function CardsList(props) {
  const [movies, setMovies] = useState([]);

  alert(props.apiUrl);

  useEffect(() => {
    const renderResults = async () => {
      let response = await fetch(props.apiUrl);
      let data = await response.json();
      data.results.forEach((movie, key) => {
        let myMovie = {
          id: movie.id,
          image: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
          title: movie.original_title,
          overview: movie.overview,
          genres: [],
        };
        console.log(myMovie);
        setMovies((prev) => [...prev, <Card key={key} movie={myMovie} />]);
      });
    };
    renderResults();
  }, []);

  return <div className="grid">{movies}</div>;
}
