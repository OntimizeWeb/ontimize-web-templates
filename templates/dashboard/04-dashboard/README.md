## How to use

<br/>

1. Download and put `dashboard/` into `src/app/main/`, `assets/i18n/` into your project `assets/` and, `shared/interfaces` and `shared/pipes` into `src/app/shared/`

<br/>

```
src
├── app
│   ├── main
│   │   └── dashboard
│   │       ├── dashboard.component.html
│   │       ├── dashboard.component.scss
│   │       ├── dashboard.component.ts
│   │       ├── dashboard.module.ts
│   │       ├── dashboard-routing.module.ts
│   │       └── dashboard-theme.scss
│   └── shared
│       ├── interfaces
│       │   └── factories.interface.ts
│       └── pipes
│           └── short-number.pipe.ts
└── assets
    └── i18n
        ├── en.json
        └── es.json
```

<br/>

2. In order to have exactly the same layout as the template, we recommend that you configure the following in the app.module.ts file.

<br/>

```js
export const customProviders: any = [
  { provide: O_MAT_ERROR_OPTIONS, useValue: { type: 'lite' } },
  ...
];
```

<br/>

3. Add the translations you want to use on your app ​​to the `en.json` and `es.json` files of your project.
  - Keys for countries/factories/models/categories follow this convention:
    - `name.replace(/ /g, '_').toUpperCase()` → `"Factory Spain 1"` becomes `FACTORY_SPAIN_1`.
  - Chart titles and combo labels also use i18n keys via **OTranslateService** and/or `oTranslate` pipe.

<br/>

4. Configure routing in `main-routing.module.ts`

<br/>

```js
import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  ...
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) }
];

const opt: ExtraOptions = {
  enableTracing: false
  // true if you want to print navigation routes
};

@NgModule({
  imports: [RouterModule.forRoot(routes, opt)],
  exports: [RouterModule],
  providers: []
})
export class MainRoutingModule { }
```

<br/>

5. Configure the pipe in your `shared.module.ts` adding the next lines.

<br/>

```js
...
+ import { ShortNumberPipe } from './pipes/short-number.pipe';
...

@NgModule({
  ...
  declarations: [
    ...
    ShortNumberPipe
  ],
  exports: [
    ...
    ShortNumberPipe
  ]
})
export class SharedModule { }
```

<br/>

6. The filters are **cascaded**: **Country → Factory → Model**. Options are translated (`displayName`) while the underlying value (`name`) is used for filtering. These are configured at `dashboard.component.ts` using `@ViewChild` to push data into combos with `setDataArray(...)`. Each option has `{ id, name, displayName }` where `displayName` is translated.

<br/>

```html
<o-form show-header="no">
  <div fxLayout="row" fxLayoutGap="24px" fxLayoutAlign="space-between">
    <o-combo #comboCountry attr="comboCountry" label="{{ 'SELECT_COUNTRY' | oTranslate }}"
      [static-data]="countries"
      value-column="name" visible-columns="displayName" keys="name"
      (onValueChange)="onCountryChange($event.newValue)">
    </o-combo>

    <o-combo #comboFactory attr="comboFactory" label="{{ 'SELECT_FACTORY' | oTranslate }}"
      [static-data]="factoriesFiltered"
      value-column="name" visible-columns="displayName" keys="name"
      (onValueChange)="onFactoryChange($event.newValue)">
    </o-combo>

    <o-combo #comboModel attr="comboModel" label="{{ 'SELECT_MODEL' | oTranslate }}"
      [static-data]="modelsFiltered"
      value-column="name" visible-columns="displayName" keys="name"
      (onValueChange)="onModelChange($event.newValue)">
    </o-combo>
  </div>
</o-form>
```

<br/>

```ts
@ViewChild('comboCountry', { static: true }) comboCountry!: OComboComponent;
@ViewChild('comboFactory', { static: true }) comboFactory!: OComboComponent;
@ViewChild('comboModel', { static: true }) comboModel!: OComboComponent;

countries = [];           // [{ id, name, displayName }]
factoriesFiltered = [];   // idem
modelsFiltered = [];      // idem

selectedCountry?: string;
selectedFactory?: string;
selectedModel?: string;

private initFilters(): void {
  const uniqueCountries = Array.from(new Set(this.factories.map(f => f.country)));
  this.countries = uniqueCountries.map((country, index) => ({
    id: index + 1,
    name: country,
    displayName: this.translate.get(country.toUpperCase())
  }));

  // Optional: initially disable dependent combos
  this.comboFactory.enabled = false;
  this.comboModel.enabled = false;
}

onCountryChange(country: string): void {
  this.selectedCountry = country;

  this.factoriesFiltered = this.factories
    .filter(f => f.country === country)
    .map(f => ({
      id: f.id,
      name: f.name,
      displayName: this.translate.get(f.name.replace(/ /g, '_').toUpperCase())
    }));

  this.comboFactory.setDataArray(this.factoriesFiltered);
  this.comboFactory.enabled = true;
  this.comboFactory.clearValue();

  this.modelsFiltered = [];
  this.comboModel.setDataArray([]);
  this.comboModel.enabled = false;
  this.comboModel.clearValue();

  this.updateAllCharts();
}

onFactoryChange(factoryName: string): void {
  this.selectedFactory = factoryName;
  const factory = this.factories.find(f => f.name === factoryName);

  this.modelsFiltered = (factory?.models || []).map((m, i) => ({
    id: i + 1,
    name: m.name,
    displayName: this.translate.get(m.name.replace(/ /g, '_').toUpperCase())
  }));

  this.comboModel.setDataArray(this.modelsFiltered);
  this.comboModel.enabled = true;
  this.comboModel.clearValue();

  this.updateAllCharts();
}

onModelChange(model: string): void {
  this.selectedModel = model;
  this.updateAllCharts();
}
```

<br/>

7. These filters are used for filtering data for charts in this way.

<br/>

```ts
private updateAllCharts(): void {
  let filteredFactories = this.factories;

  if (this.selectedCountry) {
    filteredFactories = filteredFactories.filter(f => f.country === this.selectedCountry);
  }
  if (this.selectedFactory) {
    filteredFactories = filteredFactories.filter(f => f.name === this.selectedFactory);
  }
  if (this.selectedModel) {
    filteredFactories = filteredFactories.map(f => ({
      ...f,
      models: f.models.filter(m => m.name === this.selectedModel)
    }));
  }

  this.buildLineData(filteredFactories);
  this.buildBarData(filteredFactories);
  this.buildMultiBarHorizontalData(filteredFactories);
  this.buildPieData(filteredFactories);
  this.buildDonutData(filteredFactories);
  this.buildStackedAreaData(filteredFactories);
}
```

<br/>

8. The HTML contains the chart components with dynamic titles (getters) and reactive data bindings.

<br/>

```html
<!-- Line -->
<span class="card-title"><strong>{{ lineChartTitle }}</strong></span>
<o-chart type="line" [data]="lineData" [color]="colorScheme"
  show-tooltip="true" show-x-axis-label="true" show-y-axis-label="false"
  show-grid-lines="true" chart-height="170" chart-width="360">
</o-chart>

<!-- Discrete Bar -->
<span class="card-title"><strong>{{ barChartTitle }}</strong></span>
<o-chart type="discreteBar" [data]="barData" [color]="colorScheme"
  [chart-parameters]="barParams" show-tooltip="true">
</o-chart>

<!-- Pie -->
<span class="card-title"><strong>{{ pieChartTitle }}</strong></span>
<o-chart type="pie" [data]="pieData" [color]="colorScheme"
  [chart-parameters]="pieParams">
</o-chart>

<!-- Donut -->
<span class="card-title"><strong>{{ donutChartTitle }}</strong></span>
<o-chart type="donutChart" [data]="donutData" [color]="colorScheme"
  [chart-parameters]="donutParams">
</o-chart>

<!-- MultiBar Horizontal -->
<span class="card-title"><strong>{{ multiBarHorizontalChartTitle }}</strong></span>
<o-chart type="multiBarHorizontalChart" [data]="multiBarHorizontalData" [color]="colorScheme"
  [chart-parameters]="horizontalBarParams">
</o-chart>

<!-- Stacked Area -->
<span class="card-title"><strong>{{ stackedAreaChartTitle }}</strong></span>
<o-chart type="stackedAreaChart" [data]="stackedAreaData" [color]="colorScheme"
  [chart-parameters]="stackParams">
</o-chart>
```

<br/>

9. In `configureCharts()` you can adjust size, legend, labels, tooltip behavior, etc.:

<br/>

```ts
this.colorScheme = { domain: ['#1464a5', '#eeeeee', '#c5c5c5', 'rgba(20, 100, 165, 0.3)'] };

this.barParams = new DiscreteBarChartConfiguration();
this.barParams.height = 150;
this.barParams.width = 370;
this.barParams.showTooltip = true;
this.barParams.showValues = false;

this.pieParams = new PieChartConfiguration();
this.pieParams.showLabels = true;
this.pieParams.height = 140;
this.pieParams.width = 250;

this.horizontalBarParams = new MultiBarHorizontalChartConfiguration();
this.horizontalBarParams.showTooltip = true;
this.horizontalBarParams.height = 150;
this.horizontalBarParams.width = 370;

this.stackParams = new StackedAreaChartConfiguration();
this.stackParams.height = 200;
this.stackParams.width = 400;
this.stackParams.showLegend = true;
this.stackParams.legend.rightAlign = false;

this.donutParams = new DonutChartConfiguration();
this.donutParams.height = 150;
this.donutParams.width = 150;
this.donutParams.showLabels = true;
this.donutParams.showTooltip = true;
```

<br/>

10. What each dataset represents:

- **Line (`lineData`)**: yearly evolution for the current filter scope. Also exposes `totalUnitsLineChart` (sum of all years).
- **Discrete Bar (`barData`)**:
  - No filter / by country → bars per **factory** (total units).
  - By factory → bars per **model**.
  - By model → bars per **year**.
  - Exposes `barDominantPercentage` = `largestValue / total`.
- **MultiBar Horizontal (`multiBarHorizontalData`)**:
  - No filter → bars per **country**.
  - By country → bars per **factory**.
  - By factory → bars per **model**.
  - By model → bars per **year**.
  - Exposes `multiBarMaxItem` and `multiBarDominantPercentage`.
- **Pie (`pieData`)**:
  - No filter → distribution by **region** (Europe/Asia/America).
  - By country → distribution by **category**.
  - By factory → distribution by **model**.
  - By model → distribution by **year**.
- **Donut (`donutData`)**:
  - No filter → distribution by **country**.
  - By country → distribution by **engine type** (Electric/Hybrid/Diesel/Petrol).
  - By factory → distribution by **category**.
  - By model → distribution by **year**.
- **Stacked Area (`stackedAreaData`)**:
  - No filter → evolution by **engine type**.
  - By country → evolution by **category**.
  - By factory → evolution by **model**.
  - By model → evolution of **that model**.

All labels are translated via **OTranslateService** when building the datasets.

<br/>

11. To configure the theme on the dashboard component it is necessary to include `dashboard.theme.scss` in `app.scss`

<br/>

```scss
@use 'theme.scss' as theme;
@use 'ontimize-web-ngx/theming/ontimize-style.scss';
...
@include ontimize-style.ontimize-theme-styles(theme.$theme);

+ @import '../../app/main/dashboard/dashboard.theme.scss';


@mixin app-themes($theme) {
...
+ @include dashboard-theme($theme);
...
}

...

```

</br>

## LEARN MORE

- **Dark and light mode** <https://ontimizeweb.github.io/docs/v15/customize/theming/#dark-and-light-primary-variants>

- **OTranslateService** <https://ontimizeweb.github.io/docs/v15/guide/otranslateservice/overview>

- **Ontimize SCSS surface classes** <https://ontimizeweb.github.io/docs/v15/customize/style-guide/#surfaces>

- **Charts** <https://ontimizeweb.github.io/docs/v15/addons/charts/>

- **Charts examples** <https://ontimize-web-ngx-demos.ontimize.com/v15/charts/main/home>

- **OComboComponent** <https://ontimizeweb.github.io/docs/v15/components/input/combo/overview>
