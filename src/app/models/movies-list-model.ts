import { Movie } from "./movie.model";

export interface MovieList {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

