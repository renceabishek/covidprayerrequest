import { Component, OnInit } from '@angular/core';
import { Request } from '../model/Request';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  requests: Request[] = []

  constructor(private dataService:DataService) {
   
   }

  ngOnInit(): void {
    
    this.dataService.fetchPrayerRequests().subscribe(data=> {
      this.requests =  data
    })
  }

}
