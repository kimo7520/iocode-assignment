import { Component } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { NgForOf, NgIf } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [NgIf, NgForOf],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  previousResults: string[] = [];
  results: string[] = [];
  isFocused = false;
  constructor(private moviesService: MoviesService) {}

  search(movie: string) {
    console.log(movie);
    this.previousResults.push(movie);
  }

  autocomplete(ev: Event) {
    const value = (ev.target as HTMLInputElement).value;
    this.results = this.previousResults
      .filter((result) => result.includes(value))
      .slice(0, 10);
    if (this.results.length < 10) {

      this.moviesService.getMovies(value).pipe(
        map(movies => {
          return movies.results.map(movie => movie.title)
        })
      ).subscribe((moviesTitles) => {
        this.results = this.results.concat(moviesTitles);
        this.results = this.results.slice(0,10);
      })
    }
  }

  displayHistory(ev: Event) {
    this.isFocused = true;
    this.results = this.previousResults.slice(0, 10);
    this.autocomplete(ev)
  }
}
