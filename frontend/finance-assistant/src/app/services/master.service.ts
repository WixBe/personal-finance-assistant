import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transactiions';


@Injectable({
  providedIn: 'root'
})
export class MasterService {

  private apiUrl = "http://localhost:8400/api/transactions-db"; // Adjust based on your JSON server URL

  constructor(private http:HttpClient) { }


  // Create a single transaction
  createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}`, transaction);
  }

  // Create multiple transactions
  createMultipleTransactions(transactions: Transaction[]): Observable<Transaction[]> {
    return this.http.post<Transaction[]>(`${this.apiUrl}/createMultipleTransactions`, transactions);
  }

  // Get all transactions
  getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl);
  }
}
