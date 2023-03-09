import React, { ReactElement, useState } from "react";
import { Card, Button, ToastContainer, Toast } from "react-bootstrap";
import IUserMovie from "../../models/IUserMovie";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
import {
  addMovieToFavourite,
  removeMovieFromFavourite,
  getSingleMovie,
} from "../../services/movies";

type Props = {
  movieType: string;
  userMovie: IUserMovie;
  onReRender: () => void;
};

type State = {
  responseState: "initial" | "success" | "error";
  toastMessage: string;
  show: boolean;
};

const MovieListItem = ({ movieType, userMovie, onReRender }: Props) => {
  const [responseState, setResponseState] = useState("initial");
  const [toastMessage, setToastMessage] = useState("");
  const [show, setShow] = useState(false);

  const checkAndAddMovieToFavourite = async (movie: IUserMovie) => {
    try {
      console.log("Before calling getSingleMovie in addToFavourites");
      const movieVal = await getSingleMovie("favourite", movie.id);
      if (movieVal.id) {
        console.log("movieVal ", movieVal);
        console.log("movie found");
        setResponseState("error");
        setToastMessage("Already added in favourite");
        setShow(true);
      } else {
        console.log("movie not found in else");
      }
    } catch (error) {
      console.log("inside error befor add to favourite");
      console.log("movie not found in catch");
      try {
        setResponseState("initial");
      } catch (error) {
        console.log("error", error);
      }
      try {
        const data = addMovieToFavourite("favourite", movie);
        setResponseState("success");
        setToastMessage("Successfully added to favourite");
        setShow(true);
      } catch (error) {
        if (error instanceof Error) {
          setResponseState("error");
          setToastMessage(error.message);
          setShow(true);
        } else {
          setResponseState("error");
          setToastMessage("Unknown Error in call to addToFavourites");
          setShow(true);
        }
      }
    }
  };

  function addToFavourites(movie: IUserMovie) {
    console.log("Inside addToFavourites");
    checkAndAddMovieToFavourite(movie);
  }

  function removeFromFavourites(id: string) {
    console.log("Inside removeFromFavourites");
    // console.log(movie.title);
    try {
      setResponseState("initial");
      const data = removeMovieFromFavourite("favourite", id);
      setResponseState("success");
      setToastMessage("Successfully removed from favourite");
      setShow(true);
      onReRender();
    } catch (error) {
      if (error instanceof Error) {
        setResponseState("error");
        setToastMessage(error.message);
        setShow(true);
      } else {
        setResponseState("error");
        setToastMessage("Unknown Error in call to removeFromFavourites");
        setShow(true);
      }
    }
  }
  return (
    <>
      <Card className="w-100" onClick={() => console.log("Clicked")}>
        <Link to={`/${movieType}/${userMovie.id}`}>
          <Card.Img
            variant="top"
            src={userMovie.posterurl}
            alt={userMovie.title}
            style={{ width: "250px", height: "230px" }}
            className="img-fluid"
          />
        </Link>
        <Card.Body>
          <Card.Title className="text-xm">{userMovie.title}</Card.Title>
          {movieType == "favourite" ? (
            <>
              <button
                className="text-sm ms-3"
                style={{ background: "none", border: "none", color: "gray" }}
                onClick={() => removeFromFavourites(userMovie.id)}
              >
                Remove from favourites
                <FontAwesomeIcon icon={faRectangleXmark} className="ms-2" />
              </button>
            </>
          ) : (
            <>
              <button
                className="text-sm ms-3"
                style={{ background: "none", border: "none", color: "gray" }}
                onClick={() => addToFavourites(userMovie)}
              >
                Add to Favourites
                <FontAwesomeIcon
                  icon={faHeart}
                  className="ms-2 favouriteIcon"
                />
              </button>
            </>
          )}
        </Card.Body>
      </Card>
      {responseState !== "initial" && (
        <ToastContainer className="p-3 mt-5" position="top-end">
          <Toast
            bg={responseState === "success" ? "success" : "danger"}
            show={show}
            autohide
            delay={5000}
            onClose={() => setShow(false)}
          >
            <Toast.Header closeButton={false}>
              {responseState === "success" ? "Success" : "Error"}
            </Toast.Header>
            <Toast.Body>{toastMessage}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </>
  );
};

export default MovieListItem;
