import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { RouterLink, Router, ActivatedRoute, Route, NavigationEnd } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn();
    this.authService.authStatus.subscribe(status => {
      this.isLoggedIn = status;
    });

    // Listen to route changes to set the active class
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
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
    const navLinks = this.el.nativeElement.querySelectorAll('.nav-link');
    navLinks.forEach((link: HTMLElement) => {
      this.renderer.removeClass(link, 'active');

      const href = link.getAttribute('routerLink');
      if (href && currentRoute.includes(href)) {
        this.renderer.addClass(link, 'active');
      }
    });
  }
}
