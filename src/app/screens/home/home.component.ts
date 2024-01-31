import { Component } from '@angular/core';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { MoviesListComponent } from '../../components/movies-list/movies-list.component';
import { MovieList } from '../../models/movies-list-model';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchBarComponent, MoviesListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  movies: Movie[] = [];
  currentMovie: string = '';
  page = 1;
  constructor(private moviesService: MoviesService) {}
  movieReceiver(movie: string) {
    this.currentMovie = movie;
    this.page = 1;
    this.getMovies()
  }

  getMovies() {
    this.moviesService
      .getMovies(this.currentMovie)
      .subscribe((moviesList) => this.movies = moviesList.results);
  }

  getMoviesByPage(){
    this.page++;
    this.moviesService
      .getMovies(this.currentMovie, this.page)
      .subscribe((moviesList) => this.movies = this.movies.concat(moviesList.results));
  }
}
