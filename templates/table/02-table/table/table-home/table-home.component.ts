import {Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Expression, FilterExpressionUtils, OFilterBuilderComponent, OListPickerComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'app-table-home',
  templateUrl: './table-home.component.html',
  styleUrls: ['./table-home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableHomeComponent {

  @ViewChild('filterBuilder', { static: true }) filter: OFilterBuilderComponent;
  @ViewChild('listPicker', { static: true }) listPicker: OListPickerComponent;

  type = 0;

  changeValue(val: number) {
    this.listPicker.setValue(val);
    this.type = val;
  }

  createFilter(values: Array<{ attr, value }>): Expression {
    // Prepare simple expressions from the filter components values
    let filters: Array<Expression> = [];
    values.forEach(fil => {
      if (fil.value) {
        if (fil.attr === 'CUSTOMERTYPEID') {
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
