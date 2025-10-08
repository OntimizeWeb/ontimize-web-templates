## How to use

<br/>

1. Download and put `form` folder in src/app/main/, `i18n` and `images` into assets/ folder and `pipes` in src/app/shared.

<pre>
─src
    ├───app
    |   ├───main
    |   |   └───form
    |   ├───shared
    |   |   └───pipes
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

2. Configure the `o-list` modifying the values for the inputs `service-type`, `entity` `columns`, `quick-filter-columns` and `parent-keys`. For more information consult the following url <https://ontimizeweb.github.io/docs/v15/components/data/list/overview#custom-list-item>.

<br/>

3. Add the translations you want to use on your app ​​to the `en.json` and `es.json` files of your project

<br/>

4. Configure routing in `main-routing.module.ts`

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

## LEARN MORE

* **Dark and light mode** <https://ontimizeweb.github.io/docs/v15/customize/theming/#dark-and-light-primary-variants>

* **OTranslateService** <https://ontimizeweb.github.io/docs/v15/guide/otranslateservice/overview>

* **List component** <https://ontimizeweb.github.io/docs/v15/components/data/list/overview>

* **Ontimize SCSS surface classes** <https://ontimizeweb.github.io/docs/v15/customize/style-guide/#surfaces>