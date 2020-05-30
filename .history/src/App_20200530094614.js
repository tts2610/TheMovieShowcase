import React, { Component } from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import CardsList from "./components/CardsList";
const API_KEY = process.env.REACT_APP_APIKEY;

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
      <Container fluid>
        <CardsList apiUrl={this.state.apiUrl} />
        <div>Loading...</div>
      </Container>
    );
  }
}
