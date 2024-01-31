import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { PreviousMoviesService } from '../../services/previous-movies.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [NgIf, NgForOf, RouterLink],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent implements OnInit {
  previousResults: MovieData[] = [];
  filteredResults: MovieData[] = [];
  isFocused = false;
  @Output() movieEmitter = new EventEmitter<string>();

  constructor(private previousMoviesService: PreviousMoviesService) {}

  ngOnInit(): void {
    this.previousMoviesService.previousMovies$
      .asObservable()
      .subscribe((movie) => {
        if(movie){
          this.previousResults.unshift({
            id: movie.id,
            title: movie.title,
          });

        }
      });
  }

  autocomplete(ev: Event) {
    console.log(this.previousResults);
    
    const value = (ev.target as HTMLInputElement).value;
    this.movieEmitter.emit(value);

    this.filteredResults = this.previousResults
      .filter((result) => result.title?.startsWith(value))
      .slice(0, 10);
  }

  displayHistory(ev: Event) {
    this.isFocused = true;
    this.filteredResults = this.previousResults.slice(0, 10);
    this.autocomplete(ev);
  }
}

interface MovieData {
  title: string;
  id: number;
}
