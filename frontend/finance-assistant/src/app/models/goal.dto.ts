export interface GoalDto {
    name: string;
    accountNumber: string;
    value: number;
    description?: string;
    priority: 'HIGH' | 'MEDIUM' | 'LOW';  // Using the priority enum
    durationInMonths: number;
  }
  