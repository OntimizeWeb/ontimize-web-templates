import { Component, ViewEncapsulation, ViewChild, HostListener, ChangeDetectorRef } from '@angular/core';
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
  public gridCols: number;

  constructor(private spacesFilter: SpacesFilterService, private cdr: ChangeDetectorRef) {
    this.spacesFilter.setType('cabin');
    if (this.screenWidth >= 1920) {
      this.gridCols = 3;
    } else {
      this.gridCols = 2;
    }
  }

  @HostListener('window:resize', [])
  onResize() {
    let auxCols = this.gridCols;
    this.screenWidth = window.innerWidth;

    this.changeColsGrid();

    if (auxCols !== this.gridCols) {
      this.cdr.detectChanges();
      this.grid.reloadData();
    }
  }

  public onFormDataLoaded(data: any): void {
    this.formLabel = data.name;
  }

  public onFilterChange(event: any) {
    const val = event?.value ?? event ?? 'all';
    this.loadSpaces(val);
  }

  private loadSpaces(type: string) {
    this.spacesFilter.setType(type);
    this.grid.reloadData();
  }

  private changeColsGrid(): void {
    if (this.screenWidth >= 1920) {
      this.gridCols = 3;
    } else {
      this.gridCols = 2;
    }
  }
}
