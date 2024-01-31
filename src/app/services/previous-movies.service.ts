import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class PreviousMoviesService {
  previousMovies$ = new BehaviorSubject<Movie | undefined>(undefined);
  constructor() { }
}
