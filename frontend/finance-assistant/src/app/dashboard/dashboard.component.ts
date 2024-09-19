// dashboard.component.ts
import { NgClass, NgFor } from '@angular/common';
import { Component, ComponentFactoryResolver, Injector, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports:[NgClass, NgFor]
})

export class DashboardComponent implements OnInit {

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private injector: Injector) {}

  // Mock Data
  user = {
    name: 'John Doe',
    totalBudget: 50000,
    savings: 15000,
    goals: [
      { name: 'Vacation Fund', target: 10000, current: 5000 },
      { name: 'Emergency Fund', target: 20000, current: 12000 }
    ],
    transactions: [
      { id: 1, description: 'Grocery Shopping', amount: -2000, date: '2023-09-10' },
      { id: 2, description: 'Salary Credit', amount: 30000, date: '2023-09-05' },
      { id: 3, description: 'Electricity Bill', amount: -1500, date: '2023-09-01' }
    ]
  };

  ngOnInit(): void {

    const navbarComponentRef = this.componentFactoryResolver.resolveComponentFactory(NavbarComponent)
    const navbarComponentInstance = navbarComponentRef.create(this.injector);

    navbarComponentInstance.instance.ngOnInit();
  }

}
