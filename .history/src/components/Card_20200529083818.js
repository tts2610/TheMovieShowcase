import React from "react";
import { Button } from "react-bootstrap";

export default function Card({ movie }) {
  const genresBtnList = [];
  alert(movie);
  let genresList = movie.genres;
  genresList.forEach((each, element) => {
    genresBtnList.push(
      <Button className="ml-4 genres-btn" key={element} variant="outline-info">
        {each.name}
      </Button>
    );
  });
  return (
    <div className="grid">
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
    </div>
  );
}
