import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Aos from "aos";
import "aos/dist/aos.css";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
const API_KEY = process.env.REACT_APP_APIKEY;
const StyledRating = withStyles({
  iconFilled: {
    color: "#ff6d75",
  },
  iconEmpty: {
    color: "white",
  },
  iconHover: {
    color: "#ff3d47",
  },
})(Rating);
export default function Card({ movie }) {
  const [apiGenresList, setApiGenresList] = useState([]);
  const genresBtnList = [];

  const renderResults = async () => {
    let response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US
    `,
      { cache: "force-cache" }
    );
    let data = await response.json();
    data.genres.forEach((element, id) => {
      setApiGenresList((prev) => [...prev, element]);
    });
  };
  renderResults();

  useEffect(() => {
    Aos.init({ duration: 1500 });

    let genresList = movie.genres;

    genresList.forEach((each, element) => {
      let genreObj = apiGenresList.find((x) => x.id === each);
      genresBtnList.push(
        <Button
          className="mt-3 ml-4 genres-btn"
          key={genreObj.id}
          variant="outline-info"
        >
          {genreObj.name}
        </Button>
      );
    });
  }, [apiGenresList, genresBtnList, movie.genres]);

  return (
    <figure data-aos="zoom-in-up" className="effect-marley">
      <img src={movie.image} alt={movie.image} />
      <figcaption>
        <p className="title">
          <span>{movie.title}</span>
        </p>
        {/* <p className="rating">
          <i className="fal fa-star-half-alt"></i>
          <span>{movie.vote_average}</span>
        </p> */}
        <p className="rating">
          <StyledRating
            name="customized-color"
            value={parseInt(movie.vote_average) / 2}
            icon={<FavoriteIcon fontSize="inherit" />}
          />
        </p>
        <p className="overview">{movie.overview}</p>

        <p className="release_date">
          <i className="far fa-calendar-edit"></i> {movie.release_date}
        </p>
        <p className="genres">{genresBtnList}</p>
        <a href="google.com">View more</a>
      </figcaption>
    </figure>
  );
}
