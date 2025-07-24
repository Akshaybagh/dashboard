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

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Navbar } from '../../shared/navbar/navbar';
import { RouterModule } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartType, ChartData, ChartOptions } from 'chart.js';
import { FormsModule } from '@angular/forms';

interface Consumption {
  id: number;
  amount: number;
  date: string;
  source: string;
  location: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, BaseChartDirective, Navbar, RouterModule,FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  data: Consumption[] = [];
  filteredData: Consumption[] = [];

  // Dropdown options
  months = [
    { name: 'January', value: '01' }, { name: 'February', value: '02' }, { name: 'March', value: '03' },
    { name: 'April', value: '04' }, { name: 'May', value: '05' }, { name: 'June', value: '06' },
    { name: 'July', value: '07' }, { name: 'August', value: '08' }, { name: 'September', value: '09' },
    { name: 'October', value: '10' }, { name: 'November', value: '11' }, { name: 'December', value: '12' }
  ];
  years: string[] = [];
  sources: string[] = [];
  locations: string[] = [];

  // Selected filters
  selectedMonth = '';
  selectedYear = '';
  selectedSource = '';
  selectedLocation = '';

  // Chart data
  sourceDistributionData!: ChartData<'pie'>;
  monthlyTrendData!: ChartData<'line'>;
  locationWiseData!: ChartData<'bar'>;

  chartOptions: ChartOptions<'pie' | 'line' | 'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: false }
    }
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Consumption[]>('data.json').subscribe(res => {
      this.data = res;
      this.generateFilterOptions();
      this.applyFilters();
    });
  }

  generateFilterOptions() {
    this.years = [...new Set(this.data.map(d => new Date(d.date).getFullYear().toString()))];
    this.sources = [...new Set(this.data.map(d => d.source))];
    this.locations = [...new Set(this.data.map(d => d.location))];
  }

  applyFilters() {
    this.filteredData = this.data.filter(d => {
      const matchesMonth = this.selectedMonth ? d.date.slice(5, 7) === this.selectedMonth : true;
      const matchesYear = this.selectedYear ? d.date.slice(0, 4) === this.selectedYear : true;
      const matchesSource = this.selectedSource ? d.source === this.selectedSource : true;
      const matchesLocation = this.selectedLocation ? d.location === this.selectedLocation : true;
      return matchesMonth && matchesYear && matchesSource && matchesLocation;
    });

    this.prepareCharts();
  }

  prepareCharts() {
    this.sourceDistributionData = this.getSourceDistribution();
    this.monthlyTrendData = this.getMonthlyConsumption();
    this.locationWiseData = this.getLocationWiseData();
  }

  getSourceDistribution(): ChartData<'pie'> {
    const grouped = this.filteredData.reduce((acc, item) => {
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
    const grouped = this.filteredData.reduce((acc, item) => {
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
        fill: false
      }]
    };
  }

  getLocationWiseData(): ChartData<'bar'> {
    const grouped = this.filteredData.reduce((acc, item) => {
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

  resetFilters() {
  this.selectedMonth = '';
  this.selectedYear = '';
  this.selectedSource = '';
  this.selectedLocation = '';
  this.applyFilters();
}

}
