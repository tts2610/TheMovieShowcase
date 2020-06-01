import React, { Component } from "react";
import "./App.css";
import {
  Container,
  Row,
  Col,
  Form,
  Navbar,
  Nav,
  FormControl,
  Carousel,
  Button,
} from "react-bootstrap";
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
      searchString: "",
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
        apiUrl: newUrl.concat(`&page=1`),
        currentCategory: item,
      },
      () => {
        console.log(this.state.yearFiltered);
      }
    );
  };

  nextPage = () => {
    console.log("next page");
    this.setState({ currentPage: this.state.currentPage + 1 });
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

  onSearchTitle = (event) => {
    this.setState({
      searchString: event.target.value,
    });
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
        <Navbar className="myNav" sticky="top" expand="lg">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={process.env.PUBLIC_URL + "logo192.png"}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Sean's
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {/* <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link> */}
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                onChange={this.onSearchTitle}
              />
              <Button variant="outline-info">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <Container>
          <Row>
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://img.over-blog-kiwi.com/4/65/64/68/20200412/ob_dfb08c_lyuvdztgva8tmidalnamrys7fdf.jpg#width=1600&height=900"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://cdn.statically.io/img/images.wallpapersden.com/image/download/poster-of-avengers-endgame-movie_63830_1920x1080.jpg"
                  alt="Third slide"
                />

                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://images.metadata.sky.com/pd-image/73b8e79a-efdc-4c8d-9951-3687139b2d75/16-9"
                  alt="Third slide"
                />

                <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl
                    consectetur.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Row>
          <Row>
            <Col sm={3} className="mt-5">
              <div className="filter_col">
                <YearSlider yearSliderChanged={this.yearSliderChanged} />
                <RatingSlider ratingSliderChanged={this.ratingSliderChanged} />
              </div>
            </Col>
            <Col sm={9} className="mt-5 mainContent">
              <TabsList tabChanged={this.tabChanged} />

              <CardsList
                apiUrl={this.state.apiUrl}
                yearFiltered={this.state.yearFiltered}
                ratingFiltered={this.state.ratingFiltered}
                searchString={this.state.searchString}
                nextPage={() => this.nextPage}
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
