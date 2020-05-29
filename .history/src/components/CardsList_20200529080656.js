import React, { Component } from "react";
import Card from "./Card";
const API_KEY = process.env.REACT_APP_APIKEY;

export default class CardsList extends Component {
  moviesList = [];
  constructor() {
    super();
    this.state = {
      results: [],
    };
  }

  renderResults = async () => {
    let response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`
    );
    let data = await response.json();

    data.results.forEach((element) => {
      this.setState({
        results: [...this.state.results, element],
      });
    });
  };

  //   results.forEach((movie) => {
  //     moviesList.push({
  //       id: movie.id,
  //       image: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
  //       title: movie.original_title,
  //       overview: movie.overview,
  //       genres: [],
  //     });
  //   });
  //   renderedMovies = [];
  //   moviesList.forEach((movie) => {
  //     renderedMovies.push(<Card movie={movie} />);
  //   });

  render() {
    return <>{moviesList}</>;
  }
}
