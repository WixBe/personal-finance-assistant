import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GoalDto } from '../models/goal.dto';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class GoalService {

  private apiUrl = `http://localhost:8300/goals/all`; // Correct endpoint

  constructor(private http: HttpClient, private userService: UserService) { }

  createGoal(goal: GoalDto): Observable<any> {
    const userDetails = this.userService.getUserDetails();
  
    if (userDetails && userDetails.accountNumber) {
      // Assign the account number from the stored user details
      goal.accountNumber = userDetails.accountNumber;
      return this.http.post<any>(`http://localhost:8300/goals/create`, goal);
    } else {
      console.error('User details not found or account number is missing');
      // Handle the error by returning an error Observable
      return new Observable(observer => {
        observer.error('User details not found, please log in again');
      });
    }
  }
  

  getAllGoals(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getGoalById(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8300/goals/${id}`);
  }

  deleteGoal(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8300/goals/${id}`);
  }

}





//   private apiUrl = `http://localhost:8300/goals`;

//   constructor(private http: HttpClient) { }

//   createGoal(goal: GoalDto): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/create`, goal);
//   }

//   getAllGoals(): Observable<any[]> {
//     return this.http.get<any[]>(this.apiUrl);
//   }

//   getGoalById(id: number): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/${id}`);
//   }

//   deleteGoal(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/${id}`);
//   }
// }
