import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NavigationService, OTranslateService } from 'ontimize-web-ngx';

function RetypeConfirm(newpassword: string): ValidatorFn {
  return (control: FormControl) => {
    if (!control || !control.parent) {
      return null;
    }
    return control.parent.get(newpassword).value === control.value ? null : { mismatch: true };
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});

  isSpanish: boolean;

  constructor(
    @Inject(NavigationService) public navigation: NavigationService,
    private _translateService: OTranslateService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.navigation.setVisible(false);
    this.isSpanish = this._translateService.getCurrentLang() == "es" ? true : false;
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      newpassword: ['', [Validators.required]],
      confirmpassword: ['', [
        Validators.required,
        RetypeConfirm('newpassword')
      ]]
    });
  }

  changeLang(language): void {
    if (this._translateService && this._translateService.getCurrentLang() !== language) {
      this._translateService.use(language);
      this.isSpanish = language == "es" ? true : false;
    }
  }

  register() {
    const username = this.registerForm.value.username;
    const password1 = this.registerForm.value.newassword;
    const password2 = this.registerForm.value.confirmpassword;

    if (password1 && password2 && username) {
      if (password1 == password2) {

      } else {
        this.handleError({ status: 401 });
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
