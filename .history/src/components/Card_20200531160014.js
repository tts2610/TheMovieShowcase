import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import Aos from "aos";
import "aos/dist/aos.css";
import StarRatings from "react-star-ratings";

export default function Card({ movie }) {
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
        <StarRatings
          rating={this.state.rating}
          starRatedColor="blue"
          changeRating={this.changeRating}
          numberOfStars={movie.vote_average}
          name="rating"
        />
        <p className="overview">{movie.overview}</p>
        <p className="release_date">{movie.release_date}</p>
        <p className="genres">{genresBtnList}</p>
        <a href="google.com">View more</a>
      </figcaption>
    </figure>
  );
}
