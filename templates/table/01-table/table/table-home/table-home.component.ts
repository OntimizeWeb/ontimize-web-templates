import { Component, ViewEncapsulation } from '@angular/core';
import { Expression, FilterExpressionUtils } from 'ontimize-web-ngx';

@Component({
  selector: 'app-table-home',
  templateUrl: './table-home.component.html',
  styleUrls: ['./table-home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableHomeComponent {

  createFilter(values: Array<{ attr, value }>): Expression {
    // Prepare simple expressions from the filter components values
    let filters: Array<Expression> = [];
    values.forEach(fil => {
      if (fil.value) {
        if (fil.attr === 'NAME' || fil.attr === 'SURNAME' || fil.attr === 'EMAIL') {
          filters.push(FilterExpressionUtils.buildExpressionLike(fil.attr, fil.value));
        } else if (fil.attr === 'CUSTOMERTYPEID') {
          if (fil.value === 'Normal') {
            filters.push(FilterExpressionUtils.buildExpressionEquals(fil.attr, 1));
          } else if (fil.value === 'VIP') {
            filters.push(FilterExpressionUtils.buildExpressionEquals(fil.attr, 2));
          } else if (fil.value === 'Other') {
            filters.push(FilterExpressionUtils.buildExpressionEquals(fil.attr, 3));
          }
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
