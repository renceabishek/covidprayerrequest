import { Component, OnInit } from '@angular/core';
import { Request } from '../model/Request';
import { DataService } from '../service/data.service';
import AOS from 'aos';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  requests: Request[] = []
  totalrequest: any;

  constructor(private dataService:DataService) {
   
   }

  ngOnInit(): void {
    AOS.init();
    
    this.dataService.fetchPrayerRequests().subscribe(data=> {
      this.requests =  data
      this.totalrequest = data.length
    })
  }

}
