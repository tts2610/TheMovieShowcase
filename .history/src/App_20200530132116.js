import React, { Component } from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import CardsList from "./components/CardsList";
const API_KEY = process.env.REACT_APP_APIKEY;

export default class App extends Component {
  constructor() {
    super();
    this.myRef = React.createRef();
    this.state = {
      apiUrl: "",
      loading: true,
    };
  }
  handleScroll(event) {
    if (!this.state.hasMore) {
      return;
    }
    const node = this.myRef.current;
    let scrollTop = node.scrollTop;
    let clientHeight = node.clientHeight;
    let scrollHeight = node.scrollHeight;
    let scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
    if (scrolledToBottom) {
      alert("aaaa");
    }
  }
  componentDidMount() {
    window.addEventListener("scroll", (e) => console.log(window.in), true);
    this.setState({
      apiUrl: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`,
    });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
  }
  render() {
    return (
      <Container fluid ref={this.myRef}>
        <CardsList apiUrl={this.state.apiUrl} />
        <div>{this.state.loading && "Loading..."}</div>
      </Container>
    );
  }
}
