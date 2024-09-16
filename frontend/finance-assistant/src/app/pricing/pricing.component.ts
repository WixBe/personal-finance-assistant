import { Component } from '@angular/core';
import { PriceCardComponent } from '../shared/price-card/price-card.component';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [PriceCardComponent],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css'
})
export class PricingComponent {

}
