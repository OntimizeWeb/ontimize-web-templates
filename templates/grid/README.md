## How to use

<br/>

1. Download 01-grid folder and put the grid folder in `src/app/main/` and i18n into `assets/`

<br/>

<pre>
─src
    ├───app
    |   ├───main
    |   |   └───grid
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

2. Check if all the fields that have `@` on it's prefix and suffix are concording to your application data

<br/>

Replace:
```html
 <o-grid #grid attr="@employees@" service="@employees@" entity="@employee@"
      columns="@EMPLOYEEID;EMPLOYEETYPEID;EMPLOYEENAME;EMPLOYEESURNAME;EMPLOYEEADDRESS;EMPLOYEESTARTDATE;EMPLOYEEEMAIL;OFFICEID;EMPLOYEEPHOTO;EMPLOYEEPHONE;NAME@"
      quick-filter-columns="@EMPLOYEENAME;EMPLOYEESURNAME;EMPLOYEEADDRESS;EMPLOYEEEMAIL;OFFICEID@" keys="@EMPLOYEEID@" sort-columns="@EMPLOYEESURNAME@"
      pageable="yes" query-rows="16" fixed-header="yes" refresh-button="no" gutter-size="18px" detail-mode="none">
```

<br/>

By:
```html
 <o-grid #grid attr="yourattr" service="yourservice" entity="yourentity"
      columns="yourcolumn1;yourcolumn2"
      quick-filter-columns="yourcolumn1;yourcolumn2" keys="yourkey" sort-columns="yourcolumn"
      pageable="yes" query-rows="16" fixed-header="yes" refresh-button="no" gutter-size="18px" detail-mode="none">
```


3. Configure your filter component setting your inputs and custom ATTR to build the filter. Link to the filter builder documentation at the end of the readme.

4. Add the translations you want to use on your app ​​to the `en.json` and `es.json` files of your project

<br/>

5. Configure routing in `main-routing.module.ts`

<br/>

```js
import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  ...
  { path: 'grid', component: GridHomeComponent }
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


## LEARN MORE

<br/>

* **OTranslateService** https://ontimizeweb.github.io/docs/v15/guide/otranslateservice/overview

* **Filter builder** https://ontimizeweb.github.io/docs/v15/components/data/filterbuilder/overview

* **Grid component** https://ontimizeweb.github.io/docs/v15/components/data/grid/overview
