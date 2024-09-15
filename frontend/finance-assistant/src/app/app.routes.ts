import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FeaturesComponent } from './features/features.component';

export const routes: Routes = [
    { path:'', redirectTo: 'home', pathMatch: 'full' },
    { path:'home', component: HomeComponent },
    { path:'features', component: FeaturesComponent },
];
