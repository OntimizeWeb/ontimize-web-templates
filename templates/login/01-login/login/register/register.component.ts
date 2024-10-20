import { Component, Inject, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NavigationService } from 'ontimize-web-ngx';

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
  styleUrls: ['../login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});

  constructor(
    @Inject(NavigationService) public navigation: NavigationService,
    public injector: Injector,
    private fb: FormBuilder
  ) { }

  ngOnInit(): any {
    this.navigation.setVisible(false);
    this.registerForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      username: ['', [Validators.required]],
      newpassword: ['', [Validators.required]],
      confirmpassword: ['', [
        Validators.required,
        RetypeConfirm('newpassword')
      ]]
    });
  }

  register() {
    if(this.registerForm.valid) {
      // Register form valid
    } else {
      this.handleError({ status: 401 });
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
