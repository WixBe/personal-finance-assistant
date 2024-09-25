// dashboard.component.ts
import { CommonModule, NgClass, NgFor } from '@angular/common';
import { Component, ComponentFactoryResolver, Injector, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports:[NgClass, NgFor, CommonModule]
})

export class DashboardComponent implements OnInit {

  user: any;
  transactions: any[] = [];

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private injector: Injector, private userService: UserService) {}

  // Mock Data
  // user = {
  //   name: 'John Doe',
  //   totalBudget: 50000,
  //   savings: 15000,
  //   goals: [
  //     { name: 'Vacation Fund', target: 10000, current: 5000 },
  //     { name: 'Emergency Fund', target: 20000, current: 12000 }
  //   ],
  //   transactions: [
  //     { id: 1, description: 'Grocery Shopping', amount: -2000, date: '2023-09-10' },
  //     { id: 2, description: 'Salary Credit', amount: 30000, date: '2023-09-05' },
  //     { id: 3, description: 'Electricity Bill', amount: -1500, date: '2023-09-01' }
  //   ]
  // };

  ngOnInit(): void {

    this.user = this.userService.getUserDetails();

    // Fetch transactions using accountNumber
    if (this.user) {
      this.loadTransactions();
    } else {
      // Handle case where user details are not available
      console.log('User details not found');
    }

    const navbarComponentRef = this.componentFactoryResolver.resolveComponentFactory(NavbarComponent)
    const navbarComponentInstance = navbarComponentRef.create(this.injector);

    navbarComponentInstance.instance.ngOnInit();
  }

  loadTransactions(): void {
    this.userService.getTransactions(this.user.accountNumber).subscribe(transactions => {
      this.user.transactions = transactions;
      this.userService.setUserDetails(this.user);  // Update local storage with transactions
    });
  }

}
