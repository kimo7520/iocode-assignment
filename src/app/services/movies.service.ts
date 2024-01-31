import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { MovieList } from '../models/movies-list-model';
import { MovieOverview } from '../models/movie-overview.model';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  movieURL = 'https://api.themoviedb.org/3/movie/';
  imageURL = 'http://image.tmdb.org/t/p/w500';
  searchURL = 'https://api.themoviedb.org/3/search/movie';

  constructor(private http: HttpClient) {}

  getMovie(id: string): Observable<MovieOverview> {
    return this.http.get<MovieOverview>(this.movieURL + '/' + id, {
      params: {
        api_key: environment.API_KEY
      }
    });
  }

  getImage(path: string): Observable<any> {
    return this.http.get(this.imageURL + path);
  }

  getMovies(movie: string, page: number = 1): Observable<MovieList> {
    return this.http.get<MovieList>(this.searchURL, {
      params: {
        api_key: environment.API_KEY,
        query: movie,
        page: page,
      },
    });
  }
}
