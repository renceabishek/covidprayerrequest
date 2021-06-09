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
      var yesvalue:number = 0;
      data.forEach(f=> {
        if(f.status==='yes') {
          yesvalue=yesvalue+1
        }
      })

      this.totalrequest = "(Total no.of prayer requests : "+(data.length-yesvalue)+" Recovered: "+yesvalue+" )"
      this.spinner.hide();
    }, err=> {
      alert("Try Reload once again")
      this.spinner.hide();
    }
    )
  }

}
