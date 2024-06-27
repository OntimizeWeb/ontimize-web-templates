import { AfterViewInit, Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { ActivatedRoute } from '@angular/router';
import { AuthService, NavigationService } from 'ontimize-web-ngx';

function RetypeConfirm(newpassword: string): ValidatorFn {
  return (control: FormControl) => {
    if (!control || !control.parent) {
      return null;
    }
    return control.parent.get(newpassword).value === control.value ? null : { mismatch: true };
  };
}

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ForgotPassComponent implements OnInit, AfterViewInit {
  changePassForm: FormGroup = new FormGroup({});

  @ViewChild ('checkbox', {static: true}) rememberChk: MatCheckbox;

  constructor(
    @Inject(NavigationService) public navigation: NavigationService,
    @Inject(AuthService) private authService: AuthService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): any {
    this.navigation.setVisible(false);
    this.changePassForm = this.fb.group({
      newpassword: ['', [Validators.required]],
      confirmpassword: ['', [
        Validators.required,
        RetypeConfirm('newpassword')
      ]]
    });
  }

  ngAfterViewInit(): any {
    if (this.authService.isLoggedIn()) {
      return;
    }
  }

  changePass() {
    const username = this.activatedRoute.snapshot.params['USERNAME'];
    const password1 = this.changePassForm.value.newpassword;
    const password2 = this.changePassForm.value.confirmpassword;

    if(password1 && password2 && username) {
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
