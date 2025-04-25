import { Component, Injector, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Expression, FilterExpressionUtils, OntimizeService, OTableComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'app-table-home',
  templateUrl: './table-home.component.html',
  styleUrls: ['./table-home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableHomeComponent implements OnInit {

  @ViewChild('table', { static: false }) table: OTableComponent;

  public normalCount = 0;
  public vipCount = 0;
  public otherCount = 0;
  public totalCount = 0;
  public type = 0;
  private service: OntimizeService;

  constructor(protected injector: Injector) {
    this.service = this.injector.get(OntimizeService);
  }

  ngOnInit() {
    this.configureService();
    this.service.query({}, ["CUSTOMERTYPEID"], "customer").subscribe(q => {
      q.data.forEach(element => {
        this.totalCount++;
        if (element.CUSTOMERTYPEID === 1) {
          this.normalCount++;
        } else if (element.CUSTOMERTYPEID === 2) {
          this.vipCount++;
        } else if (element.CUSTOMERTYPEID === 3) {
          this.otherCount++;
        }
      });
    });
  }

  protected configureService() {
    // Configure the service using the configuration defined in the `app.services.config.ts` file
    const conf = this.service.getDefaultServiceConfiguration('customers');
    this.service.configureService(conf);
  }

  createFilter = (values: Array<{ attr, value }>): Expression => {
    const type = this.type;
    let filters: Array<Expression> = [];
    if (type !== 0) {
      filters.push(FilterExpressionUtils.buildExpressionEquals("CUSTOMERTYPEID", type));
    }

    values.forEach(fil => {
      if (fil.value) {
        if (fil.attr === 'NAME' || fil.attr === 'SURNAME' || fil.attr === 'EMAIL') {
          filters.push(FilterExpressionUtils.buildExpressionLike(fil.attr, fil.value));
        }
      }
    });

    return filters.length > 0
      ? filters.reduce((exp1, exp2) =>
        FilterExpressionUtils.buildComplexExpression(exp1, exp2, FilterExpressionUtils.OP_AND))
      : null;
  }
}
