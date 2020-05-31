import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import Aos from "aos";
import "aos/dist/aos.css";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
const StyledRating = withStyles({
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  },
})(Rating);
export default function Card({ movie }) {
  const [value, setValue] = React.useState(2);

  useEffect(() => {
    console.log("aaaa");
    setValue(movie.vote_average);
  }, [movie]);
  const genresBtnList = [];
  let genresList = movie.genres;
  genresList.forEach((each, element) => {
    genresBtnList.push(
      <Button
        className="mt-3 ml-4 genres-btn"
        key={element}
        variant="outline-info"
      >
        {each}
      </Button>
    );
  });

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <figure data-aos="zoom-in-up" className="effect-marley">
      <img src={movie.image} alt={movie.image} />
      <figcaption>
        <h2>
          <span>{movie.title}</span>
        </h2>
        {/* <p className="rating">
          <i className="fal fa-star-half-alt"></i>
          <span>{movie.vote_average}</span>
        </p> */}
        {console.log({ value })}
        <Rating name="read-only" value={value} readOnly max={10} />
        <p className="overview">{movie.overview}</p>
        <p className="release_date">{movie.release_date}</p>
        <p className="genres">{genresBtnList}</p>
        <a href="google.com">View more</a>
      </figcaption>
    </figure>
  );
}
