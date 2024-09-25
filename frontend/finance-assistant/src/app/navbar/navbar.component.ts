import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../auth.service';
import { filter } from 'rxjs/operators';

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
    private renderer: Renderer2,  // Use Renderer2 for DOM manipulation
    private el: ElementRef  // Use ElementRef to access the DOM tree inside the component
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
  }

  logout() {
    this.authService.logout();
  }

  setActive() {
    // Get the current route
    const currentRoute = this.router.url;

    // Use ElementRef to access nav-links inside the component's template
    const navLinks = this.el.nativeElement.querySelectorAll('.nav-link');
    
    // Loop through nav-links and remove 'active' class
    navLinks.forEach((link: HTMLElement) => {
      this.renderer.removeClass(link, 'active');
      
      // Check if the routerLink matches the current route
      const href = link.getAttribute('routerLink');
      if (href && currentRoute.includes(href)) {
        this.renderer.addClass(link, 'active');
      }
    });
  }
}
