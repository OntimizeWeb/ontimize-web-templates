## How to use

<br/>

1. Download and put `dashboard` folder in src/app/main/, `i18n` into assets/ and `pipes` in src/app/shared.

<br/>

<pre>
─src
    ├───app
    |   ├───main
    |   |   └───dashboard
    |   ├───shared
    |   |   └───pipes
    │   ├───...
    │   │
    ├───assets
    │   └───i18n
    |       ├───en.json
    |       └───es.json
    │
    │
    └───..

</pre>

2. In order to have exactly the same layout as the template, we recommend that you configure the following in the app.module.ts file

<br/>

```js
export const customProviders: any = [
  { provide: O_MAT_ERROR_OPTIONS, useValue: { type: 'lite' } },
  ...
];
```

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

## LEARN MORE

- **Dark and light mode** <https://ontimizeweb.github.io/docs/v15/customize/theming/#dark-and-light-primary-variants>

- **OTranslateService** <https://ontimizeweb.github.io/docs/v15/guide/otranslateservice/overview>

- **Ontimize SCSS surface classes** <https://ontimizeweb.github.io/docs/v15/customize/style-guide/#surfaces>

- **DecimalPipe** <https://v15.angular.io/api/common/DecimalPipe>
