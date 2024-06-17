import { Component, Inject, Injector, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, NavigationService, OPasswordInputComponent, OTextInputComponent } from 'ontimize-web-ngx';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  sessionExpired = false;
  router: Router;
  @ViewChild('user') userForm: OTextInputComponent;
  @ViewChild('password') passwordForm: OPasswordInputComponent;

  constructor(
    private actRoute: ActivatedRoute,
    router: Router,
    @Inject(NavigationService) public navigation: NavigationService,
    @Inject(AuthService) private authService: AuthService,
    public injector: Injector
  ) {
    this.router = router;

    const qParamObs: Observable<any> = this.actRoute.queryParams;
    qParamObs.subscribe(params => {
      if (params) {
        const isDetail = params['session-expired'];
        if (isDetail === 'true') {
          this.sessionExpired = true;
        } else {
          this.sessionExpired = false;
        }
      }
    });
  }

  ngOnInit(): any {
    this.authService.logout();
    this.navigation.setVisible(false);

    if (this.authService.isLoggedIn()) {
      this.router.navigate(['../'], { relativeTo: this.actRoute });
    } else {
      this.authService.clearSessionData();
    }
  }

  login() {
    const userName = this.userForm.getValue();
    const password = this.passwordForm.getValue();;

    if (userName?.length > 0 && password?.length > 0) {
      const self = this;
      this.authService.login(userName, password)
        .subscribe({
          next: () => {
            self.sessionExpired = false;
            self.router.navigate(['../'], { relativeTo: this.actRoute });
          },
          error: (e) => console.error(e)
        });
    }
  }
}
