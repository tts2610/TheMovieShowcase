import React, { Component } from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import CardsList from "./components/CardsList";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
const API_KEY = process.env.REACT_APP_APIKEY;

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      apiUrl: "",
      loading: true,
      currentPage: 1,
    };
  }

  handleScroll = () => {
    if (
      document.documentElement.scrollHeight - window.innerHeight ===
      window.scrollY
    ) {
      this.setState({
        currentPage: this.state.currentPage + 1,
      });
      this.setState({
        apiUrl: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currentPage}`,
      });
    }
  };

  componentDidMount() {
    this.setState({
      apiUrl: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currentPage}`,
    });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
    window.addEventListener("scroll", this.handleScroll, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    if (this.state.loading) {
      return (
        <ClipLoader
          css={override}
          size={150}
          color="#000000"
          loading={this.state.loading}
        />
      );
    }
    return (
      <Container fluid>
        <CardsList apiUrl={this.state.apiUrl} />
      </Container>
    );
  }
}
