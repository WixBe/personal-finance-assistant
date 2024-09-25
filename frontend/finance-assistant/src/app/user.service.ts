import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // This makes the service available globally in the app
})
export class UserService {
  private userDetails: any;

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8100/api/auth/register';

  registerUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, JSON.stringify(user), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Credentials': 'true'
      }),
      withCredentials: true
    });
  }

  // Method to set user details in local storage
  setUserDetails(details: any) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('userDetails', JSON.stringify(details));
    } else {
      console.log('localStorage is not available');
    }
  }

  // Method to get user details from local storage
  getUserDetails() {
    if (typeof localStorage !== 'undefined') {
      const userDetails = localStorage.getItem('userDetails');
      return userDetails ? JSON.parse(userDetails) : null;
    } else {
      console.log('localStorage is not available');
      return null;
    }
  }

  // Method to fetch transactions for a given account number
  getTransactions(accountNo: string): Observable<any> {
    return this.http.get(`http://localhost:8200/api/transactions/${accountNo}`);
  }
}
