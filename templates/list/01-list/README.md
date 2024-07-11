## How to use

<br/>

1. Download and put `list` folder in src/app/main/ and `i18n` into assets/

<br/>

<pre>
─src
    ├───app
    |   ├───main
    |   |   └───list
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
 <o-list #listAccount service="@branches@" entity="@account@" keys="@ACCOUNTID@"
    columns="@ACCOUNTID;ENTITYID;OFFICEID;CDID;ANID;BALANCE;STARTDATE;ENDDATE;INTERESRATE;ACCOUNTTYP;ACCOUNTTYPEID;ACCOUNTTYPENAME@"
    controls="no" fxFlex.gt-lg="list-accounts-60" pageable="yes" fxFill>
```

<br/>

By:
```html
 <o-list #listAccount service="yourservice" entity="yourentity" keys="yourkey"
    columns="yourcolumn1;yourcolumn2"
    controls="no" fxFlex.gt-lg="list-accounts-60" pageable="yes" fxFill>
```

3. Configure your filter component setting your inputs and custom ATTR to build the filter. Example of how filter builder works at the end of the readme.

4. Add the translations you want to use on your app ​​to the `en.json` and `es.json` files of your project

<br/>

5. Configure routing in `main-routing.module.ts`

<br/>

```js
import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  ...
  { path: 'list', loadChildren: () => import('./list/list.module').then(m => m.ListModule) }
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

6. Add the module declaration in the `main.module.ts` file

<br/>

7. To configure the theme on the list component it is necessary to include `list.theme.scss` in `app.scss`

<br/>

```scss
@use 'theme.scss' as theme;
@use 'ontimize-web-ngx/theming/ontimize-style.scss';
...
@include ontimize-style.ontimize-theme-styles(theme.$theme);

+ @import '../../app/list/list.theme.scss';


@mixin app-themes($theme) {
...
+ @include list-theme($theme);
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

* **List component** https://ontimizeweb.github.io/docs/v15/components/data/list/overview
* ** MediaMatcher** https://material.angular.io/cdk/layout/overview
