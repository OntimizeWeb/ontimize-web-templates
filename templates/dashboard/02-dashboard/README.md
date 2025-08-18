## How to use

<br/>

1. Download and put `dashboard` folder in src/app/main/ and `i18n` and `css` into assets/

<br/>

<pre>
─src
    ├───app
    |   ├───main
    |   |   └───dashboard
    │   ├───...
    │   │
    ├───assets
    │   ├───css
    │   |   ├───custom-theme.scss
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

3. In `dashboard.component.html`:

- 3.1. Configure `parent-menu-id` attribute in `o-card-menu-layout` element with the corresponding value you have in your `app.menu.config.ts`. For more information, consult the following URL https://ontimizeweb.github.io/docs/v15/components/menu/cardmenulayout/overview

<br/>

```html
<o-card-menu-layout parent-menu-id="@yourmenuid@"></o-card-menu-layout>
```

<br/>

- 3.2. Configure `(click)` attribute in `o-button` element with your method on `dashboard.component.ts`.

<br/>

```html
<o-button label="SEE_ALL" type="BASIC" (click)="navigate()"></o-button>
```

```js
navigate() {
    this.router.navigate(['../', 'candidates'], { relativeTo: this.actRoute });
  }
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

6. Add `custom-theme.scss` file at you css folder on your app.

<br/>

7. To configure the theme on the form component it is necessary to include `dashboard.theme.scss` in `app.scss` and, in this case, we use a custom theme `custom-theme.scss` so you also have to modify the `app.scss` in order to add this theme.

<br/>

```scss
@use 'theme.scss' as theme;
// @use 'ontimize-web-ngx/theming/themes/ontimize.scss' as theme;
@use './custom-theme.scss' as theme;
...
@include ontimize-style.ontimize-theme-styles(theme.$theme);

+ @import '../../app/main/dashboard/dashboard.theme.scss';


@mixin app-themes($theme) {
...
+ @include dashboard-theme($theme);
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

* **Card Menu Layout** https://ontimizeweb.github.io/docs/v15/components/menu/cardmenulayout/overview

* **Ontimize SCSS surface classes** https://ontimizeweb.github.io/docs/v15/customize/style-guide/#surfaces
