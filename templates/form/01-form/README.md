## How to use

<br/>

1. Download and put `form` folder in src/app/main/ and `i18n` into assets/

<br/>

<pre>
─src
    ├───app
    |   ├───main
    |   |   └───table
    │   ├───...
    │   │
    ├───assets
    │   ├───css
    │   └───i18n
    |       ├───en.json
    |       └───es.json
    │
    │
    └───..

</pre>

2. Configure the `o-form`, you must to modify the values ​​between `@` for the inputs `attr`, `service`, `entity`, `columns` and `keys` . For more information consult the following url https://ontimizeweb.github.io/docs/v15/components/data/form/overview

<br/>

Replace:
```html
 <o-form #form attr="@customers@" service="@customers@" entity="@customer@" keys="@CUSTOMERID@" class="fill-form" show-header="none"
  columns="@CUSTOMERID;NAME;SURNAME;ADDRESS;PHONE@" (onDataLoaded)="onFormDataLoaded($event)">
```

<br/>

By:
```html
 <o-form #form attr="yourattr" service="yourservice" entity="yourentity" keys="yourkey" class="fill-form" show-header="none"
    columns="yourcolumns" (onDataLoaded)="onFormDataLoaded($event)">
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

+ @import '../../app/form/form.theme.scss';


@mixin app-themes($theme) {
...
+ @include form-theme($theme);
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

## LEARN MORE

<br/>

* **Dark and light mode** https://ontimizeweb.github.io/docs/v15/customize/theming/#dark-and-light-primary-variants

* **OTranslateService** https://ontimizeweb.github.io/docs/v15/guide/otranslateservice/overview

* **Form component** https://ontimizeweb.github.io/docs/v15/components/data/form/overview

* **Ontimize SCSS surface classes** https://ontimizeweb.github.io/docs/v15/customize/style-guide/#surfaces
