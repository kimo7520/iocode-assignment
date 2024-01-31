import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Movie } from '../../models/movie.model';
import { RouterLink } from '@angular/router';
import { PreviousMoviesService } from '../../services/previous-movies.service';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [CommonModule, InfiniteScrollModule, RouterLink],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.css'
})
export class MoviesListComponent {
  @Input() movies: Movie[] = [];
  @Output() refillMovies = new EventEmitter<undefined>();

  constructor(private previousMoviesService: PreviousMoviesService) {}


  requestMovies(){    
    this.refillMovies.emit();
  }

  addToPrevious(movie: Movie){
    this.previousMoviesService.previousMovies$.next(movie)
  }
}
