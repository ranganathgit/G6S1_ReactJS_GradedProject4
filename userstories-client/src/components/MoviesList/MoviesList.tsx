import React, { useRef, useState, useEffect } from "react";
import {
  Tab,
  Tabs,
  ToastContainer,
  Toast,
  Row,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";
import { getMovies } from "../../services/movies";
import IUserMovie from "../../models/IUserMovie";
import MovieListItem from "../MoviesList/MovieListItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const MoviesList = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<IUserMovie[]>([]);
  const [key, setKey] = useState("movies-in-theaters");
  const [error, setError] = useState<null | Error>(null);
  const [searchMovie, setSearchMovie] = useState("");
  const [reRender, setReRender] = useState(false);
  const [count, setCount] = useState(0);
  let searchMovieCount: number = 0;
  let inputSearch = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputSearch.current !== null) {
      inputSearch.current.focus();
    }
  });

  useEffect(() => {
    console.log("key is: ", key);
    const helper = async () => {
      try {
        console.log("inside helper");
        const movies = await getMovies(key);
        setMovies(movies);
        console.log(movies);
      } catch (error) {
        console.log("inside error");
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };
    helper();
  }, [key, reRender]);

  const handleReRender = () => {
    console.log("Inside handleReRender");
    setReRender(!reRender); // state change will re-render parent
  };

  if (searchMovie) {
    movies.filter((movie) => {
      if (
        movie.title
          .toLocaleLowerCase()
          .includes(searchMovie.toLocaleLowerCase())
      ) {
        searchMovieCount = 1;
      }
    });
  }

  if (searchMovie && searchMovieCount == 0) {
    searchMovieCount = 2;
    console.log(
      "Inside searchmovie else. value of moviesCount is: ",
      searchMovieCount
    );
  }

  return (
    <>
      <div className="main">
        <div>
          <Tabs
            activeKey={key}
            onSelect={(k) => setKey(k as string)}
            className="Tabs"
          >
            <Tab
              eventKey="movies-in-theaters"
              title="Movies in theaters"
              tabClassName="test"
            ></Tab>
            <Tab eventKey="movies-coming" title="Coming soon"></Tab>
            <Tab eventKey="top-rated-india" title="Top rated Indian"></Tab>
            <Tab eventKey="top-rated-movies" title="Top rated movies"></Tab>
            <Tab eventKey="favourite" title="Favourites"></Tab>
          </Tabs>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search a movie"
            className="inputSearch"
            ref={inputSearch}
            onChange={(e) => setSearchMovie(e.target.value)}
          />
          <FontAwesomeIcon icon={faMagnifyingGlass} className="button" />
        </div>
      </div>
      <div>
        {key == "favourite" ? (
          <h6 className="my-2 ms-2">Favourites</h6>
        ) : (
          <h6 className="my-2 ms-2">Movies</h6>
        )}
        {loading && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {!loading && error && <Alert variant={"danger"}>{error.message}</Alert>}
        {!loading &&
          !error &&
          (searchMovieCount == 0 || searchMovieCount == 1 ? (
            <Row xs={1} lg={6}>
              {movies
                .filter((movie) => {
                  if (searchMovie === "") {
                    return movie;
                  } else if (
                    movie.title
                      .toLocaleLowerCase()
                      .includes(searchMovie.toLocaleLowerCase())
                  ) {
                    return movie;
                  }
                })
                .map((movie) => (
                  <Col key={movie.id} className="d-flex mx-1 my-2">
                    <MovieListItem
                      movieType={key}
                      userMovie={movie}
                      onReRender={handleReRender}
                    />
                  </Col>
                ))}
            </Row>
          ) : (
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ height: "400px", fontSize: "1.5rem" }}
            >
              No data found
            </div>
          ))}
      </div>
      {
        <ToastContainer className="p-3 mt-5" position="top-end">
          <Toast
            bg={"success"}
            show={reRender}
            autohide
            delay={3000}
            onClose={() => setReRender(false)}
          >
            <Toast.Header closeButton={false}>Success</Toast.Header>
            <Toast.Body>{"Removed from favourites"}</Toast.Body>
          </Toast>
        </ToastContainer>
      }
    </>
  );
};

export default MoviesList;
