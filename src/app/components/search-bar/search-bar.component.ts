import { Component } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  search(movie: string){
    console.log(movie); 
  }

  autocomplete(ev: Event){
    const value = (ev.target as HTMLInputElement).value;
    console.log(value);
    
  }
}
