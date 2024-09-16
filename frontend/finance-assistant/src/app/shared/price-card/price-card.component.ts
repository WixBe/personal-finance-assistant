import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-price-card',
  standalone: true,
  imports: [],
  templateUrl: './price-card.component.html',
  styleUrl: './price-card.component.css'
})
export class PriceCardComponent {

  @Input() planName: string = '';
  @Input() price: number = 0;
  @Input() duration: string = '';
}
