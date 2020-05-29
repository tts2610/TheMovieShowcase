import React, { Component } from "react";
import "./App.css";
import { Alert, Row, Col } from "react-bootstrap";
import Card from "./components/Card";
const API_KEY = process.env.REACT_APP_APIKEY;

export default class App extends Component {
  state = {
    movie: {
      image: "",
      title: "",
      overview: "",
    },
  };

  renderMovie = async () => {
    let response = await fetch(
      "https://api.themoviedb.org/3/movie/55?api_key=69fc17f202ed7c4632e7c8d7d6920855&language=en-US"
    );
    let data = await response.json();

    this.setState({
      movie: {
        image: `https://image.tmdb.org/t/p/original/${data.poster_path}`,
        title: data.original_title,
        overview: data.overview,
      },
    });
  };

  componentDidMount() {
    this.renderMovie();
  }

  render() {
    return (
      <>
        <Row>
          <Col>
            <Card movie={this.state.movie} />
          </Col>
        </Row>
      </>
    );
  }
}
