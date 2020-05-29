import React from "react";
import { Button } from "react-bootstrap";

export default function Card({ movie }) {
  const genresBtnList = [];
  let genresList = movie.genres;
  genresList.forEach((each) => {
    genresBtnList.push(
      <div variant="outline-info" className="genres-btn">
        {each}
      </div>
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
          <ul className="list">{genresBtnList}</ul>
          <a href={"#"}>View more</a>
        </figcaption>
      </figure>
    </div>
  );
}
