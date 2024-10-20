import { Component, Inject, Injector, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, DialogService, LocalStorageService, NavigationService, Util } from 'ontimize-web-ngx';
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
  username: string;
  router: Router;

  @ViewChild ('checkbox', {static: true}) rememberChk: MatCheckbox;

  constructor(
    private actRoute: ActivatedRoute,
    router: Router,
    @Inject(NavigationService) public navigation: NavigationService,
    @Inject(AuthService) private authService: AuthService,
    @Inject(LocalStorageService) private localStorageService: LocalStorageService,
    public injector: Injector,
    protected dialogService: DialogService
  ) {
    this.router = router;

    const qParamObs: Observable<any> = this.actRoute.queryParams;
    qParamObs.subscribe(params => {
      if (params) {
        this.sessionExpired = params['session-expired'] === 'true' ? true : false;
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
      if (this.localStorageService.getStoredData()['rememberme'] != 'false') {
        this.rememberChk.checked = true;
      }
    }
  }

  ngAfterViewInit(): any {
    if (this.authService.isLoggedIn()) {
      return;
    }
    const appData = this.localStorageService.getStoredData();

    if (Util.isDefined(appData['rememberme'])) {
      if (appData['rememberme'] != 'false') {
        this.loginForm.patchValue({ 'username': this.localStorageService.getStoredData()['rememberme'] });
      } else {
        this.loginForm.patchValue({ 'username': '' });
      }
    }
  }

  rememberMe(remember){
    if (remember){
      this.localStorageService.setLocalStorage({ 'rememberme': '' });
    } else {
      this.localStorageService.setLocalStorage({ 'rememberme': 'false' });
    }
  }

  forgotPwd() {
    this.router.navigate(['login/forgotpass']);
  }

  login() {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    if (username?.length > 0 && password?.length > 0) {
      if (this.localStorageService.getStoredData()['rememberme'] != 'false') {
        this.localStorageService.setLocalStorage({ 'rememberme': username });
      }
      const self = this;
      this.authService.login(username, password)
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
