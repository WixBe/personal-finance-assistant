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
    this.authService.authStatus.subscribe(status => {
      this.isLoggedIn = status
    });
    // (window as any).navbarComponent = this;
  }

  logout() {
    this.authService.logout();
  }

}
