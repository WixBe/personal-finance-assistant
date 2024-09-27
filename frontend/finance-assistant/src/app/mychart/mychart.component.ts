import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { UserService } from '../services/user.service';  // Use UserService to fetch transactions

Chart.register(...registerables);

@Component({
  selector: 'app-mychart',
  templateUrl: './mychart.component.html',
  styleUrls: ['./mychart.component.css']
})
export class MychartComponent implements OnInit {
  transactions: any[] = [];  // Store fetched transactions

  // Chart variables
  lineChart: Chart<'line'> | undefined;
  pieChart: Chart<'pie'> | undefined;
  detailsPieChart: Chart<'pie'> | undefined;

  constructor(private userService: UserService) {}

  ngOnInit() {
    // Fetch the transactions when the component initializes
    this.getTransactions();
  }

  getTransactions() {
    // Assuming the account number is available in user details
    const user = this.userService.getUserDetails();
    const accountNo = user?.accountNumber;

    if (accountNo) {
      this.userService.getTransactions(accountNo).subscribe(
        (data: any[]) => {
          this.transactions = data;
          this.createCharts();
        },
        (error) => {
          console.error('Error fetching transactions:', error);
        }
      );
    } else {
      console.error('Account number not available');
    }
  }

  createCharts() {
    this.createLineChart();
    this.createPieChart();
    this.createDetailsPieChart();
  }

  // Line chart showing both Withdrawals and Deposits over time
  createLineChart() {
    const canvas = document.getElementById('linechart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (this.lineChart) {
      this.lineChart.destroy();
    }

    if (ctx) {
      // Separate deposits and withdrawals
      const depositsData = this.transactions.filter(t => t.transactionType === 'Deposit');
      const withdrawalsData = this.transactions.filter(t => t.transactionType === 'Withdraw');

      const depositLabels = depositsData.map(t => t.transactionDate);
      const depositAmounts = depositsData.map(t => t.amount);

      const withdrawalLabels = withdrawalsData.map(t => t.transactionDate);
      const withdrawalAmounts = withdrawalsData.map(t => t.amount);

      // Create the line chart
      this.lineChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: depositLabels.length > withdrawalLabels.length ? depositLabels : withdrawalLabels, // Use the longest labels
          datasets: [
            {
              label: 'Deposits Over Time',
              data: depositAmounts,
              borderColor: 'rgba(54, 162, 235, 1)', // Blue for deposits
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderWidth: 4,
              fill: true,
              tension: 0.3,
              pointBackgroundColor: 'rgba(54, 162, 235, 1)',
              pointRadius: 5,
              pointHoverRadius: 7
            },
            {
              label: 'Withdrawals Over Time',
              data: withdrawalAmounts,
              borderColor: 'rgba(255, 99, 132, 1)', // Red for withdrawals
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderWidth: 4,
              fill: true,
              tension: 0.3,
              pointBackgroundColor: 'rgba(255, 99, 132, 1)',
              pointRadius: 5,
              pointHoverRadius: 7
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              min: 0,
              title: {
                display: true,
                text: 'Amount ($)'
              },
              grid: {
                display: false,
              },
            },
            x: {
              title: {
                display: true,
                text: 'Date'
              },
              grid: {
                display: false,
              },
            }
          },
          plugins: {
            legend: {
              position: 'top',
              labels: {
                boxWidth: 20,
                padding: 15
              }
            },
            title: {
              display: true,
              text: 'Deposits and Withdrawals Over Time',
              font: {
                size: 20,
                weight: 'bold'
              }
            }
          }
        }
      });
    } else {
      console.error('Failed to get canvas context for line chart');
    }
  }

  // Pie chart showing the proportion of Withdrawals vs Deposits
  createPieChart() {
    const categoryTotals = this.calculateTransactionTypeTotals();
    const canvas = document.getElementById('piechart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (this.pieChart) {
        this.pieChart.destroy();
    }

    if (ctx) {
        const colors = ['#FF6384', '#36A2EB'];  // Red for Withdraw, Blue for Deposit

        this.pieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: Object.keys(categoryTotals),  // Withdraw, Deposit
                datasets: [{
                    label: 'Total Amount',
                    data: Object.values(categoryTotals),  // Withdraw total, Deposit total
                    backgroundColor: colors,
                    hoverOffset: 10 // Add hover effect
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            boxWidth: 20,
                            padding: 15
                        }
                    },
                    title: {
                        display: true,
                        text: 'Withdrawals vs Deposits',
                        font: {
                            size: 20, // Increase font size for title
                            weight: 'bold'
                        }
                    }
                }
            }
        });
    } else {
        console.error('Failed to get canvas context for pie chart');
    }
  }

  createDetailsPieChart() {
    const detailsTotals = this.calculateDetailsTotals();
    const canvas = document.getElementById('detailsPieChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (this.detailsPieChart) {
      this.detailsPieChart.destroy();
    }

    if (ctx) {
      const colors = ['#FFCE56', '#FF9F40', '#4BC0C0'];  // Colors for various details

      this.detailsPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: Object.keys(detailsTotals),
          datasets: [{
            data: Object.values(detailsTotals),
            backgroundColor: colors,
            hoverOffset: 10
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: {
              display: true,
              text: 'Transactions by Details'
            }
          }
        }
      });
    }
  }

  // Calculate totals for Withdrawals and Deposits
  calculateTransactionTypeTotals() {
    const totals: { [key: string]: number } = { Withdraw: 0, Deposit: 0 };
    this.transactions.forEach(transaction => {
      if (transaction.transactionType === 'Withdraw') {
        totals['Withdraw'] += transaction.amount;
      } else if (transaction.transactionType === 'Deposit') {
        totals['Deposit'] += transaction.amount;
      }
    });
    return totals;
  }

  calculateDetailsTotals() {
    const totals: { [key: string]: number } = {};

    this.transactions.forEach(transaction => {
      const details = transaction.transactionDetails;
      if (!totals[details]) {
        totals[details] = 0;
      }
      totals[details] += transaction.amount;
    });

    return totals;
  }
}
