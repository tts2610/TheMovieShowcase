import React from "react";
import { Button } from "react-bootstrap";

export default function Card({ movie }) {
  let genresBtnList = [];
  movie.genres.forEach((each) => {
    genresBtnList.push(
      <Button variant="outline-info" className="genres-btn">
        {each}
      </Button>
    );
  });
  return (
    <div className="grid">
      <figure class="effect-marley">
        <img src={movie.image} alt={movie.image} />
        <figcaption>
          <h2>
            <span>{movie.title}</span>
          </h2>
          <p>{movie.overview}</p>
          <p>{genresBtnList}</p>
          <a href={"#"}>View more</a>
        </figcaption>
      </figure>
    </div>
  );
}
