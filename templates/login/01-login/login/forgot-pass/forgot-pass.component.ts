import { AfterViewInit, Component, Inject, Injector, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, LocalStorageService, NavigationService, Observable, SessionInfo, Util } from 'ontimize-web-ngx';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ForgotPassComponent implements OnInit, AfterViewInit {
  loginForm: UntypedFormGroup = new UntypedFormGroup({});
  pwdCtrl1: UntypedFormControl = new UntypedFormControl('', Validators.required);
  pwdCtrl2: UntypedFormControl = new UntypedFormControl('', Validators.required);
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

    this.loginForm.addControl('password1', this.pwdCtrl1);
    this.loginForm.addControl('password2', this.pwdCtrl2);
  }

  ngAfterViewInit(): any {
    if (this.authService.isLoggedIn()) {
      return;
    }
  }

  changePass() {
    const password1 = this.loginForm.value.password1;
    const password2 = this.loginForm.value.password2;

    if(password1 && password2) {
      if(password1 == password2) {

      } else {
        this.handleError({status: 402});
      }
    }  
  }

  handleError(error) {
    switch (error.status) {
      case 401:
        console.error('Email or password is wrong.');
        break;
      case 401:
        console.error("Passwords doesn't match");
        break;
      default: break;
    }
  }
}
