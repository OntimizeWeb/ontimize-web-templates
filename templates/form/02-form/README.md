## How to use

<br/>

1. Download and put `form` folder in src/app/main/, `i18n` into assets/ and `images` also on assets/ folder.

<pre>
─src
    ├───app
    |   ├───main
    |   |   └───table
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

2. Configure the `o-list` modifying the values ​​between `@` for the inputs `columns`, `quick-filter-columns` and `[static-data]`. For more information consult the following url <https://ontimizeweb.github.io/docs/v15/components/data/list/overview#custom-list-item>.

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

6. In order to use `class="material-icons-outlined"` on mat-icon elements, you should add the next line on your `index.html`

```html
<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>Your app</title>

  ...
  + <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined">
  ...

</head>

<body>
 ...
</body>

</html>

```

## LEARN MORE

* **Dark and light mode** <https://ontimizeweb.github.io/docs/v15/customize/theming/#dark-and-light-primary-variants>

* **OTranslateService** <https://ontimizeweb.github.io/docs/v15/guide/otranslateservice/overview>

* **List component** <https://ontimizeweb.github.io/docs/v15/components/data/list/overview>

* **Ontimize SCSS surface classes** <https://ontimizeweb.github.io/docs/v15/customize/style-guide/#surfaces>