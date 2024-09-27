// dashboard.component.ts
import { CommonModule, NgClass, NgFor } from '@angular/common';
import { Component, ComponentFactoryResolver, Injector, OnInit } from '@angular/core';
import { Transaction } from '../models/transactiions';
import { NavbarComponent } from '../navbar/navbar.component';
import { GoalService } from '../services/goal.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports:[NgClass, NgFor, CommonModule,]
})

export class DashboardComponent implements OnInit {

  user: any;
  accountBalance: number = 0;  // Store account balance
  transactions: Transaction[] = [];
  goals: any[] = [];
  totalBudget: number = 0;
  expanded: boolean = false;
  safety: boolean = true;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private injector: Injector, private userService: UserService, private goalService: GoalService) {}

  ngOnInit(): void {

    this.user = this.userService.getUserDetails();
    // Ensure user details are available
    if (this.user && this.user.accountNumber) {
      // Fetch account balance using the accountNumber
      this.getAccountBalance(this.user.accountNumber);

      // Load transactions and goals
      this.loadTransactions();
      this.loadGoals();
    } else {
      console.error('User details not found or account number missing');
    }

    this.loadGoals();

    this.safety = this.accountBalance > this.totalBudget;

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

  // Method to fetch the account balance
  getAccountBalance(accountNumber: string): void {
    this.userService.getAccount(accountNumber).subscribe(
      (accountData) => {
        this.accountBalance = accountData.accountBalance;  // Store account balance
        console.log('Account Balance:', this.accountBalance);
      },
      (error) => {
        console.error('Error fetching account balance:', error);
      }
    );
  }

  loadTransactions(): void {
    this.userService.getTransactions(this.user.accountNumber).subscribe(transactions => {
      this.user.transactions = transactions;
      this.userService.setUserDetails(this.user);  // Update local storage with transactions
    });
  }

  // Method to load goals and calculate total budget
  loadGoals(): void {
    this.goalService.getAllGoals().subscribe(
      (goals) => {
        // Filter goals by user's account number
        this.goals = goals.filter((goal) => goal.accountNumber === this.user.accountNumber);

        // Calculate the total budget by summing goal values (e.g., targetAmount)
        this.totalBudget = this.goals.reduce((sum, goal) => sum + (goal.value || 0), 0);
        console.log('Total Budget:', this.totalBudget);
      },
      (error) => {
        console.error('Error fetching goals:', error);
      }
    );
  }

  // Toggle the transaction display state
  toggleTransactions(): void {
    this.expanded = !this.expanded;
  };

}
