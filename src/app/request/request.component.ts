import { Component, OnInit } from '@angular/core';
import { Request } from '../model/Request';
import { DataService } from '../service/data.service';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  invalidLogin = false
  loading = false;
  model: any = {}
  requests: Request = null;

  constructor(private dataService: DataService,public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  submitRequests() {
    this.invalidLogin = false;
    this.loading = true;

    this.requests = {
      _for: this.model.for,
      description: this.model.description,
      by: this.model.by,
      date: new Date().toString()
    }

    this.dataService.createPrayerRequest(this.requests)
      .subscribe(data => {
        this.invalidLogin = false;
        this.loading = false;
        this.clearfields()
        this.successSnackBar("Prayer Request updated successfully !");
      }, err => {
        this.loading = false;
        this.invalidLogin = true;
        alert("contact abishek")
      })

  }

  clearfields() {
    this.model.for = ""
    this.model.description = ""
    this.model.by = ""
    this.model.date = ""
  }

  checkLoginDis(): boolean {
    return this.model.for == null || this.model.description == null || this.model.by == null
  }

  goBack() {
    window.history.back();
  }


  actionButtonLabel: string = 'Ok';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 3000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  addExtraClass: boolean = false;

  successSnackBar(message: string) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    config.panelClass = ['success-snapbar']
    this.snackBar.open(message, this.action ? this.actionButtonLabel : undefined, config);
  }

}
