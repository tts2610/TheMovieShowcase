import React from "react";

export default function Card({ movie }) {
  console.log(movie);
  return (
    <>
      <figure class="effect-marley">
        <img src={movie.image} alt="img11" />
        <figcaption>
          <h2>
            <span>{movie.title}</span>
          </h2>
          <p>Marley tried to convince her but she was not interested.</p>
          <a href={"#"}>View more</a>
        </figcaption>
      </figure>
    </>
  );
}
