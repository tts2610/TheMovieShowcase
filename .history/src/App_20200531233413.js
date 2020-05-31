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
                  src="data:image/jpeg;base64,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"
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
            <Col sm={9} className="mt-5">
              <TabsList tabChanged={this.tabChanged} />

              <CardsList
                apiUrl={this.state.apiUrl}
                yearFiltered={this.state.yearFiltered}
                ratingFiltered={this.state.ratingFiltered}
                searchString={this.state.searchString}
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
