import { AfterViewInit, Component, Inject, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService, NavigationService, OTranslateService } from 'ontimize-web-ngx';

export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors => {
  return control.value.password1 === control.value.password2
    ? { PasswordNoMatch: false }
    : { PasswordNoMatch: true };
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit, AfterViewInit {
  registerForm: UntypedFormGroup = new UntypedFormGroup({});
  userCtrl: UntypedFormControl = new UntypedFormControl('', Validators.required);
  pwdCtrl1: UntypedFormControl = new UntypedFormControl('', Validators.required);
  pwdCtrl2: UntypedFormControl = new UntypedFormControl('', Validators.required);

  isSpanish: boolean;

  constructor(
    @Inject(NavigationService) public navigation: NavigationService,
    @Inject(AuthService) private authService: AuthService,
    public injector: Injector,
    private _translateService: OTranslateService
  ) { }

  ngOnInit(): any {
    this.navigation.setVisible(false);
    this.isSpanish = this._translateService.getCurrentLang() == "es" ? true : false;
    this.registerForm.addControl('username', this.userCtrl);
    this.registerForm.addControl('password1', this.pwdCtrl1);
    this.registerForm.addControl('password2', this.pwdCtrl2);
    this.registerForm.addValidators(confirmPasswordValidator);
  }

  ngAfterViewInit(): any {
    if (this.authService.isLoggedIn()) {
      return;
    }
  }

  changeLang(language): void {
    if (this._translateService && this._translateService.getCurrentLang() !== language) {
      this._translateService.use(language);
      this.isSpanish = language == "es" ? true : false;
    }
  }

  register() {
    const username = this.registerForm.value.username;
    const password1 = this.registerForm.value.password1;
    const password2 = this.registerForm.value.password2;

    if(password1 && password2 && username) {
      if(password1 == password2) {
        
      } else {
        this.handleError({status: 401});
      }
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
