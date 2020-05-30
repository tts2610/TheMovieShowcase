import React from "react";
import { Button } from "react-bootstrap";
import ScrollAnimation from "react-animate-on-scroll";

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
  return (
    <figure className="effect-marley">
      <img src={movie.image} alt={movie.image} />
      <figcaption>
        <h2>
          <span>{movie.title}</span>
        </h2>
        <p className="overview">{movie.overview}</p>
        <p className="genres">{genresBtnList}</p>
        <a href="google.com">View more</a>
      </figcaption>
    </figure>
  );
}
