import React from "react";
import { Button } from "react-bootstrap";

export default function Card({ movie }) {
  console.log(movie.genres);
  const genresBtnList = [];
  let genresList = movie.genres;
  genresList.forEach((each, element) => {
    genresBtnList.push(
      <Button key={element} variant="outline-info" className="genres-btn">
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
          <p>{movie.overview}</p>
          <p>{genresBtnList}</p>
          <a href>View more</a>
        </figcaption>
      </figure>
    </div>
  );
}
