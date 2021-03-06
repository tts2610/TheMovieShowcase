import React, { useEffect, useState, Component } from "react";
import Card from "./Card";
import { render } from "@testing-library/react";
const API_KEY = process.env.REACT_APP_APIKEY;

export default function CardsList({ apiUrl }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const renderResults = async () => {
      let response = await fetch(apiUrl);
    };
    renderResults();
  }, []);

  return <div className="grid">{movies}</div>;
}
