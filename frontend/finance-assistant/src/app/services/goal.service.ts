import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GoalDto } from '../models/goal.dto';


@Injectable({
  providedIn: 'root'
})
export class GoalService {

  private apiUrl = `http://localhost:8300/goals/all`; // Correct endpoint

  constructor(private http: HttpClient) { }

  createGoal(goal: GoalDto): Observable<any> {
    return this.http.post<any>(`http://localhost:8300/goals/create`, goal);
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
