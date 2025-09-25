## How to use

<br/>

1. Download and put `table` folder in src/app/main/, `i18n` into assets/ and `icons` also on assets/ folder. Also add `intefaces` folder in src/app/shared.

<br/>

<pre>
─src
    ├───app
    |   ├───main
    |   |   └───table
    │   ├───shared
    |   |   └───interfaces
    |   |
    |   ├─── ...
    │   │
    ├───assets
    │   ├───css
    │   ├───i18n
    |   │   ├───en.json
    |   │   └───es.json
    │   └───icons
    │
    └───..

</pre>

2. Configure the `o-table`, you must to modify the values ​​between `@` for the inputs `attr`, `service`, `entity`, `columns` and `keys`. For more information consult the following url https://ontimizeweb.github.io/docs/v15/components/data/table/overview.
Also you need to configure your `createFilter` method located in the `table-home.component.ts` file according the filter you want to build. Link to the filter builder documentation: https://ontimizeweb.github.io/docs/v15/components/data/filterbuilder/overview

<br/>

3. Configure your `o-filter-builder` setting your inputs and custom ATTR to build the filter. Link to the filter builder documentation: https://ontimizeweb.github.io/docs/v15/components/data/filterbuilder/overview. 

In some cases, the values you will need for filtering the component request will be present in the parent form with a different name than the used in the component. For matching the component parent keys with these names, you can define an alias for each key you need separating the component parent key and its alias with two dots ‘:’.

```html
<o-form class="fill-form" editable-detail="no" show-header="no">
...
    <o-text-input attr="NAMEFILTER" label="NAME" read-only="no" fxFlex></o-text-input>
    <o-text-input attr="SURNAMEFILTER" label="SURNAME" read-only="no" fxFlex></o-text-input>
    <o-email-input attr="EMAILFILTER" label="EMAIL" read-only="no" fxFlex></o-email-input>
          
    <o-filter-builder  ... filters="NAME:NAMEFILTER;SURNAME:SURNAMEFILTER;EMAIL:EMAILFILTER;CUSTOMERTYPEID"></o-filter-builder>
 </o-form>
 <o-table #table  ...
        columns="...NAME;SURNAME;...;EMAIL" ...>
        ...
 </o-table>
```

<br/>

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

+ @import '../../app/main/table/table.theme.scss';


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

</br>

7. To use custom icons in your application, you need to register them in the **Ontimize icon registry service**. This is typically done in the `app.component.ts` file so that the icons are available globally. The service `OntimizeMatIconRegistry` is injected into your component through Angular’s dependency injection system. More information [here](https://ontimizeweb.github.io/docs/v15/customize/icons/).

```js
import { Component, OnInit } from '@angular/core';
import { OntimizeMatIconRegistry } from 'ontimize-web-ngx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private ontimizeMatIconRegistry: OntimizeMatIconRegistry) { }

  ngOnInit(): void {
    this.ontimizeMatIconRegistry.addOntimizeSvgIcon('VIP', 'assets/icons/vip.svg');
    this.ontimizeMatIconRegistry.addOntimizeSvgIcon('normal', 'assets/icons/normal.svg');
    this.ontimizeMatIconRegistry.addOntimizeSvgIcon('all', 'assets/icons/all.svg');
    this.ontimizeMatIconRegistry.addOntimizeSvgIcon('other', 'assets/icons/other.svg');
  }
}
```

Once registered, you can use these icons anywhere in your templates:

```html
<mat-icon svgIcon="VIP"></mat-icon>
<mat-icon svgIcon="normal"></mat-icon>
<mat-icon svgIcon="all"></mat-icon>
<mat-icon svgIcon="other"></mat-icon>
```

## LEARN MORE

<br/>

* **Dark and light mode** https://ontimizeweb.github.io/docs/v15/customize/theming/#dark-and-light-primary-variants

* **OTranslateService** https://ontimizeweb.github.io/docs/v15/guide/otranslateservice/overview

* **Filter builder** https://ontimizeweb.github.io/docs/v15/components/data/filterbuilder/overview

* **List picker** https://ontimizeweb.github.io/docs/v15/components/input/listpicker/overview

* **Table component** https://ontimizeweb.github.io/docs/v15/components/data/table/overview

* **MediaMatcher** https://material.angular.io/cdk/layout/overview

* **Ontimize SCSS surface classes** https://ontimizeweb.github.io/docs/v15/customize/style-guide/#surfaces

* **Ontimize Web icon registry documentation** https://ontimizeweb.github.io/docs/v15/customize/icons/
