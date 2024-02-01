import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { PreviousMoviesService } from '../../services/previous-movies.service';
import { Router } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent implements OnInit {
  previousResults: MovieData[] = [];
  filteredResults: MovieData[] = [];
  isFocused = false;
  @Output() movieEmitter = new EventEmitter<string>();
  movieControl = new FormControl<string>('');

  constructor(private previousMoviesService: PreviousMoviesService, private router: Router) {}
  //TODO put the previous movies in a service
  ngOnInit(): void {
    this.previousMoviesService.previousMovies$
      .asObservable()
      .subscribe((movie) => {
        if (movie) {
          this.previousResults.unshift({
            id: movie.id,
            title: movie.title,
          });
        }
      });
  }

  autocomplete(ev: Event) {
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
  
  navigateTo(id: number){
    this.router.navigate(['/overview', id])
  }
}

interface MovieData {
  title: string;
  id: number;
}
