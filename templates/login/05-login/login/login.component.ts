import { Component, Inject, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, DialogService, LocalStorageService, NavigationService, OTranslateService, SessionInfo, Util } from 'ontimize-web-ngx';
import { Observable } from 'rxjs';

@Component({
  selector: 'login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  loginForm: UntypedFormGroup = new UntypedFormGroup({});
  userCtrl: UntypedFormControl = new UntypedFormControl('', Validators.required);
  pwdCtrl: UntypedFormControl = new UntypedFormControl('', Validators.required);
  sessionExpired = false;

  router: Router;

  isSpanish: boolean;

  usernameHiden: boolean;

  constructor(
    private actRoute: ActivatedRoute,
    router: Router,
    @Inject(NavigationService) public navigation: NavigationService,
    @Inject(AuthService) private authService: AuthService,
    @Inject(LocalStorageService) private localStorageService: LocalStorageService,
    public injector: Injector,
    private _translateService: OTranslateService,
    protected dialogService: DialogService
  ) {
    this.router = router;
    const qParamObs: Observable<any> = this.actRoute.queryParams;
    qParamObs.subscribe(params => {
      if (params) {
        this.sessionExpired = params['session-expired'] === 'true' ? true : false;
      }
    });
    this.usernameHiden = false;
  }

  ngOnInit(): any {
    this.navigation.setVisible(false);
    this.isSpanish = this._translateService.getCurrentLang() == "es" ? true : false;
    this.loginForm.addControl('username', this.userCtrl);
    this.loginForm.addControl('password', this.pwdCtrl);

    if (this.authService.isLoggedIn()) {
      this.router.navigate(['../'], { relativeTo: this.actRoute });
    } else {
      this.authService.clearSessionData();
    }
  }

  ngAfterViewInit(): any {
    if (this.authService.isLoggedIn()) {
      return;
    }
    const appData = this.localStorageService.getStoredData();
    const sessionData: SessionInfo = appData[LocalStorageService.SESSION_STORAGE_KEY] || {};

    if (appData && Util.isDefined(appData['rememberme'])) {
      if (Util.parseBoolean(appData['rememberme'], true)) {
        this.loginForm.patchValue({ 'username': sessionData.user });
      } else {
        this.loginForm.patchValue({ 'username': ''});
      }
    }
  }

  changeLang(language): void {
    if (this._translateService.getCurrentLang() !== language) {
      this._translateService.use(language);
      this.isSpanish = language == "es" ? true : false;
    }
  }

  enterUsername() {
    if (this.loginForm.value.username == '') {
      this.dialogService.error(this._translateService.get("LOGIN.ERROR_REQUIRED_FIELD"), this._translateService.get("LOGIN.ERROR_USER_REQUIRED"));
    } else {
      this.router.navigate(['login/forgotpass/' + this.loginForm.value.username]);
    }
  }

  login() {
    const userName = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    if (!this.usernameHiden && userName && userName.length) {
      this.usernameHiden = true
    } else if (this.usernameHiden && password && password.length > 0) {
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

  handleError(error) {
    switch (error.status) {
      case 401:
        console.error('Email or password is wrong.');
        break;
      default: break;
    }
  }

}
