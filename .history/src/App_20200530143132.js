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
      loading: true,
    };
  }

  handleScroll(event) {
    console.log(event.target.scrollHeight);
    if (window.scrollY == window.innerHeight) alert(window.scrollY);
  }

  componentDidMount() {
    this.setState({
      apiUrl: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`,
    });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
    window.addEventListener("scroll", this.handleScroll, true);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    return (
      <Container fluid>
        <CardsList apiUrl={this.state.apiUrl} ref={this.myRef} />
        <div>{this.state.loading && "Loading..."}</div>
      </Container>
    );
  }
}
