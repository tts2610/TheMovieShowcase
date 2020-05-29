import React, { useEffect } from "react";
import Card from "./Card";

export default function CardsList({ apiUrl }) {
  let moviesList = [];
  let renderResults = async () => {
    let response = await fetch(apiUrl);
    let data = await response.json();
  };

  useEffect(() => {
    renderResults();
  });

  return <>{moviesList}</>;
}
