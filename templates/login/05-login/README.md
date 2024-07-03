## How to use
<ol>
<li>Download the login folder</li>

Put `login` folder in `src/app/`, `images` into `assets/images/`.

<pre>
─src
    ├───app
    │   ├───login
    │   ├───...
    │   │
    ├───assets
    │   ├───css
    │   ├───i18n
    |   |   └───en.json
    |   |   └───es.json
    │   └───images
    │       └───background.png
    │       └───Imatia_logo_white.png
    │
    └───..


</pre>

<li>Add the translations you want to use on your app ​​to the en.json and es.json files of your project</li>

<li>Configure routing in app.module.ts</li>

```ts
import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  ...]

const opt: ExtraOptions = {
    enableTracing: false
    // true if you want to print navigation routes
};

@NgModule({
  imports: [RouterModule.forRoot(routes, opt)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }

```

<li>To configure the theme on the login component it is necessary to include login.theme.scss in app.scss</li>

```app.scss
@use 'theme.scss' as theme;
@use 'ontimize-web-ngx/theming/ontimize-style.scss';
...
@include ontimize-style.ontimize-theme-styles(theme.$theme);

+ @import '../../app/login/login.theme.scss';


@mixin app-themes($theme) {
...
+ @include login-theme($theme);
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

<li>To change the background image you must replace the file with the new background image in assets/images/background.png</li>

<li>To change logo icon, you must replace assets/images/Imatia_logo_white.png</li>
</ol>

## LEARN MORE
* **Dark and light mode** https://ontimizeweb.github.io/docs/v15/customize/theming/#dark-and-light-primary-variants
* **OTranslateService** https://ontimizeweb.github.io/docs/v15/guide/otranslateservice/overview
