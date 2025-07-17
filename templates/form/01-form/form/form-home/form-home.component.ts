import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { OFormComponent } from 'ontimize-web-ngx';
import { DomSanitizer } from '@angular/platform-browser';

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
  public photo: any;
  public show: boolean;
  public icon: string;

  constructor(protected sanitizer: DomSanitizer) {
    this.icon = "keyboard_arrow_up";
    this.show = true;
  }

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

    if (data.PHOTO) {
      this.photo = data.PHOTO;
    }
  }


  public getImageSrc(base64: any): any {
    return base64 ? this.sanitizer.bypassSecurityTrustResourceUrl('data:image/*;base64,' + base64.bytes) : './assets/images/no-image.png';
  }

}
