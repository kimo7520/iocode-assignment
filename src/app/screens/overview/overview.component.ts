import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MovieOverview } from '../../models/movie-overview.model';
import * as XLSX from 'xlsx';
import { HelperService } from '../../services/helper.service';
@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent implements OnInit {
  overview?: MovieOverview;

  constructor(
    public moviesService: MoviesService,
    private activatedRoute: ActivatedRoute,
    private helper: HelperService
  ) {}

  ngOnInit(): void {
    const movieId = this.activatedRoute.snapshot.paramMap.get('id');
    this.moviesService
      .getMovie(movieId!)
      .subscribe((overview) => (this.overview = overview));
  }

  export(){
    const overview = this.helper.flattenObject(this.overview);    
    const worksheet = XLSX.utils.json_to_sheet(overview);
    const workbook: XLSX.WorkBook = {
      Sheets: {data: worksheet},
      SheetNames: ['data']
    };
    XLSX.writeFile(workbook, 'movie.xlsx');
  }
}
