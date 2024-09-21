import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  isLoggedIn: boolean = false;

  constructor( private authService: AuthService ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn();
    this.authService.authStatus.subscribe(status => {
      this.isLoggedIn = status
    });
    // (window as any).navbarComponent = this;
  }

  logout() {
    this.authService.logout();
  }

  setActive(event: Event) {
    // Remove 'active' class from all nav-links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));

    // Add 'active' class to the clicked nav-link
    const target = event.target as HTMLElement;
    target.classList.add('active');
  }

}
