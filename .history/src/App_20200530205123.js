import React, { Component } from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import CardsList from "./components/CardsList";
import { css } from "@emotion/core";
import RingLoader from "react-spinners/RingLoader";

const API_KEY = process.env.REACT_APP_APIKEY;

const override = css`
  border-color: red;
  margin: 0;
  position: absolute;
  top: 45%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      apiUrl: "",
      loading: true,
      currentPage: 1,
      smallLoading: true,
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
    }, 1500);
    window.addEventListener("scroll", this.handleScroll, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    if (this.state.loading) {
      return (
        <RingLoader
          css={override}
          size={200}
          color={"#2ed3d6"}
          loading={this.state.loading}
        />
      );
    }
    return (
      <Container>
        <CardsList apiUrl={this.state.apiUrl} />
        <div>
          {this.state.smallLoading && (
            <img
              src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/f1055231234507.564a1d234bfb6.gif"
              alt="test"
              width="50"
              height="50"
              className="mx-auto"
            ></img>
          )}
        </div>
      </Container>
    );
  }
}
