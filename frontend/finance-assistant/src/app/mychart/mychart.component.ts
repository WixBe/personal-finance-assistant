import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Transaction } from '../models/transactiions';
import { MasterService } from '../services/master.service';

Chart.register(...registerables);

@Component({
  selector: 'app-mychart',
  standalone: true,
  imports: [],
  templateUrl: './mychart.component.html',
  styleUrls: ['./mychart.component.css']
})
export class MychartComponent implements OnInit {
  transactions: Transaction[] = [];

  // Chart variables
  lineChart: Chart<'line'> | undefined;
  pieChart: Chart<'pie'> | undefined;

  constructor(private masterService: MasterService) {}

  ngOnInit() {
    this.getAllTransactions();
  }

  getAllTransactions() {
    this.masterService.getAllTransactions().subscribe(data => {
      this.transactions = data;
      this.createCharts();
    });
  }

  createCharts() {
    this.createLineChart();
    this.createPieChart();
  }

  createLineChart() {
    const canvas = document.getElementById('linechart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (this.lineChart) {
      this.lineChart.destroy();
    }

    if (ctx) {
      const expensesData = this.transactions.filter(t => t.type === 'expense');
      const labels = expensesData.map(t => t.date);
      const expenses = expensesData.map(t => t.amount);

 
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(255, 99, 132, 1)');
      gradient.addColorStop(1, 'rgba(255, 99, 132, 0.2)');

      this.lineChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Expenses Over Time',
            data: expenses,
            borderColor: gradient,
            backgroundColor: gradient,
            borderWidth: 4,
            fill: true,
            tension: 0.3, 
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            pointRadius: 5, 
            pointHoverRadius: 7 
          }]
        },
        options: {
          responsive: true,
          animations: {
            tension: {
              duration: 1000,
              easing: 'easeInOutQuad',
              from: 1,
              to: 0,
              loop: true
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              min: 0,
              max: Math.max(...expenses) + 100,
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
              text: 'Expenses Trend Over Time',
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


  createPieChart() {
    const categoryTotals = this.calculateCategoryTotals();
    const canvas = document.getElementById('piechart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (this.pieChart) {
        this.pieChart.destroy();
    }

    if (ctx) {
        const colors = this.getPieChartColors(Object.keys(categoryTotals).length);

        this.pieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: Object.keys(categoryTotals),
                datasets: [{
                    label: 'Transaction Categories',
                    data: Object.values(categoryTotals),
                    backgroundColor: colors,
                    hoverOffset: 10 // Add hover effect
                }]
            },
            options: {
                responsive: true,
                animation: {
                    // Use an animation configuration that is compatible with the pie chart
                    animateScale: true,
                    animateRotate: true
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
                        text: 'Transactions by Category',
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

  calculateCategoryTotals() {
    const totals: { [key: string]: number } = {};
    this.transactions.forEach(transaction => {
      const category = transaction.category;
      const amount = transaction.amount;

      if (transaction.type === 'expense') {
        if (!totals[category]) {
          totals[category] = 0;
        }
        totals[category] += amount;
      }
    });
    return totals;
  }

  getPieChartColors(numColors: number) {
    const colors = [];
    const colorSet = [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FF9F40'
    ];
    for (let i = 0; i < numColors; i++) {
      colors.push(colorSet[i % colorSet.length]); // Use color set to ensure variety
    }
    return colors;
  }
}
