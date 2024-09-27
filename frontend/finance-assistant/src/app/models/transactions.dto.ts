// transaction.model.ts
export interface Transaction {
    transactionDate: string;
    transactionDetails: string;
    transactionType: 'Withdraw' | 'Deposit';  // Define the types explicitly
    amount: number;
  }
  