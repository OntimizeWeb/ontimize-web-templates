import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Expression, FilterExpressionUtils, OFilterBuilderComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'grid-home',
  templateUrl: './grid-home.component.html',
  styleUrls: ['./grid-home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GridHomeComponent {

  @ViewChild('filterBuilder', { static: true })
  filterBuilder: OFilterBuilderComponent;

  constructor(
    protected dialog: MatDialog,
    protected sanitizer: DomSanitizer
  ) { }

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

}
