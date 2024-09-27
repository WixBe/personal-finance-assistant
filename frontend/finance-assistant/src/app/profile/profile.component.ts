import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GoalService } from '../services/goal.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  user: any = {};  // Object to hold user details
  accountBalance: number = 0;  // Store account balance
  totalBudget: number = 0;
  goals: any[] = [];

  constructor(private userService: UserService, private goalService: GoalService) { }

  ngOnInit(): void {
    // Fetch user details from the service
    this.user = this.userService.getUserDetails();

    if (this.user && this.user.accountNumber) {
      // Fetch account balance using the accountNumber
      this.getAccountBalance(this.user.accountNumber);
      this.loadGoals();
    } else {
      console.error('User details not found or account number missing');
    }
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

  loadGoals(): void {
    this.goalService.getAllGoals().subscribe(
      (goals) => {
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

}
