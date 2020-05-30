import React, { Component } from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import CardsList from "./components/CardsList";
import InfiniteScroll from "react-infinite-scroll-component";
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
    if (
      window.pageYOffset >= event.target.clientHeight &&
      Math.round(document.documentElement.scrollTop + window.innerHeight) <
        document.documentElement.scrollHeight
    ) {
      alert("bottom");
    } else {
      // alert("not bottom");
    }
  }

  componentDidMount() {
    this.setState({
      apiUrl: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`,
    });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
    window.addEventListener("scroll", this.handleScroll, true);
  }
  render() {
    return (
      <Container fluid>
        <InfiniteScroll
          dataLength={items.length} //This is important field to render the next data
          next={fetchData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          // below props only if you need pull down functionality
          refreshFunction={this.refresh}
          pullDownToRefresh
          pullDownToRefreshContent={
            <h3 style={{ textAlign: "center" }}>
              &#8595; Pull down to refresh
            </h3>
          }
          releaseToRefreshContent={
            <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
          }
        >
          <CardsList apiUrl={this.state.apiUrl} ref={this.myRef} />
        </InfiniteScroll>
        {/* <div>{this.state.loading && "Loading..."}</div> */}
      </Container>
    );
  }
}
