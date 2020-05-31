import React, { useEffect, useState } from "react";
import Card from "./Card";

export default function CardsList({ apiUrl, yearFiltered, ratingFiltered }) {
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
          vote_average: movie.vote_average,
        };

        setMovies((prev) => [...prev, myMovie]);
      });
    };
    renderResults();
  }, [apiUrl]);

  if (yearFiltered.length !== 0 || ratingFiltered.length !== 0) {
    let filterList = movies.filter(
      (element) =>
        parseInt(element.release_date.split("-")[0]) >= yearFiltered[0] &&
        parseInt(element.release_date.split("-")[0]) <= yearFiltered[1] &&
        element.vote_average / 2 >= ratingFiltered[0] &&
        element.vote_average / 2 <= ratingFiltered[1]
    );
    if (filterList.length === 0) {
      return (
        <img
          className="mt-5"
          src={process.env.PUBLIC_URL + "shrug.webp"}
          alt="ohwell!"
        ></img>
      );
    }
    return (
      <div className="grid">
        {filterList.map((element, key) => {
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
