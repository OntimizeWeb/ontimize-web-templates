## How to use

<br/>

1. Download and put `form` folder in src/app/main/, `i18n` and `images` into assets/ folder and `pipes` and `services` in src/app/shared.

<br/>

<pre>
─src
    ├───app
    |   ├───main
    |   |   └───form
    |   ├───shared
    |   |   └───pipes
    |   |   └───services
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

2. Configure the `o-grid` modifying the values for the inputs `service-type`, `entity`, `columns` and `quick-filter-columns`. We don’t use `parent-keys` here. Instead, a dedicated service builds the kv and filters the data displayed by `o-grid`. See section 10 for details. For more information consult the following url <https://ontimizeweb.github.io/docs/v15/components/data/grid/overview>.

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

7. Configure the pipe in your `shared.module.ts` adding the next lines.

<br/>

```js
...
+ import { SplitSchedulePipe } from './pipes/split-schedule.pipe';
...

@NgModule({
  ...
  declarations: [
    ...
    SplitSchedulePipe
  ],
  exports: [
    ...
    SplitSchedulePipe
  ]
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

9. For using a custom ontimize service, you must follow this steps:
  - Register your custom service in your feature module. In this case, in `form.module.ts`.

  ```js
  import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormDetailComponent } from './form-detail/form-detail.component';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { HotelService } from '../../shared/services/hotel.service.ts';
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

  - Create a service that extends OntimizeEEService and overrides query(...) to return data from in-memory arrays. You can see an example in `hotel.service.ts`.
  - Use it in `o-form` and `o-grid` with the input `service-type`. In this case, `service-type="hotels"`.

For more infomation about custom services in Ontimize click [here](https://ontimizeweb.github.io/docs/v15/guide/service/).

<br/>

10. We don’t use `parent-keys` here. Instead, a small service builds the `kv` and the component queries `o-grid` programmatically.

  - `spaces-filter.service.ts`

    - buildKv(hotelId, type): Central place that translates UI state into the kv sent to the Ontimize service. Always includes hotelId. Includes type only when filtering ('cabin' | 'common'), and omits it for “all”.

  - `form-detail.component.ts`

    - onFormDataLoaded(data): Called by `o-form`; sets the header label and triggers the initial query by calling loadSpaces('cabin') (after the view stabilizes).

    - onFilterChange(event): Called by the toggle (onChange); extracts the selected type ('all' | 'cabin' | 'common') and calls loadSpaces(type).

    - loadSpaces(type): Reads `hotelId` from the form, calls SpacesFilterService.buildKv(...), and then queries this.grid.queryData(kv).

  - `form-detail.component.html`

    - Toggle: <o-button-toggle-group ... (onChange)="onFilterChange($event)"> with explicit values: all, cabin, common.

    - Grid: <o-grid ... query-on-init="no"> so the component fully controls when/how queries run.

  - `hotel.service.ts` (Ontimize data service)

    - query(..., entity='spaces'): Merges cabins + commons, always filters by hotelId, and only filters by type when present and not 'all'.

<br/>

## LEARN MORE

* **Dark and light mode** <https://ontimizeweb.github.io/docs/v15/customize/theming/#dark-and-light-primary-variants>

* **OTranslateService** <https://ontimizeweb.github.io/docs/v15/guide/otranslateservice/overview>

* **Grid component** <https://ontimizeweb.github.io/docs/v15/components/data/grid/overview>

* **Ontimize SCSS surface classes** <https://ontimizeweb.github.io/docs/v15/customize/style-guide/#surfaces>
