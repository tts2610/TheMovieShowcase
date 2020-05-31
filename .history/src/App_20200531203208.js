import React, { Component } from "react";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
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
      <Container>
        <Row>
          <form>
            <div class="inner-form">
              <div class="basic-search">
                <div class="input-field">
                  <input id="search" type="text" placeholder="Type Keywords" />
                  <div class="icon-wrap">
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                    >
                      <path d="M18.869 19.162l-5.943-6.484c1.339-1.401 2.075-3.233 2.075-5.178 0-2.003-0.78-3.887-2.197-5.303s-3.3-2.197-5.303-2.197-3.887 0.78-5.303 2.197-2.197 3.3-2.197 5.303 0.78 3.887 2.197 5.303 3.3 2.197 5.303 2.197c1.726 0 3.362-0.579 4.688-1.645l5.943 6.483c0.099 0.108 0.233 0.162 0.369 0.162 0.121 0 0.242-0.043 0.338-0.131 0.204-0.187 0.217-0.503 0.031-0.706zM1 7.5c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5-2.916 6.5-6.5 6.5-6.5-2.916-6.5-6.5z"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="advance-search">
                <span class="desc">Advanced Search</span>
                <div class="row">
                  <div class="input-field">
                    <div class="input-select">
                      <select data-trigger="" name="choices-single-defaul">
                        <option placeholder="" value="">
                          ACCESSORIES
                        </option>
                        <option>ACCESSORIES</option>
                        <option>SUBJECT B</option>
                        <option>SUBJECT C</option>
                      </select>
                    </div>
                  </div>
                  <div class="input-field">
                    <div class="input-select">
                      <select data-trigger="" name="choices-single-defaul">
                        <option placeholder="" value="">
                          COLOR
                        </option>
                        <option>GREEN</option>
                        <option>SUBJECT B</option>
                        <option>SUBJECT C</option>
                      </select>
                    </div>
                  </div>
                  <div class="input-field">
                    <div class="input-select">
                      <select data-trigger="" name="choices-single-defaul">
                        <option placeholder="" value="">
                          SIZE
                        </option>
                        <option>SIZE</option>
                        <option>SUBJECT B</option>
                        <option>SUBJECT C</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row second">
                  <div class="input-field">
                    <div class="input-select">
                      <select data-trigger="" name="choices-single-defaul">
                        <option placeholder="" value="">
                          SALE
                        </option>
                        <option>SALE</option>
                        <option>SUBJECT B</option>
                        <option>SUBJECT C</option>
                      </select>
                    </div>
                  </div>
                  <div class="input-field">
                    <div class="input-select">
                      <select data-trigger="" name="choices-single-defaul">
                        <option placeholder="" value="">
                          TIME
                        </option>
                        <option>THIS WEEK</option>
                        <option>SUBJECT B</option>
                        <option>SUBJECT C</option>
                      </select>
                    </div>
                  </div>
                  <div class="input-field">
                    <div class="input-select">
                      <select data-trigger="" name="choices-single-defaul">
                        <option placeholder="" value="">
                          TYPE
                        </option>
                        <option>TYPE</option>
                        <option>SUBJECT B</option>
                        <option>SUBJECT C</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row third">
                  <div class="input-field">
                    <div class="result-count">
                      <span>108 </span>results
                    </div>
                    <div class="group-btn">
                      <button class="btn-delete" id="delete">
                        Reset
                      </button>
                      <button class="btn-search">Search</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Row>
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
    );
  }
}
