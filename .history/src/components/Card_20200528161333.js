import React from "react";

export default function Card({ movie }) {
  console.log(movie);
  return (
    <div className="grid">
      <figure class="effect-marley">
        <img src={movie.image} alt={movie.image} />
        <figcaption>
          <h2>
            <span>{movie.title}</span>
          </h2>
          <p>
            <span className="desIcon">
              <i class="fal fa-scroll"></i>
            </span>
            {movie.overview}
          </p>
          <a href={"#"}>View more</a>
        </figcaption>
      </figure>
    </div>
  );
}
