## How to use

<br/>

1. Download and put `table` folder in src/app/main/ and `i18n` into assets/

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

2. Configure the `o-table`, you must to modify the values ​​between `@` for the inputs `attr`, `service`, `entity`, `columns` and `keys` . For more information consult the following url https://ontimizeweb.github.io/docs/v15/components/data/table/overview

<br/>

Replace:
```html
 <o-table #table fxFlex attr="@customer@" title="CUSTOMERS" service="@customers@" entity="@customer@" keys="@CUSTOMERID@"
    columns="@CUSTOMERID;PHOTO;NAME;SURNAME;ADDRESS;STARTDATE;EMAIL;CUSTOMERTYPEID@"
    visible-columns="@PHOTO;NAME;SURNAME;STARTDATE;EMAIL;ADDRESS;CUSTOMERTYPEID@" sort-columns="@SURNAME@" query-rows="24" quick-filter="yes" row-height="medium" select-all-checkbox="true" pageable="yes" virtual-scroll="no">
```

<br/>

By:
```html
 <o-table #table fxFlex attr="yourattr" title="CUSTOMERS" service="yourservice" entity="yourentity" keys="yourkey"
    columns="yourcolumns"
    visible-columns="yourcolumns" sort-columns="yourcolumns" query-rows="24" quick-filter="yes" row-height="medium" select-all-checkbox="true" pageable="yes" virtual-scroll="no">
```

<br/>

Also you need to configure your `createFilter` method located in the `table-home.component.ts` file according the filter you want to build. Link to the filter builder documentation: https://ontimizeweb.github.io/docs/v15/components/data/filterbuilder/overview

<br/>

3. Configure your `o-filter-builder` setting your inputs and custom ATTR to build the filter. Link to the filter builder documentation: https://ontimizeweb.github.io/docs/v15/components/data/filterbuilder/overview

4. Add the translations you want to use on your app ​​to the `en.json` and `es.json` files of your project

<br/>

5. Configure routing in `main-routing.module.ts`

<br/>

```js
import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  ...
  { path: 'table', loadChildren: () => import('./table/table.module').then(m => m.TableModule) }
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

6. To configure the theme on the table component it is necessary to include `table.theme.scss` in `app.scss`

<br/>

```scss
@use 'theme.scss' as theme;
@use 'ontimize-web-ngx/theming/ontimize-style.scss';
...
@include ontimize-style.ontimize-theme-styles(theme.$theme);

+ @import '../../app/table/table.theme.scss';


@mixin app-themes($theme) {
...
+ @include table-theme($theme);
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

* **Filter builder** https://ontimizeweb.github.io/docs/v15/components/data/filterbuilder/overview

* **Table component** https://ontimizeweb.github.io/docs/v15/components/data/table/overview

* **MediaMatcher** https://material.angular.io/cdk/layout/overview

* **Ontimize SCSS surface classes** https://ontimizeweb.github.io/docs/v15/customize/style-guide/#surfaces
