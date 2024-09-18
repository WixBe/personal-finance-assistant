// dashboard.component.ts
import { NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports:[NgClass, NgFor]
})

export class DashboardComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void {
  }

}
