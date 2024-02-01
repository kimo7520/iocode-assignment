import { Component } from '@angular/core';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { MoviesListComponent } from '../../components/movies-list/movies-list.component';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../models/movie.model';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  constructor(private moviesService: MoviesService, private snackbar: MatSnackBar) {}
  movieReceiver(movie: string) {
    this.currentMovie = movie;
    this.page = 1;
    this.getMovies();
  }

  getMovies() {
    this.moviesService.getMovies(this.currentMovie).subscribe((moviesList) => {
      if (this.currentMovie && !moviesList.results.length) {
        this.snackbar.open('No movies found', 'Dismiss', {
          duration: 3000,
        })
      }
      this.movies = moviesList.results;
    });
  }

  getMoviesByPage() {
    this.page++;
    this.moviesService
      .getMovies(this.currentMovie, this.page)
      .subscribe(
        (moviesList) => (this.movies = this.movies.concat(moviesList.results))
      );
  }
}
