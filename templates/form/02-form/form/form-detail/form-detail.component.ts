import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'form-detail',
  templateUrl: './form-detail.component.html',
  styleUrls: ['./form-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormDetailComponent {

  public formLabel: string;
  public filter = 'cabins';

  public onFormDataLoaded(data: any): void {
    this.formLabel = data.name;
  }

  public onFilterChange(value: string) {
    this.filter = value;
  }

}
