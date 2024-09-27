import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { GoalDto } from '../models/goal.dto';
import { GoalService } from '../services/goal.service';
import { UserService } from '../services/user.service';



@Component({
  selector: 'app-goal',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './goal.component.html',
  styleUrl: './goal.component.css'
})
export class GoalComponent implements OnInit {

  user: any;


  goal: GoalDto = {
    name: '',
    accountNumber: '',
    value: 0,
    description: '',
    priority: 'HIGH',
    durationInMonths: 0
  };
  goals: any[] = [];
  priorities: string[] = ['HIGH', 'MEDIUM', 'LOW'];
  goalIdToDelete: number | null = null;

  constructor(private goalService: GoalService, private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getUserDetails();
    this.loadGoals();
  }

  onSubmit(): void {
    if (!this.goal.name || this.goal.value <= 0 || this.goal.durationInMonths <= 0) {
      alert('All fields are required, and value/duration must be greater than zero!');
      return;
    }


    this.goalService.createGoal(this.goal).subscribe(() => {
      this.loadGoals();
      this.resetForm();
    });
  }

  loadGoals(): void {
    this.goalService.getAllGoals().subscribe(goals => {
      this.goals = goals.filter(goal => goal.accountNumber === this.user.accountNumber);
    });
  }

  confirmDelete(goalId: number): void {
    const confirmDelete = window.confirm('Are you sure you want to delete this goal?');
    if (confirmDelete) {
      this.deleteGoal(goalId);
    }
  }

  deleteGoal(goalId: number): void {
    this.goalService.deleteGoal(goalId).subscribe(() => {
      this.loadGoals(); // Refresh the list of goals
    });
  }

  resetForm(): void {
    this.goal = {
      name: '',
      accountNumber: '',
      value: 0,
      description: '',
      priority: 'HIGH',
      durationInMonths: 0
    };
  }
}















//   goal: GoalDto = {
//     name: '',
//     value: 0,
//     description: '',
//     priority: 'HIGH',
//     durationInMonths: 0
//   };
//   goals: any[] = [];
//   priorities: string[] = ['HIGH', 'MEDIUM', 'LOW'];
//   goalIdToDelete: number | null = null;

//   constructor(private goalService: GoalService) { }

//   ngOnInit(): void {
//     this.loadGoals();
//   }

  

//   onSubmit(): void {
//     this.goalService.createGoal(this.goal).subscribe(() => {
//       this.loadGoals();
//       this.resetForm();
//     });
//   }

//   loadGoals(): void {
//     this.goalService.getAllGoals().subscribe(goals => {
//       this.goals = goals;
//     });
//   }

  
//   confirmDelete(goalId: number) {
//     const confirmDelete = window.confirm('Are you sure you want to delete this goal?');
//     if (confirmDelete) {
//       this.deleteGoal(goalId);
//     }
//   }

//   deleteGoal(goalId: number) {
//     this.goalService.deleteGoal(goalId).subscribe(() => {
//       this.loadGoals(); // Refresh the list of goals
//     });
//   }

 


//   resetForm(): void {
//     this.goal = {
//       name: '',
//       value: 0,
//       description: '',
//       priority: 'HIGH',
//       durationInMonths: 0
//     };
//   }
// }







