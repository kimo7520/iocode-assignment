import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class PreviousMoviesService {
  previousMovies$ = new ReplaySubject<Movie | undefined>(10);
  constructor() { }
}
