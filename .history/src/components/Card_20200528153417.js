import React from "react";

export default function Card({ movie }) {
  console.log(movie);
  return (
    <>
      <figure class="effect-marley">
        <img
          src="https://static.pexels.com/photos/53754/pexels-photo-53754-large.jpeg"
          alt="img11"
        />
        <figcaption>
          <h2>
            Sweet <span>Marley</span>
          </h2>
          <p>Marley tried to convince her but she was not interested.</p>
          <a href="#">View more</a>
        </figcaption>
      </figure>
    </>
  );
}
