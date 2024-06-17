import { Component, Inject, Injector, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, LocalStorageService, NavigationService, SessionInfo, Util } from 'ontimize-web-ngx';
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

  @ViewChild ('checkbox', {static: true}) rememberChk: MatCheckbox;

  constructor(
    private actRoute: ActivatedRoute,
    router: Router,
    @Inject(NavigationService) public navigation: NavigationService,
    @Inject(AuthService) private authService: AuthService,
    @Inject(LocalStorageService) private localStorageService: LocalStorageService,
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
    this.navigation.setVisible(false);

    this.loginForm.addControl('username', this.userCtrl);
    this.loginForm.addControl('password', this.pwdCtrl);

    if (this.authService.isLoggedIn()) {
      this.router.navigate(['../'], { relativeTo: this.actRoute });
    } else {
      this.authService.clearSessionData();
      if (window.localStorage.getItem("rememberme") == "true") {
        this.rememberChk.checked = true;
      }
      this.rememberMe(this.rememberChk.checked);
    }
  }

  ngAfterViewInit(): any {
    if (this.authService.isLoggedIn()) {
      return;
    }
    const appData = this.localStorageService.getStoredData();
    const sessionData: SessionInfo = appData[LocalStorageService.SESSION_STORAGE_KEY] || {};

    if (appData && Util.isDefined(appData['rememberme'])) {
      if (Util.parseBoolean(appData['rememberme'], false)) {
        this.loginForm.patchValue({ 'username': sessionData.user });
      } else {
        this.loginForm.patchValue({ 'username': ''});
      }
    }
  }

  rememberMe(remember){
    if (remember){
      this.localStorageService.setLocalStorage({'rememberme': 'true'});
    } else {
      this.localStorageService.setLocalStorage({'rememberme': 'false'});
    }
  }

  login() {
    const userName = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    if (userName && userName.length > 0 && password && password.length > 0) {
      const self = this;
      this.authService.login(userName, password)
        .subscribe(() => {
          self.sessionExpired = false;
          self.router.navigate(['../'], { relativeTo: this.actRoute });
        }, this.handleError);
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