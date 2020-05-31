import React, { Component } from "react";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import CardsList from "./components/CardsList";
import { css } from "@emotion/core";
import RingLoader from "react-spinners/RingLoader";
import TabsList from "./components/TabsList";
import YearSlider from "./components/YearSlider";

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
      currentCategory: "popular",
      smallLoading: false,
      yearFiltered: [],
    };
    this.movie_db_category = {
      popular: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`,
      now_playing: `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US`,
      top_rated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US`,
      upcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US`,
    };

    // this.tabChanged = this.tabChanged.bind(this);
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
        apiUrl: this.movie_db_category[this.state.currentCategory].concat(
          `&page=${this.state.currentPage}`
        ),
        smallLoading: true,
      });
    }
  };

  componentDidMount() {
    this.setState({
      apiUrl: this.movie_db_category["popular"].concat(
        `&page=${this.state.currentPage}`
      ),
    });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1500);
    window.addEventListener("scroll", this.handleScroll, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  tabChanged = (item) => {
    let newUrl = this.movie_db_category[item];
    this.setState({
      apiUrl: newUrl.concat(`&page=1`),
      currentCategory: item,
    });
  };

  yearSliderChanged = (year) => {
    this.setState(
      {
        yearFiltered: year,
      },
      () => {
        this.setState({
          apiUrl: this.state.apiUrl.replace(new RegExp("page=(.*)"), "page=1"),
          smallLoading: false,
        });
      }
    );
  };

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
        <Row>
          <Col sm={3} className="mt-5">
            <div className="filter_col">
              <YearSlider yearSliderChanged={this.yearSliderChanged} />
            </div>
          </Col>
          <Col sm={9} className="mt-5">
            <TabsList tabChanged={this.tabChanged} />

            <CardsList
              apiUrl={this.state.apiUrl}
              yearFiltered={this.state.yearFiltered}
            />
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
          </Col>
        </Row>
      </Container>
    );
  }
}
