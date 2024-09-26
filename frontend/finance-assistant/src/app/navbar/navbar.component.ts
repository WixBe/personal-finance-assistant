import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, ActivatedRoute, Route } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // this.authService.isLoggedIn();
    this.authService.authStatus.subscribe(status => {
      this.isLoggedIn = status;
    });

    // Listen to route changes to set the active class
    this.router.events.subscribe(() => {
      this.setActive();
    });
    
    // (window as any).NavbarComponent = this;
  }

  logout() {
    this.authService.logout();
  }

  setActive() {
    // Get the current route
    const currentRoute = this.router.url;

    // Remove 'active' class from all nav-links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));

    // Add 'active' class to the nav-link that matches the current route
    navLinks.forEach(link => {
      const href = link.getAttribute('routerLink');
      if (href && currentRoute.includes(href)) {
        link.classList.add('active');
      }
    });
  }
}
