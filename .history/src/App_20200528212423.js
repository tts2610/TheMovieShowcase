import React, { Component } from "react";
import "./App.css";
import { Container } from "react-bootstrap";
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
      results: [...this.state.results, data.results],
    });
  };

  componentDidMount() {
    this.renderResults();
  }

  render() {
    return (
      <Container>
        {/* <Card movie={this.state.movie} /> */}
        <CardsList results={this.state.results} />
      </Container>
    );
  }
}
