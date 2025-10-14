import { Component, ViewEncapsulation, ViewChild, HostListener } from '@angular/core';
import { OFormComponent, OGridComponent } from 'ontimize-web-ngx';
import { SpacesFilterService } from '../../../shared/services/spaces-filter.service';

@Component({
  selector: 'form-detail',
  templateUrl: './form-detail.component.html',
  styleUrls: ['./form-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormDetailComponent {

  @ViewChild('oForm') form!: OFormComponent;
  @ViewChild('grid') grid!: OGridComponent;
  private screenWidth = window.innerWidth;

  public formLabel: string;

  constructor(private spacesFilter: SpacesFilterService) { }

  ngAfterViewInit(): void {
    this.changeColsGrid();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.screenWidth = window.innerWidth;
    this.changeColsGrid();
  }

  public onFormDataLoaded(data: any): void {
    this.formLabel = data.name;
    Promise.resolve().then(() => this.loadSpaces('cabin'));
  }

  public onFilterChange(event: any) {
    const val = event?.value ?? event ?? 'all';
    this.loadSpaces(val);
  }

  private loadSpaces(type: string) {
    const hotelId = this.form.getUrlParam('id');
    const kv = this.spacesFilter.buildKv(hotelId, type);
    this.grid.queryData(kv);
  }

  private changeColsGrid(): void {
    if (this.screenWidth >= 1920) {
      this.grid.cols = 3;
      this.grid.queryRows = 3;
      this.grid.reloadData();
    } else {
      this.grid.cols = 2;
      this.grid.queryRows = 2;
      this.grid.reloadData();
    }
  }
}
