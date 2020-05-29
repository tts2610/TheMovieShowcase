import React from "react";
import { Button } from "react-bootstrap";

export default function Card({ movie }) {
  const genresBtnList = [];
  let genresList = movie.genres;
  genresList.forEach((each, element) => {
    genresBtnList.push(
      <Button className="ml-4 genres-btn" key={element} variant="outline-info">
        {each.name}
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
        <div className="overview">{movie.overview}</div>
        <div className="genres">{genresBtnList}</div>
        <a href="google.com">View more</a>
      </figcaption>
    </figure>
  );
}
