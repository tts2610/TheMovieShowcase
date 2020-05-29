import React, { useEffect } from "react";
import Card from "./Card";

export default function CardsList({ apiUrl }) {
  let moviesList = [];
  let renderResults = async () => {};

  useEffect(() => {
    renderResults();
  });

  return <>{moviesList}</>;
}
