## How to use

<br/>

1. Download the login folder and put the `login` folder in `src/app/` and `images` into `assets/images/`

<br/>

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
    │       └───Imatia_logo.png
    │       └───Imatia_logo_white.png
    │
    └───..


</pre>

2. Add the translations you want to use on your app ​​to the `en.json` and `es.json` files of your project

<br/>

3. Configure routing in `app-routing.module.ts`

<br/>

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

4. To configure the theme on the login component it is necessary to include `login.theme.scss` in the `app.scss` file

<br/>

```scss
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

5. Implement the `register()` method ubicated in the `register.component.ts` file to get all the user information provided by the form and store it in your database. Also you need to implement the `sendEmail()` method ubicated in the `forgot-pass-email.component.ts` file to call your backend and send a temporal password to the email provided in the form.

<br/>

6. To change the background image you must replace the file with the new background image in `assets/images/background.png`

<br/>

7. To change logo icon, you must replace `assets/images/Imatia_logo_white.png` and `assets/images/Imatia_logo.png`

<br/>

## LEARN MORE

<br/>

* **Dark and light mode** https://ontimizeweb.github.io/docs/v15/customize/theming/#dark-and-light-primary-variants

* **OTranslateService** https://ontimizeweb.github.io/docs/v15/guide/otranslateservice/overview
