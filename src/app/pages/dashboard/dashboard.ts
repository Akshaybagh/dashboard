import {
  Chart,
  PieController,
  BarController,
  LineController,
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale
} from 'chart.js';

// Register required chart components
Chart.register(
  PieController,
  BarController,
  LineController,
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale
);

// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Navbar } from '../../shared/navbar/navbar';
import { RouterModule } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartType, ChartData, ChartOptions } from 'chart.js';


// ...existing code...

// ...existing code...
interface Consumption {
  id: number;
  amount: number;
  date: string;
  source: string;
  location: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective,Navbar,RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  data: Consumption[] = [];

  sourceDistributionData!: ChartData<'pie'>;
  monthlyTrendData!: ChartData<'line'>;
  locationWiseData!: ChartData<'bar'>;
  

  // ✅ Shared chart options
  chartOptions: ChartOptions<'pie' | 'line' | 'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      }
    }
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
   this.http.get<Consumption[]>('data.json').subscribe(res => {
  this.data = res;
  this.prepareCharts();
});
  }

  prepareCharts() {
    this.sourceDistributionData = this.getSourceDistribution();
    this.monthlyTrendData = this.getMonthlyConsumption();
    this.locationWiseData = this.getLocationWiseData();
  }

  getSourceDistribution(): ChartData<'pie'> {
    const grouped = this.data.reduce((acc, item) => {
      acc[item.source] = (acc[item.source] || 0) + item.amount;
      return acc;
    }, {} as Record<string, number>);

    return {
      labels: Object.keys(grouped),
      datasets: [{
        data: Object.values(grouped),
        backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726']
      }]
    };
  }

  getMonthlyConsumption(): ChartData<'line'> {
    const grouped = this.data.reduce((acc, item) => {
      const month = item.date.slice(0, 7); // "YYYY-MM"
      acc[month] = (acc[month] || 0) + item.amount;
      return acc;
    }, {} as Record<string, number>);

    return {
      labels: Object.keys(grouped),
      datasets: [{
        label: 'Monthly Consumption',
        data: Object.values(grouped),
        borderColor: '#42A5F5',
        fill: false,
      }]
    };
  }


  getLocationWiseData(): ChartData<'bar'> {
    const grouped = this.data.reduce((acc, item) => {
      acc[item.location] = (acc[item.location] || 0) + item.amount;
      return acc;
    }, {} as Record<string, number>);

    return {
      labels: Object.keys(grouped),
      datasets: [{
        label: 'Consumption by Location',
        data: Object.values(grouped),
        backgroundColor: '#66BB6A'
      }]
    };
  }
}
