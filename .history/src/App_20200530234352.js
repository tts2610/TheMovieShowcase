import React, { Component } from "react";
import "./App.css";
import { Tab, Container, Row, Col, Nav } from "react-bootstrap";
import CardsList from "./components/CardsList";
import { css } from "@emotion/core";
import RingLoader from "react-spinners/RingLoader";
import TabsList from "./components/TabsList";

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

const movie_db_category = {
  popular: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currentPage}`,
  latest: `https://api.themoviedb.org/3/movie/latest?api_key=${API_KEY}&language=en-US&page=${this.state.currentPage}`,
  now_playing: `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${this.state.currentPage}`,
  top_rated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${this.state.currentPage}`,
  upcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${this.state.currentPage}`,
};

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
    // console.log("scrollY", window.scrollY);
    // console.log(
    //   "left",
    //   document.documentElement.scrollHeight - window.innerHeight
    // );
    if (
      document.documentElement.scrollHeight - window.innerHeight ===
      window.scrollY
    ) {
      this.setState({
        currentPage: this.state.currentPage + 1,
      });

      this.setState({
        apiUrl: movie_db_category.popular,
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

  tabChanged(item) {
    this.setState({
      apiUrl: movie_db_category[item],
    });
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
        <Tab.Container id="left-tabs-example" defaultActiveKey={"popular"}>
          <Row>
            <Col sm={3}>
              <TabsList tabChanged={this.tabChanged} />
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="popular">
                  <CardsList apiUrl={this.state.apiUrl} />
                  <div>
                    {this.state.smallLoading && (
                      <img
                        src="https://i.pinimg.com/originals/58/4b/60/584b607f5c2ff075429dc0e7b8d142ef.gif"
                        alt="test"
                        width="150"
                        height="150"
                        className="smallLoadingSpinner"
                      ></img>
                    )}
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="second"></Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    );
  }
}
