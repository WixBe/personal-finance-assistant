// src/app/models/transaction.model.ts
export interface Transaction {
    id: number;
    date: string; // You might want to use Date type later
    description: string;
    amount: number;
    type: 'income' | 'expense'; // Use union types for type safety
    category: string;
  }
  