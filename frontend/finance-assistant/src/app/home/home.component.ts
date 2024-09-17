import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit{

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }
  

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadVantaGlobe();
    }
  }

  loadVantaGlobe(): void {
    if (!document.getElementById('vanta-globe-script')) {
      const script = document.createElement('script');
      script.id = 'vanta-globe-script';
      script.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.globe.min.js';
      script.onload = () => {
        this.initializeVanta();
      };
      document.body.appendChild(script);
    } else {
      this.initializeVanta();
    }
  }

  initializeVanta(): void {
    if (window['VANTA']) {
      window['VANTA'].GLOBE({
        el: "#vanta-bg-globe",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x3f60ff,
        size: 3,
        backgroundColor: 0xffffff
      });
      }
  }
}

declare global {
  interface Window {
    VANTA: any;
  }
}