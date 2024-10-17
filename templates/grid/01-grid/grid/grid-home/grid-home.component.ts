import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Expression, FilterExpressionUtils, OFilterBuilderComponent, OGridComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'grid-home',
  templateUrl: './grid-home.component.html',
  styleUrls: ['./grid-home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GridHomeComponent implements AfterViewInit {

  @ViewChild('filterBuilder', { static: true })
  filterBuilder: OFilterBuilderComponent;

  @ViewChild('grid', { static: true })
  grid: OGridComponent;

  public employeeType: string;

  constructor(
    protected dialog: MatDialog,
    protected sanitizer: DomSanitizer
  ) { }

  ngAfterViewInit(): void {
    this.grid.onDataLoaded.subscribe(data => {
      this.grid.getDataArray().forEach(e => {
        switch (e.EMPLOYEETYPEID) {
          case 6380:
            this.employeeType = 'Manager';
            break;
          case 6381:
            this.employeeType = 'Cashier';
            break;
          case 6382:
            this.employeeType = 'Secretariat';
            break;
          case 6383:
            this.employeeType = 'Support';
            break;
          case 6384:
            this.employeeType = 'Sanitation Department';
            break;
          case 6385:
            this.employeeType = 'Transportation department';
            break;
          case 6386:
            this.employeeType = 'Security';
            break;
          default:
            this.employeeType = '';
        }
      });
    });
  }

  public createFilter(values: Array<{ attr: string, value: any }>): Expression {
    // Prepare simple expressions from the filter components values
    const filters: Expression[] = [];
    values.forEach(fil => {
      if (fil.value) {
        if (fil.attr === 'EMPLOYEENAME' || fil.attr === 'EMPLOYEESURNAME' || fil.attr === 'EMPLOYEEEMAIL') {
          filters.push(FilterExpressionUtils.buildExpressionLike(fil.attr, fil.value));
        }
        if (fil.attr === 'EMPLOYEETYPEID' || fil.attr === 'OFFICEID') {
          filters.push(FilterExpressionUtils.buildExpressionEquals(fil.attr, fil.value));
        }
      }
    });

    // Build complex expression
    if (filters.length > 0) {
      return filters.reduce((exp1, exp2) => FilterExpressionUtils.buildComplexExpression(exp1, exp2, FilterExpressionUtils.OP_AND));
    } else {
      return null;
    }
  }

  public getImageSrc(base64: string): any {
    return base64 ? this.sanitizer.bypassSecurityTrustResourceUrl('data:image/*;base64,' + base64) : './assets/images/no-image-transparent.png';
  }

}
