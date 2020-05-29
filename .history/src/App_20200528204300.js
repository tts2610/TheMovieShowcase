import React, { Component } from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import Card from "./components/Card";
import { fetchNowPlaying } from "./utils/tmdb";

export default class App extends Component {
  state = {
    movie: {
      image: "",
      title: "",
      overview: "",
      genres: [],
    },
  };

  renderMovie = async () => {
    fetchNowPlaying();

    this.setState({
      movie: {
        image: `https://image.tmdb.org/t/p/original/${data.poster_path}`,
        title: data.original_title,
        overview: data.overview,
        genres: Object.values(data.genres),
      },
    });
  };

  componentDidMount() {
    this.renderMovie();
  }

  render() {
    return (
      <Container>
        <Card movie={this.state.movie} />
      </Container>
    );
  }
}
