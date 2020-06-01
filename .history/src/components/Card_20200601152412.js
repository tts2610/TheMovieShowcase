import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "aos/dist/aos.css";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Modal from "react-bootstrap/Modal";
import YouTube from "@u-wave/react-youtube";

const StyledRating = withStyles({
  iconFilled: {
    color: "#ff6d75",
  },
  iconEmpty: {
    color: "white",
  },
  iconHover: {
    color: "#ff3d47",
  },
})(Rating);
export default function Card({ movie }) {
  const [showModal, setShowModal] = useState(false);
  const [movieTrailer, setMovieTrailer] = useState("");
  const API_KEY = process.env.REACT_APP_APIKEY;

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

  const getMovieTrailerId = async (id) => {
    let url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`;
    let data = await fetch(url);
    let result = await data.json();
    setMovieTrailer(result.results[0]);
    console.log(movieTrailer);
    console.log(result.results[0]);
  };

  // useEffect(() => {
  //   Aos.init({ duration: 500, once: true, mirror:true });
  // }, []);

  return (
    <figure className="effect-marley">
      <img src={movie.image} alt={movie.image} />
      <figcaption>
        <p className="title">
          <span>{movie.title}</span>
        </p>
        {/* <p className="rating">
          <i className="fal fa-star-half-alt"></i>
          <span>{movie.vote_average}</span>
        </p> */}
        <p className="rating">
          <StyledRating
            name="customized-color"
            value={parseInt(movie.vote_average) / 2}
            icon={<FavoriteIcon fontSize="inherit" />}
          />
        </p>
        <p className="overview">{movie.overview}</p>

        <p className="release_date">
          <i className="far fa-calendar-edit"></i> {movie.release_date}
        </p>
        <p className="genres">{genresBtnList}</p>
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            setShowModal(true);
            getMovieTrailerId(movie.id);
          }}
        >
          View more
        </a>
      </figcaption>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {movie.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <YouTube
              id="trailer"
              video={movieTrailer.key}
              width="500px"
              height="340px"
              autoplay
            />
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </figure>
  );
}
