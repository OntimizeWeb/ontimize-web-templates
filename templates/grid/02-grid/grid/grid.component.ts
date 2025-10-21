import { ChangeDetectorRef, Component, HostListener, ViewChild, ViewEncapsulation } from '@angular/core';
import { Expression, FilterExpressionUtils, OCurrencyInputComponent, OFilterBuilderComponent, OFormComponent, OGridComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GridComponent {

  @ViewChild('grid', { static: true }) grid: OGridComponent;
  @ViewChild("filterForm") protected filterForm: OFormComponent;
  @ViewChild("filterBuilder") protected filterBuilder: OFilterBuilderComponent;
  public gridCols: number;
  private screenWidth = window.innerWidth;

  constructor(private cdr: ChangeDetectorRef) {
    this.changeColsGrid();
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
  private changeColsGrid(): void {
    if (this.screenWidth >= 1920) {
      this.gridCols = 4;
    } else {
      this.gridCols = 2;
    }
  }

  createFilter(values: Array<{ attr: string, value: any }>): Expression {
    let filters: Array<Expression> = [];

    values.forEach(fil => {
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
}