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
    alert(event.target);
    if (
      event.target.scrollHeight - event.target.scrollTop ===
      event.target.clientHeight
    ) {
      alert("bbbb");
    }
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll, true);
    this.setState({
      apiUrl: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`,
    });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
  }
  render() {
    return (
      <Container fluid>
        <CardsList apiUrl={this.state.apiUrl} />
        <div>{this.state.loading && "Loading..."}</div>
      </Container>
    );
  }
}
