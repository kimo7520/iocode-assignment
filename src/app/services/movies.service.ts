import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { MovieList } from '../models/movies-list-model';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  movieURL = 'https://api.themoviedb.org/3/movie/';
  imageURL = 'http://image.tmdb.org/t/p/w500/';
  searchURL = 'https://api.themoviedb.org/3/search/movie';
  
  constructor(private http: HttpClient) {}

  getMovie(path: string): Observable<any> {
    return this.http.get(this.movieURL + path);
  }

  getImage(path: string): Observable<any> {
    return this.http.get(this.imageURL + path);
  }

  getMovies(movie: string): Observable<MovieList> {
    return this.http.get<MovieList>(this.searchURL, {
      params: {
        api_key: environment.API_KEY,
        query: movie,
        page: 1
      }
    });
  }
}
