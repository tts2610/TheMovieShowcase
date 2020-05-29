import React, { Component } from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import CardsList from "./components/CardsList";

export default class App extends Component {
  // componentDidMount() {
  //   this.renderResults();
  // }

  render() {
    return (
      <Container>
        {/* <Card movie={this.state.movie} /> */}
        <CardsList results={this.state.results} />
      </Container>
    );
  }
}
