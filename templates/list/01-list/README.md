## How to use

<br/>

1. Download and put `list` folder in src/app/ and `i18n` into assets/

<br/>

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

2. Check if all the fields that have `@` on it's prefix and sufix are concording to your application data

<br/>

3. Add the translations you want to use on your app ​​to the en.json and es.json files of your project

<br/>

4. Configure routing in `main-routing.module.ts`

<br/>

5. Add the module declaration in the `main.module.ts` file

<br/>

6. To configure the theme on the list component it is necessary to include `list-home.theme.scss` in `app.scss`

<br/>

```app.scss
@use 'theme.scss' as theme;
@use 'ontimize-web-ngx/theming/ontimize-style.scss';
...
@include ontimize-style.ontimize-theme-styles(theme.$theme);

+ @import '../../app/list/list-home.theme.scss';


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

<br/>

* **OTranslateService** https://ontimizeweb.github.io/docs/v15/guide/otranslateservice/overview

<br/>

* **Filter builder** https://ontimizeweb.github.io/docs/v15/components/data/filterbuilder/overview

<br/>

* **List component** https://ontimizeweb.github.io/docs/v15/components/data/list/overview
