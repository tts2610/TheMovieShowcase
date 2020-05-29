import React, { Component } from "react";
import "./App.css";
import { Alert } from "react-bootstrap";
import Card from "./components/Card";
const API_KEY = process.env.REACT_APP_APIKEY;

export default class App extends Component {
  state = {
    movie: {
      image: "",
      title: "",
    },
  };

  renderMovie = async () => {
    let response = await fetch(
      "https://api.themoviedb.org/3/movie/32?api_key=69fc17f202ed7c4632e7c8d7d6920855&language=en-US"
    );
    let data = await response.json();
  };

  render() {
    return (
      <>
        <Card />
      </>
    );
  }
}
