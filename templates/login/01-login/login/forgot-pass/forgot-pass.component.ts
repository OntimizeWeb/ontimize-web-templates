import { AfterViewInit, Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { AuthService, NavigationService } from 'ontimize-web-ngx';

export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors => {
  return control.value.password1 === control.value.password2
    ? { PasswordNoMatch: false }
    : { PasswordNoMatch: true };
};

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

  @ViewChild ('checkbox', {static: true}) rememberChk: MatCheckbox;

  constructor(
    @Inject(NavigationService) public navigation: NavigationService,
    @Inject(AuthService) private authService: AuthService
  ) { }

  ngOnInit(): any {
    this.navigation.setVisible(false);

    this.loginForm.addControl('password1', this.pwdCtrl1);
    this.loginForm.addControl('password2', this.pwdCtrl2);
    this.loginForm.addValidators(confirmPasswordValidator);
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
      case 402:
        console.error("Passwords doesn't match");
        break;
      default: break;
    }
  }
}
