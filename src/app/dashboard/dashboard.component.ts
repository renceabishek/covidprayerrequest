import { Component, OnInit } from '@angular/core';
import { Request } from '../model/Request';
import { DataService } from '../service/data.service';
import AOS from 'aos';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  requests: Request[] = []
  totalrequest: any;

  constructor(private dataService:DataService, private spinner: NgxSpinnerService) {
   
   }

  ngOnInit(): void {
    this.spinner.show();
    //AOS.init();
    
    this.dataService.fetchPrayerRequests().subscribe(data=> {
      this.requests =  data
      this.totalrequest = "(Total no.of prayer requests : "+data.length+" )"
      this.spinner.hide();
    }, err=> {
      alert("There is a problem, Inform to abishek!")
      this.spinner.hide();
    }
    )
  }

}
