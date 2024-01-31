import { Component, EventEmitter, Output } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [NgIf, NgForOf],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  previousResults: string[] = [];
  filteredResults: string[] = []
  isFocused = false;
  @Output() movieEmitter = new EventEmitter<string>();
  search(movie: string) {
    // alert(movie);
    this.previousResults.unshift(movie);
  }

  autocomplete(ev: Event) {
    const value = (ev.target as HTMLInputElement).value;
    this.movieEmitter.emit(value);
    
    this.filteredResults = this.previousResults
      .filter((result) => result.startsWith(value))
      .slice(0, 10);
  }

  displayHistory(ev: Event) {
    this.isFocused = true;
    this.filteredResults = this.previousResults.slice(0, 10);
    this.autocomplete(ev);
  }
}
