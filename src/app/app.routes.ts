import { Routes } from '@angular/router';
import { HomeComponent } from './screens/home/home.component';
import { OverviewComponent } from './screens/overview/overview.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'overview/:id', component: OverviewComponent },
];
