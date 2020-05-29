import React, { Component } from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import Card from "./components/Card";
import CardsList from "./components/CardsList";
const API_KEY = process.env.REACT_APP_APIKEY;

export default class App extends Component {
  state = {
    results: [],
  };

  renderResults = async () => {
    let response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`
    );
    let data = await response.json();

    this.setState({
      movie: {
        image: `https://image.tmdb.org/t/p/original/${data.poster_path}`,
        title: data.original_title,
        overview: data.overview,
        genres: Object.values(data.genres),
      },
    });
  };

  componentDidMount() {}

  render() {
    return (
      <Container>
        {/* <Card movie={this.state.movie} /> */}
        <CardsList results={result} />
      </Container>
    );
  }
}
