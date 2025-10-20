## How to use

<br/>

1. Download 02-grid folder and put the grid folder in `src/app/main/`, i18n and images into `assets/` and services into `src/app/shared`

<br/>

<pre>
─src
    ├───app
    |   ├───main
    |   |   └───grid
    |   ├───shared
    |   |   └───services
    |   |
    │   ├───...
    │   │
    ├───assets
    │   ├───css
    │   |───i18n
    |   |   ├───en.json
    |   |   └───es.json
    │   └───images
    │
    │
    └───..

</pre>

2. Configure the `o-grid`, you must to modify the values for the inputs `attr`, `service-type`, `entity`, `columns`, `sortable-columns`, `sort-columns`, `keys`, `paginated-query-method`. Don't forget to customize your `o-grid-item` as you want. For more information consult the following url <https://ontimizeweb.github.io/docs/v15/components/data/grid/overview>

<br/>

3. Configure your filter builder component setting your inputs and custom ATTR to build the filter. Link to the filter builder documentation at the end of the readme. Also you need to configure your `createFilter` method located in the `grid.component.ts` file according the filter you want to build. For more information consult the following url <https://ontimizeweb.github.io/docs/v15/components/data/filterbuilder/overview>

<br/>

4. Add the translations you want to use on your app ​​to the `en.json` and `es.json` files of your project

<br/>

5. Configure routing in `main-routing.module.ts`

<br/>

```js
import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      ...
      { path: 'grid', loadChildren: () => import('./grid/grid.module').then(m => m.GridModule) }
    ]
  }
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

6. To configure the theme on the grid component it is necessary to include `grid.theme.scss` in `app.scss`

<br/>

```scss
@use 'theme.scss' as theme;
@use 'ontimize-web-ngx/theming/ontimize-style.scss';
...
@include ontimize-style.ontimize-theme-styles(theme.$theme);

+ @import '../../app/grid/grid.theme.scss';

@mixin app-themes($theme) {
...
+ @include grid-theme($theme);
...
}

.o-dark {
...
  + @include app-themes(theme.$dark-theme);
...
}

/*
* Propagate theme to screen styles definition.
*/
@include app-themes(theme.$theme);


/*
* Other app styles
*/

```

</br>

7. In order to have exactly the same layout as the template, we recommend that you configure the following in the app.module.ts file

<br/>

```js
export const customProviders: any = [
  { provide: O_MAT_ERROR_OPTIONS, useValue: { type: 'lite' } },
  ...
];
```

<br/>

9. For using a custom ontimize service and use it in `o-combo` and `o-grid` with the input `service-type`, you must follow this steps:

- Register your custom service in your feature module. In this case, in `grid.module.ts`.

```js
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OntimizeWebModule } from 'ontimize-web-ngx';
import { SharedModule } from '../../shared/shared.module';
import { GridComponent } from './grid.component';
import { GridRoutingModule } from './grid-routing.module';
+ import { PacksService } from '../../shared/services/packs.service';

@NgModule({
  declarations: [
    GridComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    GridRoutingModule,
    OntimizeWebModule
  ],
+  providers: [{
    provide: 'packs',
    useValue: PacksService
  }
  ]
})
export class GridModule { }
```

  <br/>

- Create a service that extends OntimizeEEService and overrides query(...) to return data from in-memory arrays. You can see an example in `packs.service.ts`. For more infomation about custom services in Ontimize click [here](https://ontimizeweb.github.io/docs/v15/guide/service/).

<br/>

## LEARN MORE

<br/>

* **OTranslateService** <https://ontimizeweb.github.io/docs/v15/guide/otranslateservice/overview>

* **Services** <https://ontimizeweb.github.io/docs/v15/guide/service/>

* **Combo component** <https://ontimizeweb.github.io/docs/v15/components/input/combo/overview>

* **Filter builder** <https://ontimizeweb.github.io/docs/v15/components/data/filterbuilder/overview>

* **Grid component** <https://ontimizeweb.github.io/docs/v15/components/data/grid/overview>

* **Ontimize SCSS surface classes** <https://ontimizeweb.github.io/docs/v15/customize/style-guide/#surfaces>

