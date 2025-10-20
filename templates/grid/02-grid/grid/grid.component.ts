import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Expression, FilterExpressionUtils, OCurrencyInputComponent, OFilterBuilderComponent, OFormComponent, OGridComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GridComponent {

  @ViewChild('grid', { static: true }) grid: OGridComponent;
  @ViewChild("minPrice") protected minPrice: OCurrencyInputComponent;
  @ViewChild("maxPrice") protected maxPrice: OCurrencyInputComponent;
  @ViewChild("filterForm") protected filterForm: OFormComponent;
  @ViewChild("filterBuilder") protected filterBuilder: OFilterBuilderComponent;

  onCurrencyInputChange() {
    const minValue = this.minPrice.getValue();
    const maxValue = this.maxPrice.getValue();

    if (minValue === "" || minValue === "0.00") {
      this.minPrice.clearValue();
    }
    if (maxValue === "" || maxValue === "0.00") {
      this.maxPrice.clearValue();
    }
  }

  createFilter(values: Array<{ attr: string, value: any }>): Expression {
    console.log(values);
    let filters: Array<Expression> = [];

    values.forEach(fil => {
      console.log(fil);
      if (fil.value) {
        if (fil.attr === 'name') {
          let keyword = fil.value;
          filters.push(FilterExpressionUtils.buildExpressionLike("name", `%${keyword}%`));
        }
        if (fil.attr === 'duration') {
          filters.push(FilterExpressionUtils.buildExpressionEquals("duration", fil.value));
        }
        if (fil.attr === 'price_min') {
          let value: number = Number(fil.value);
          filters.push(FilterExpressionUtils.buildExpressionMoreEqual("price", value));
        }
        if (fil.attr === 'price_max') {
          let value: number = Number(fil.value);
          filters.push(FilterExpressionUtils.buildExpressionLessEqual("price", value));
        }
        if (fil.attr === 'people') {
          filters.push(FilterExpressionUtils.buildExpressionEquals("people", fil.value));
        }
        if (fil.attr === 'location') {
          filters.push(FilterExpressionUtils.buildExpressionEquals("location", fil.value));
        }
        if (fil.attr === 'dateBegin') {
          filters.push(FilterExpressionUtils.buildExpressionEquals("dateBegin", fil.value));
        }

      }
    });

    if (filters.length > 0) {
      return filters.reduce((exp1, exp2) =>
        FilterExpressionUtils.buildComplexExpression(exp1, exp2, 'AND')
      );
    } else {
      return null;
    }
  }

  clearFilter() {
    const fieldsToClear = ['name', 'days', 'price_min', 'price_max', 'participants', 'city', 'date_begin'];
    this.filterBuilder.clearFilter();
    this.filterForm.clearFieldValues(fieldsToClear);
  }
}