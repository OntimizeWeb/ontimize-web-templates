## How to use

<ol>
<li>Download folder 02-login </li>
<br />

Download folder 02-login and put `login` folder in `src/app/`, `images` into `assets/images/`

<br />

<pre>
─src
    ├───app
    │   ├───login
    │   ├───...
    │   │
    ├───assets
    │   ├───css
    │   ├───i18n
    │   └───images
    │       └───BG-img.png
    │       └───logo.svg
    │       └───logo-dark.svg
    │
    └───..

</pre>

<li>Add the translations of the following values ​​to the en.json file of your project</li>
<br />

```json
  "LOGIN.LOGIN": "Login",
  "LOGIN.ERROR_SESSION_EXPIRED": "Session expired",
  "LOGIN.USERNAME": "Username",
  "LOGIN.PASSWORKD": "Password"
```

<li>Configure routing in app.module.ts</li>

<br />

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

````
<li>To configure the theme on the login</li>
<br />

It is necessary to include **login.theme.scss** in app.scss

<br />

```scss
app.scss
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

<br />

<li>To change the background image you must replace the file with the new background image in assets/images/BG-img.png</li>

<br />

<li>To change logo icon, you must replace assets/images/logo.svg and assets/images/logo-dark.svg for light and dark mode</li>

<br />
</ol>

## LEARN MORE
<br />

- **Dark and light mode** https://ontimizeweb.github.io/docs/v15/customize/theming/#dark-and-light-primary-variants
