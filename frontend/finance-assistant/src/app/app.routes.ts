import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FeaturesComponent } from './features/features.component';
import { PricingComponent } from './pricing/pricing.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/AuthGuard';
import { NewsComponent } from './news/news.component';
import { ProfileComponent } from './profile/profile.component';
import { GoalComponent } from './goal/goal.component';
import { MychartComponent } from './mychart/mychart.component';

export const routes: Routes = [
    { path:'', redirectTo: 'home', pathMatch: 'full' },
    { path:'home', component: HomeComponent },
    { path:'features', component: FeaturesComponent },
    { path:'pricing', component: PricingComponent },
    { path:'home/signup', component: SignupComponent },
    { path:'login/signup', component: SignupComponent },
    { path:'login', component: LoginComponent },
    { path:'home/signup/login', component: LoginComponent },
    { path:'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'news', component: NewsComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'goal', component: GoalComponent },
    { path: 'vault', component: MychartComponent }
];
