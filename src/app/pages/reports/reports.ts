import { Component, NgModule, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Navbar } from '../../shared/navbar/navbar';
import { routes } from '../../app.routes';

interface ReportEntry {
  id: number;
  amount: number;
  date: string;
  source: string;
  location: string;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, RouterModule, Navbar],
  templateUrl: './reports.html',
  styleUrls: ['./reports.css']
})

export class ReportComponent implements OnInit {
  reports: ReportEntry[] = [];

  constructor(private http: HttpClient,private router: Router) { 
        console.log('ReportComponent loaded!');

    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' ? true : false;
    if(!this.isLoggedIn){
      this.router.navigate(['/login']);
    }
    
  }
  isLoggedIn = false;
  
  ngOnInit(): void {
    this.isLoggedIn= localStorage.getItem('isLoggedIn') === 'true'? true : false;
    if(!this.isLoggedIn){
      this.router.navigate(['/login']);
    }
    this.http.get<ReportEntry[]>('/data.json').subscribe(data => {
      this.reports = data;
    });
  }
}
