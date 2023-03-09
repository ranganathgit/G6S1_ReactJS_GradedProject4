export default interface IUserMovie {
  id: string;
  title: string;
  year: string;
  genres: Array<number>;
  ratings: Array<number>;
  poster: string;
  contentRating: string;
  duration: string;
  releaseDate: string;
  averageRating: number;
  originalTitle: string;
  storyline: string;
  actors: Array<string>;
  imdbRating: number;
  posterurl: string;
}
