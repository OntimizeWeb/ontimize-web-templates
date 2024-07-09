## How to use

<br/>

1. Download 01-grid folder and put the grid folder in `src/app/`

<br/>

<pre>
─src
    ├───app
    │   ├───grid
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

2. Add the translations you want to use on your app ​​to the `en.json` and `es.json` files of your project

<br/>

1. Configure routing in your routing file

<br/>

1. To configure the theme on the grid component it is necessary to include `grid.theme.scss` in `app.scss`

<br/>

```app.scss
@use 'theme.scss' as theme;
@use 'ontimize-web-ngx/theming/ontimize-style.scss';
...
@include ontimize-style.ontimize-theme-styles(theme.$theme);

+ @import '../../app/grid/grid.theme.scss';

@mixin app-themes($theme) {
...
+ @include grid-theme($theme);
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

* **OTranslateService** https://ontimizeweb.github.io/docs/v15/guide/otranslateservice/overview

<br/>

* **Filter builder** https://ontimizeweb.github.io/docs/v15/components/data/filterbuilder/overview

<br/>

* **Grid component** https://ontimizeweb.github.io/docs/v15/components/data/grid/overview