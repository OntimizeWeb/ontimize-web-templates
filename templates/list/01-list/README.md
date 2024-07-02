## How to use
<ol>
<li>Download and put `list` folder in src/app/ and `i18n` into assets/  </li>
<pre>
─src
    ├───app
    │   ├───list
    │   ├───...
    │   │
    ├───assets
    │   ├───css
    │   └───i18n
    |       └───en.json
    |       └───es.json
    │
    └───..


</pre>

<li>Check if the name of the ATTR, entities and services are concording with your application</li>

<li>Add the translations you want to use on your app ​​to the en.json and es.json files of your project</li>

<li>Configure routing in `main-routing.module.ts`</li>

<li>Add the module declaration in the `main.module.ts` file</li>

<li>To configure the theme on the login component it is necessary to include `list-home.theme.scss` in `app.scss`</li>

```app.scss
@use 'theme.scss' as theme;
@use 'ontimize-web-ngx/theming/ontimize-style.scss';
...
@include ontimize-style.ontimize-theme-styles(theme.$theme);

+ @import '../../app/list/list-home.theme.scss';


@mixin app-themes($theme) {
...
+ @include list-home-theme($theme);
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

</ol>

## LEARN MORE
* **Dark and light mode** https://ontimizeweb.github.io/docs/v15/customize/theming/#dark-and-light-primary-variants
