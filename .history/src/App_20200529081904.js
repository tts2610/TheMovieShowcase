import React, { Component } from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import CardsList from "./components/CardsList";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      apiUrl: "",
    };
  }

  componentDidMount() {
    this.setState({
      apiUrl: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`,
    });
  }
  render() {
    return (
      <Container>
        <CardsList apiUrl={this.state.apiUrl} />
      </Container>
    );
  }
}
