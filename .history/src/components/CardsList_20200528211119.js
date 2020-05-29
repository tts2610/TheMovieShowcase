import React from "react";

export default function CardsList({ results }) {
  let moviesList = [];
  results.forEach((movie) => {
    moviesList.push({
      image: "",
      title: "",
      overview: "",
      genres: [],
    });
  });
  return <></>;
}
