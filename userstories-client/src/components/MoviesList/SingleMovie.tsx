import React, { ReactElement } from "react";
import { useParams, Link } from "react-router-dom";
import IUserMovie from "../../models/IUserMovie";
import { getSingleMovie } from "../../services/movies";
import { ToastContainer, Toast, Row, Col, Table } from "react-bootstrap";

const SingleMovie = () => {
  const { key, id } = useParams();
  console.log("key ", key, " id ", id);
  const [movie, setMovie] = React.useState<IUserMovie | null>(null);

  React.useEffect(() => {
    console.log("key is: ", key);
    const helper = async () => {
      try {
        console.log("inside helper");
        const movie = await getSingleMovie(key as string, id as string);
        setMovie(movie);
        console.log(movie);
      } catch (error) {
        console.log("inside error");
      }
    };
    helper();
  }, []);

  if (movie) {
    const {
      id,
      title,
      year,
      genres,
      ratings,
      poster,
      contentRating,
      duration,
      releaseDate,
      averageRating,
      originalTitle,
      storyline,
      actors,
      imdbRating,
      posterurl,
    } = movie;
    return (
      <Row>
        <Link to="/" className="btn-primary mx-2 my-4">
          Back to Home
        </Link>
        <Col xs={6} lg={3}>
          <img
            src={posterurl}
            alt={title}
            style={{ width: "290px", height: "330px" }}
            className="img-fluid mx-4"
          ></img>
        </Col>

        <Col className="img-fluid ms-5 me-5">
          <div className="my-2 text-xs">{title}</div>
          <Table className="table borderless text-sm">
            <tbody>
              <tr>
                <td className="leftMargin">Imbd Rating</td>
                <td>{imdbRating}</td>
              </tr>
              <tr>
                <td>Content Rating</td>
                <td>{contentRating}</td>
              </tr>
              <tr>
                <td>Average Rating</td>
                <td>{averageRating}</td>
              </tr>
              <tr>
                <td>Duration</td>
                <td>{duration}</td>
              </tr>
              <tr>
                <td>Genres</td>
                <td>{genres}</td>
              </tr>
              <tr>
                <td>Actors</td>
                <td>{actors}</td>
              </tr>
              <tr>
                <td>Release Date</td>
                <td>{releaseDate}</td>
              </tr>
              <tr>
                <td>Story line</td>
                <td>{storyline}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  } else {
    return null;
  }
};

export default SingleMovie;
