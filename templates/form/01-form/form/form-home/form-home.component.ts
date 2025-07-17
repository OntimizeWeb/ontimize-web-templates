import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { OFormComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'form-home',
  templateUrl: './form-home.component.html',
  styleUrls: ['./form-home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormHomeComponent {

  @ViewChild('form') form: OFormComponent;

  public name: string;
  public surname: string;
  public address: string;
  public phone: number;
  public id: number;
  public show = true;
  public icon = "keyboard_arrow_up";

  showInfo(evt: any) {
    this.show = !this.show;
    if (this.show) {
      this.icon = "keyboard_arrow_up";
    } else {
      this.icon = "keyboard_arrow_down";
    }
  }

  onFormDataLoaded(data: any) {
    if (data.NAME) {
      this.name = data.NAME;
    }

    if (data.SURNAME) {
      this.surname = data.SURNAME;
    }

    if (data.ADDRESS) {
      this.address = data.ADDRESS;
    }

    if (data.PHONE) {
      this.phone = data.PHONE;
    }

    if (data.CUSTOMERID) {
      this.id = data.CUSTOMERID;
    }
  }

}
