import { Component, Injector, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Expression, FilterExpressionUtils, OFilterBuilderComponent, OGridComponent } from 'ontimize-web-ngx';
import { DummyService } from '../../../shared/dummy.service';

@Component({
  selector: 'grid-home',
  templateUrl: './grid-home.component.html',
  styleUrls: ['./grid-home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GridHomeComponent implements OnInit {

  @ViewChild('filterBuilder', { static: true })
  filterBuilder: OFilterBuilderComponent;

  public service: DummyService;
  private employeeTypes = [{
    NAME: "",
    ID: ""
  }];

  constructor(
    protected dialog: MatDialog,
    protected sanitizer: DomSanitizer,
    protected injector: Injector
  ) {
    this.service = this.injector.get(DummyService);
  }

  ngOnInit(): void {
    this.configureService();
    this.service.query({}, [], "employeeTypes").subscribe(v => {
      this.employeeTypes = v.data;
    });
  }

  public getEmployeeTypeName(id) {
    return this.employeeTypes.find(empType => {
      return empType.ID === id;
    })?.NAME;
  }

  private configureService() {
    const conf = this.service.getDefaultServiceConfiguration('DummyService');
    this.service.configureService(conf);
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
