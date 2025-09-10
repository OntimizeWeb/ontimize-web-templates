import { Component, Injector, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Expression, FilterExpressionUtils, OFilterBuilderComponent, OntimizeService, OTableButtonComponent, OTableComponent } from 'ontimize-web-ngx';
import { forkJoin } from 'rxjs';

interface Type {
  id: number;
  label: string;
  icon: string;
  count: number;
}

@Component({
  selector: 'app-table-home',
  templateUrl: './table-home.component.html',
  styleUrls: ['./table-home.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class TableHomeComponent implements OnInit {

  @ViewChild('table', { static: false }) table: OTableComponent;
  @ViewChild('filterBuilder', { static: false }) filterBuilder: OFilterBuilderComponent;
  @ViewChild('filterButton', { static: false }) filterButton: OTableButtonComponent;

  public selectedType = 0;
  types: Type[] = [];
  private service: OntimizeService;
  public filtersOpen = false;

  private iconMap: Record<number, string> = {
    1: 'ontimize:normal',
    2: 'ontimize:VIP',
    3: 'ontimize:other'
  };

  constructor(protected injector: Injector) {
    this.service = this.injector.get(OntimizeService);
  }

  ngOnInit() {
    this.configureService();

    const dataTypes = this.service.query({}, ["CUSTOMERTYPEID", "DESCRIPTION"], "customerType");

    const dataCustomers = this.service.query({}, ['CUSTOMERTYPEID'], 'customer');

    forkJoin({ cusTypes: dataTypes, customers: dataCustomers }).subscribe(({ cusTypes, customers }) => {
      const counts: Record<number, number> = {};
      customers.data.forEach((row: any) => {
        const id = row.CUSTOMERTYPEID;
        counts[id] = (counts[id] ?? 0) + 1;
      });

      this.types = cusTypes.data.map((t: any) => ({
        id: t.CUSTOMERTYPEID,
        label: t.DESCRIPTION,
        icon: this.iconMap[t.CUSTOMERTYPEID] ?? 'ontimize:unknown',
        count: counts[t.CUSTOMERTYPEID] ?? 0
      }));

      this.types.push({
        id: 0,
        label: 'ALL',
        icon: 'ontimize:all',
        count: customers.data.length
      });
    });
  }

  ngAfterViewInit() {
    this.filterButton.onClick.subscribe(event => {
      this.filtersOpen = !this.filtersOpen;
    })
  }

  protected configureService() {
    // Configure the service using the configuration defined in the `app.services.config.ts` file
    const conf = this.service.getDefaultServiceConfiguration('customers');
    this.service.configureService(conf);
  }

  onSelect(id: number) {
    this.selectedType = id;
    this.filterBuilder?.triggerReload();
  }

  trackById(index: number, item: { id: number }) {
    return item.id;
  }

  createFilter = (values: Array<{ attr, value }>): Expression => {
    let filters: Array<Expression> = [];
    if (this.selectedType !== 0) {
      filters.push(FilterExpressionUtils.buildExpressionEquals("CUSTOMERTYPEID", this.selectedType));
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
