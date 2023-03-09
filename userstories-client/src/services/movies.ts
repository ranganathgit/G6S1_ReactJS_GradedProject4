import axios from "axios";
import IUserMovie from "../models/IUserMovie";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
const getMovies = async (key: string) => {
  console.log("Inside getMovies");
  const response = await axios.get(`${apiBaseUrl}/${key}`);
  return response.data as IUserMovie[];
};

const getSingleMovie = async (key: string, id: string) => {
  console.log("Inside getSingleMovie");
  const response = await axios.get(`${apiBaseUrl}/${key}/${id}`);
  return response.data as IUserMovie;
};

const addMovieToFavourite = (key: string, movie: IUserMovie) => {
  console.log("Inside addToFavourite");

  return axios
    .post<IUserMovie>(`${apiBaseUrl}/${key}`, movie, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data);
};

const removeMovieFromFavourite = (key: string, id: string) => {
  console.log("Inside removeMovieFromFavourite");

  return axios
    .delete<IUserMovie>(`${apiBaseUrl}/${key}/${id}`)
    .then((response) => response.data);
};

export {
  getMovies,
  getSingleMovie,
  addMovieToFavourite,
  removeMovieFromFavourite,
};
