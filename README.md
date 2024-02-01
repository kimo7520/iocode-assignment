# IOCode Assignment
- This is an angular application that integrates with TMDB API
- It was built with angular 17
- It uses standalone components without any modules
## Features:
1. search for movie
2. select from movies history
3. infinte scrolling
4. take a short movie overview from the homepage
5. display movie details
6. export movie details to an excel sheet
## Packages used:
1. angular material => for using prebuilt components and for creating appliciation theme
2. ngx infinte scrolling => to allow making API requests when the user reaches the end of the page
3. XLSX => convert JSON to excel sheet
## Guide:
### Home page:
user enters home page  
user will find a search bar  
user clicks on the search bar 
previously selected movies will appear if there is any  
if there is any previously selected movies, user can click on one of them to be redirected to its overview page  
user start typing the name of a movie  
results will appear in a grid  
user can click on any movie in the grid to be redirected to its overview page  
if there is no matching results, a snackbar will appear telling the user so + a 'No movies found' message will appear on the screen  
### Overview page:
The movie's poster and info will appear  
There will be a button called 'Export' that exports the movie data in an excel sheet  
If the user clicks on the 'MOV' title, displayed in the header, user will be redirected to the home page  
### How to run
1. Clone the repo in your local environment
2. Navigate to the folder called 'iocode-assignment'
3. Run the following command to install the neccassry packages `npm install`
4. Run the following command to serve the project `ng serve`
5. Open the browser and navigate to [localhost/4200](http://localhost:4200/)
6. The application should start correctly
## How the code works
- The app has 2 screens `Home` and `Overview`
- Home component is responsible for communication between its 2 children. `SearchBar` and `MovieList`
#### Searching
- When a user types the text is sent from the SearchBar component to the Home component and then used as a query for the API call
	```typescript
	//search-bar.component.ts
	this.movieEmitter.emit(value);
	//home.component.ts
	movieReceiver(movie: string) {
    this.currentMovie = movie;
    this.page = 1;
    this.getMovies();
  }
- Now the results will go as an input to the MoviesList component
#### Infinite scrolling
- When a user reaches the end of the current results, the MoviesList component fires an event to the Home component to get the next page
	```html
	//movies-list.component.html
	<main
  class="fixed-height"
  infinite-scroll
  [infiniteScrollDistance]="2"
  [infiniteScrollThrottle]="500"
  (scrolled)="requestMovies()"
  [scrollWindow]="false"
	>
 
-	```typescript
	//movies-list.component.ts
	requestMovies() {
    this.refillMovies.emit();
  	}
-	```typescript
	//home.component.ts
	getMoviesByPage() {
    this.page++;
    this.moviesService
      .getMovies(this.currentMovie, this.page)
      .subscribe(
        (moviesList) => (this.movies = this.movies.concat(moviesList.results))
      );
  	}
#### Showing the last 10 successful queries
- perivous movies sending using replaysubject in  perivous-movies.service.ts to SearchBar component
- ```typescript
	//perivous-movies.service 
  previousMovies$ = new ReplaySubject<Movie | undefined>(10);
- ```typescript
		//search-bar.component.ts
   constructor(private previousMoviesService: PreviousMoviesService, private router: Router) {}
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
- adding movie to previous Results 
-	```typescript
	//movies-list.component.ts
	 addToPrevious(movie: Movie) {
    this.previousMoviesService.previousMovies$.next(movie);
  }

#### Export 
- when user press Export button the data is changed to array and then exported to an excel sheet 
-	```typescript
	//overview.component.ts
				export() {
				const overview = this.helper.flattenObject(this.overview);
				const worksheet = XLSX.utils.json_to_sheet(overview);
				const workbook: XLSX.WorkBook = {
					Sheets: { data: worksheet },
					SheetNames: ['data'],
				};
				XLSX.writeFile(workbook, 'movie.xlsx');
		}

#### Not found message
- when user search with invalid search querie "no movies found"
-  ```typescript
		//home.component.ts 
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