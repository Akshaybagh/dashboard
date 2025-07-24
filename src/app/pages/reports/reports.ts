import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Navbar } from '../../shared/navbar/navbar';

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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<ReportEntry[]>('/data.json').subscribe(data => {
      this.reports = data;
    });
  }
}
