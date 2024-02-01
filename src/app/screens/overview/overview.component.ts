import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MovieOverview } from '../../models/movie-overview.model';
import * as XLSX from 'xlsx';
import { HelperService } from '../../services/helper.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RemoveUndescorePipe } from '../../pipes/remove-undescore.pipe';
interface cloumns {
  item: string;
  value: string;
}
@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, RemoveUndescorePipe],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent implements OnInit {
  overview!: MovieOverview;

  constructor(
    public moviesService: MoviesService,
    private activatedRoute: ActivatedRoute,
    private helper: HelperService
  ) {}

  ngOnInit(): void {
    const movieId = this.activatedRoute.snapshot.paramMap.get('id');
    this.moviesService
      .getMovie(movieId!)
      .subscribe((overview) => {
        this.overview = overview
        this.datasource = Object.keys(overview).filter(key => {
          return !Array.isArray(overview[key as keyof typeof overview]) && typeof overview[key as keyof typeof overview] !== 'object'
        }).map(key => {
          return {
            item: key,
            value: String(overview[key as keyof typeof overview])
          }
        })
        console.log(this.datasource);
        
      });
  }

  export() {
    const overview = this.helper.flattenObject(this.overview);
    const worksheet = XLSX.utils.json_to_sheet(overview);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    XLSX.writeFile(workbook, 'movie.xlsx');
  }
  displayedColumns: string[] = ['item', 'value'];
  datasource: cloumns[] = [];

  /** Gets the total cost of all transactions. */


 
 

}
