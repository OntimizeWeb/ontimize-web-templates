## How to use

<br/>

1. Download and put `form` folder in src/app/main/ and `i18n` into assets/

<br/>

<pre>
─src
    ├───app
    |   ├───main
    |   |   └───form
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

2. In order to have exactly the same layout as the template, we recommend that you configure the following in the app.module.ts file

<br/>

```js
export const customProviders: any = [
  { provide: O_MAT_ERROR_OPTIONS, useValue: { type: 'lite' } },
  { provide: O_INPUTS_OPTIONS, useValue: { iconColor: 'accent' } },
  { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }
];
```
<br/>

3. Configure the `o-form`, you must to modify the values ​​between `@` for the inputs `attr`, `service`, `entity`, `keys`, `columns` and `keys-sql-types`. For more information consult the following url https://ontimizeweb.github.io/docs/v15/components/data/form/overview

<br/>

Replace:
```html
<o-form #form attr="@customers_form_edit@" service="@customers@" entity="@customer@" keys="@CUSTOMERID@" class="fill-form" show-header="none"
columns="@CUSTOMERID;NAME;SURNAME;ADDRESS;PHONE;PHOTO@" keys-sql-types="@INTEGER@" (onDataLoaded)="onFormDataLoaded($event)">
```

<br/>

By:
```html
<o-form #form attr="yourattr" service="yourservice" entity="yourentity" keys="yourkey" class="fill-form" show-header="none" columns="yourcolumns"
keys-sql-types="sqltypekey" (onDataLoaded)="onFormDataLoaded($event)">
```

<br/>

4. Configure the `o-input` elements, you must to modify the value of the attr between `@`. For more information consult the following url https://ontimizeweb.github.io/docs/v15/components/input/

<br/>

Replace:
```html
<o-text-input attr="@CREATOR@" [hidden]="!show" class="creator-input" label="CREATOR"></o-text-input>
```

<br/>

By:
```html
<o-text-input attr="yourattr" [hidden]="!show" class="creator-input" label="CREATOR"></o-text-input>
```

<br/>

5. Configure the `o-table` inside the `mat-tab-group`, you must to modify the values between `@` for the inputs `attr`, `service`, `entity`, `parent-keys`, `keys`, `columns`, and `visible-columns`. For more information consult the following url https://ontimizeweb.github.io/docs/v15/components/data/table/overview

<br/>

Replace:
```html
<o-table #accountsTable attr="@customer_accounts@" service="@customers@" entity="@customerAccount@" parent-keys="@CUSTOMERID@" keys="@ACCOUNTID@"
columns="@ACCOUNTID;ENTITYID;OFFICEID;CDID;ANID;ACCOUNT;BALANCE;CUSTOMERID;STARTDATE;ENDDATE@"
visible-columns="@ACCOUNT;BALANCE;STARTDATE;ENDDATE@" query-rows="20" delete-button="none">
```

<br/>

By:
```html
<o-table #accountsTable attr="yourattr" service="yourservice" entity="yourentity" parent-keys="yourparentkey" keys="yourkey"
columns="yourcolumns" visible-columns="yourvisiblecolumns" query-rows="20" delete-button="none">
```

<br/>

6. Add the translations you want to use on your app ​​to the `en.json` and `es.json` files of your project

<br/>

7. Configure routing in `main-routing.module.ts`

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

8. To configure the theme on the form component it is necessary to include `form.theme.scss` in `app.scss`

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
