## How to use

<br/>

1. Download and put `form` folder in src/app/main/, `i18n` and `images` into assets/ folder and `pipes`, `services` and `custom-card` in src/app/shared.

<br/>

<pre>
─src
    ├───app
    |   ├───main
    |   |   └───form
    |   ├───shared
    |   |   └───pipes
    |   |   └───services
    |   |   └───custom-card
    |   |
    |   ├─── ...
    │   │
    ├───assets
    │   ├───css
    │   ├───i18n
    |   │   ├───en.json
    |   │   └───es.json
    │   └───images
    │
    └───..

</pre>

<br/>

2. Configure the `o-grid` modifying the values for the inputs `service-type`, `entity`,`keys`, `parent-keys`, `columns` and `quick-filter-columns`. See section 10 for details. For more information consult the following url <https://ontimizeweb.github.io/docs/v15/components/data/grid/overview>.

  - Via <o-grid> inputs ``query-on-bind="true"`` and ``query-on-init="false"`` we ensure the first grid query is triggered only after the form data is ready. For more information about it click [here](https://ontimizeweb.github.io/docs/v15/components/service/service-base/overview#binding-to-local-data)

<br/>

3. Add the translations you want to use on your app ​​to the `en.json` and `es.json` files of your project

<br/>

4. Configure routing in `main-routing.module.ts`

<br/>

```js
import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  ...
  { path: 'form', loadChildren: () => import('./form/form.module').then(m => m.FormModule) }
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

5. To configure the theme on the form component it is necessary to include `form.theme.scss` in `app.scss`

<br/>

```scss
@use 'theme.scss' as theme;
@use 'ontimize-web-ngx/theming/ontimize-style.scss';
...
@include ontimize-style.ontimize-theme-styles(theme.$theme);

+ @import '../../app/main/form/form.theme.scss';


@mixin app-themes($theme) {
...
+ @include form-theme($theme);
...
}

...

```

</br>

6. In order to have exactly the same layout as the template, we recommend that you configure the following in the app.module.ts file

<br/>

```js
export const customProviders: any = [
  { provide: O_MAT_ERROR_OPTIONS, useValue: { type: 'lite' } },
  ...
];
```

<br/>

7. Configure the pipe and custom-card component in your `shared.module.ts` adding the next lines.

<br/>

```js
...
+ import { SplitSchedulePipe } from './pipes/split-schedule.pipe';
+ import { CustomCardComponent } from './custom-card/custom-card.component';
...

@NgModule({
  ...
  declarations: [
    ...
   + SplitSchedulePipe,
   + CustomCardComponent
  ],
  exports: [
    ...
   + SplitSchedulePipe,
   + CustomCardComponent
  ],
})
export class SharedModule { }
```

<br/>

8. In order to use `class="material-icons-outlined"` on mat-icon elements, you should add the next line on your `index.html`

<br/>

```html
<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>Your app</title>

  ...
  + <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined">
  ...

</head>

<body>
 ...
</body>

</html>

```

<br/>

9. For using a custom ontimize service and use it in `o-form` and `o-grid` with the input `service-type`, you must follow this steps:

- Register your custom service in your feature module. In this case, in `form.module.ts`.

```js
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormDetailComponent } from './form-detail/form-detail.component';
import { OntimizeWebModule } from 'ontimize-web-ngx';
+ import { HotelService } from '../../shared/services/hotel.service.ts';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    FormDetailComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormRoutingModule,
    OntimizeWebModule
  ],
  + providers: [{ provide: 'hotels', useValue: HotelService }]
})
export class FormModule { }
```

  <br/>

- Create a service that extends OntimizeEEService and overrides query(...) to return data from in-memory arrays. You can see an example in `hotel.service.ts`. For more infomation about custom services in Ontimize click [here](https://ontimizeweb.github.io/docs/v15/guide/service/).

<br/>

10. In this case, we filter ``spaces`` by overriding the Ontimize query rather than using ``parent-keys``. The data service injects the current type into kv just before the query is executed.

- `spaces-filter.service.ts`: Data-sharing service that stores the type:``{ `all | cabin | common` }``we want to use to filter the query.

- `hotel.service.ts` (Ontimize data service)

  - query(..., entity='spaces'): Merges cabins + commons, always filters by `hotelId`, and only filters by `type` when present and not 'all'. Read `type` from `SpacesFilterService.getType()` and inject it into `kv`.

  ```js
  kv = { ...kv, type: this.spacesFilter.getType() };
  ```

<br/>

11. We bind the grid’s column count to a component property and update it on window resize. The <o-grid> receives ``[cols]="gridCols"`` and ``[query-rows]="gridCols``, and the component adjusts gridCols based on window.innerWidth (e.g., 3 columns for ≥1920px, otherwise 2). We only call grid.reloadData() if the computed column count actually changes, avoiding unnecessary requests.

<br/>

## LEARN MORE

- **Dark and light mode** <https://ontimizeweb.github.io/docs/v15/customize/theming/#dark-and-light-primary-variants>

- **OTranslateService** <https://ontimizeweb.github.io/docs/v15/guide/otranslateservice/overview>

- **Services** <https://ontimizeweb.github.io/docs/v15/guide/service/>

- **Form component** <https://ontimizeweb.github.io/docs/v15/components/data/form/overview>

- **Grid component** <https://ontimizeweb.github.io/docs/v15/components/data/grid/overview>

- **Ontimize SCSS surface classes** <https://ontimizeweb.github.io/docs/v15/customize/style-guide/#surfaces>
