import React, { Component } from "react";
import "./App.css";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import CardsList from "./components/CardsList";
import { css } from "@emotion/core";
import RingLoader from "react-spinners/RingLoader";
import TabsList from "./components/TabsList";
import YearSlider from "./components/YearSlider";
import RatingSlider from "./components/RatingSlider";

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
      yearFiltered: [1990, 2020],
      ratingFiltered: [0, 5],
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
    }, 1000);
    window.addEventListener("scroll", this.handleScroll, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  tabChanged = (item) => {
    let newUrl = this.movie_db_category[item];
    this.setState(
      {
        yearFiltered: [2019, 2020],
        ratingFiltered: [3, 5],
        apiUrl: newUrl.concat(`&page=1`),
        currentCategory: item,
      },
      () => {
        console.log(this.state.yearFiltered);
      }
    );
  };

  yearSliderChanged = (year) => {
    this.setState(
      {
        yearFiltered: year,
        apiUrl: this.state.apiUrl.replace(new RegExp("page=(.*)"), "page=1"),
      },
      () => {
        this.setState({
          smallLoading: false,
        });
      }
    );
  };

  ratingSliderChanged = (rating) => {
    this.setState(
      {
        ratingFiltered: rating,
        apiUrl: this.state.apiUrl.replace(new RegExp("page=(.*)"), "page=1"),
      },
      () => {
        this.setState({
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
      <>
        <Row>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100 myCarousel"
                src="https://images.hdqwalls.com/download/bloodshot-movie-5k-2020-b3-3840x2160.jpg"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Row>
        <Container>
          <Row>
            <Col sm={3} className="mt-5">
              <div className="filter_col">
                <YearSlider yearSliderChanged={this.yearSliderChanged} />
                <RatingSlider ratingSliderChanged={this.ratingSliderChanged} />
              </div>
            </Col>
            <Col sm={9} className="mt-5">
              <TabsList tabChanged={this.tabChanged} />

              <CardsList
                apiUrl={this.state.apiUrl}
                yearFiltered={this.state.yearFiltered}
                ratingFiltered={this.state.ratingFiltered}
              />
              <div>
                {this.state.smallLoading && (
                  <img
                    src={process.env.PUBLIC_URL + "loader.gif"}
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
      </>
    );
  }
}
