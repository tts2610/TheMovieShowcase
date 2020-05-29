import React, { useEffect } from "react";
import Card from "./Card";

export default function CardsList({ apiUrl }) {
  let moviesList = [];

  useEffect(() => {
    renderResults();
  });

  return <>{moviesList}</>;
}
