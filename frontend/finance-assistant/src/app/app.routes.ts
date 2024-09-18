import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FeaturesComponent } from './features/features.component';
import { PricingComponent } from './pricing/pricing.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    { path:'', redirectTo: 'home', pathMatch: 'full' },
    { path:'home', component: HomeComponent },
    { path:'features', component: FeaturesComponent },
    { path:'pricing', component: PricingComponent },
    { path:'home/signup', component: SignupComponent },
    { path:'login/signup', component: SignupComponent },
    { path:'login', component: LoginComponent },
    { path:'home/signup/login', component: LoginComponent },
    { path:'dashboard', component: DashboardComponent }
];
