## How to use

<br/>

1. Download and put `dashboard` folder in src/app/main/ and `i18n` into assets/

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

3. In `dashboard.component.html`, configure `href` attribute in `a` element with your values.

<br/>

```html
<a href="../link">{{ 'see_all' | oTranslate }}</a>
```

<br/>

4. In `dashboard.component.ts`, configure the differents methods to represent your data. You must to modify the values between `@`. For more information consult the following url https://ontimizeweb.github.io/docs/v15/addons/charts/. For example:

<br/>

Replace:
```js
private setCandidatesPerExperienceLevelAmounts() {
    this.ontimizeService.configureService(this.ontimizeService.getDefaultServiceConfiguration('@candidates@'));

    // Get candidate experience levels
    this.ontimizeService.query(undefined, ['@id@', '@experience_level@'], '@candidateExperienceLevel@').subscribe(res => {
      if (res.data && res.data.length) {
        res.data.forEach((item) => this.candidateTypes[item.@id@] = item.@experience_level@);
      }
    });

    // Get candidates and count by experience level
    this.ontimizeService.query(undefined, ['@experience_level@'], '@candidate@').subscribe(
      res => {
        if (res.data && res.data.length) {
          this.candidatesAmounts.total = res.data.length;
          this.filteredCandidates = res.data.reduce((acc, item) => {
            const experience_level = item.@experience_level@;
            if (acc[experience_level]) {
              acc[experience_level]++;
            } else {
              acc[experience_level] = 1;
            }
            return acc;
          }, {} as { [key: number]: number });

        }
        this.candidatesData = [
          { name: this.translateService.get('@junior@'), value: this.filteredCandidates[1] },
          { name: this.translateService.get('@medium@'), value: this.filteredCandidates[2] },
          { name: this.translateService.get('@senior@'), value: this.filteredCandidates[3] },
        ];
      },
      err => console.error(err),
      () => this.cd.detectChanges()
    );
```

<br/>

By:
```js
private setCandidatesPerExperienceLevelAmounts() {
    this.ontimizeService.configureService(this.ontimizeService.getDefaultServiceConfiguration('@yourservice@'));

    // Get candidate experience levels
    this.ontimizeService.query(undefined, ['@yourattr@', '@yourattr@'], '@yourattr@').subscribe(res => {
      if (res.data && res.data.length) {
        res.data.forEach((item) => this.candidateTypes[item.@yourattr@] = item.@yourattr@);
      }
    });

    // Get candidates and count by experience level
    this.ontimizeService.query(undefined, ['@yourattr@'], '@yourattr@').subscribe(
      res => {
        if (res.data && res.data.length) {
          this.candidatesAmounts.total = res.data.length;
          this.filteredCandidates = res.data.reduce((acc, item) => {
            const experience_level = item.@yourattr@;
            if (acc[experience_level]) {
              acc[experience_level]++;
            } else {
              acc[experience_level] = 1;
            }
            return acc;
          }, {} as { [key: number]: number });

        }
        this.candidatesData = [
          { name: this.translateService.get('@yourattr@'), value: this.filteredCandidates[1] },
          { name: this.translateService.get('@yourattr@'), value: this.filteredCandidates[2] },
          { name: this.translateService.get('@yourattr@'), value: this.filteredCandidates[3] },
        ];
      },
      err => console.error(err),
      () => this.cd.detectChanges()
    );
```

<br/>

5. Add the translations you want to use on your app ​​to the `en.json` and `es.json` files of your project

<br/>

6. Configure routing in `main-routing.module.ts`

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

7. To configure the theme on the dashboard component it is necessary to include `dashboard.theme.scss` in `app.scss`

<br/>

```scss
@use 'theme.scss' as theme;
@use 'ontimize-web-ngx/theming/ontimize-style.scss';
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

* **Charts** https://ontimizeweb.github.io/docs/v15/addons/charts/

* **Charts examples** https://ontimize-web-ngx-demos.ontimize.com/v15/charts/main/home

* **Ontimize SCSS surface classes** https://ontimizeweb.github.io/docs/v15/customize/style-guide/#surfaces
