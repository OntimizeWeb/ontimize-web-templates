import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OTranslateService } from 'ontimize-web-ngx';

@Component({
  selector: 'app-forgot-pass-email',
  templateUrl: './forgot-pass-email.component.html',
  styleUrls: ['./forgot-pass-email.component.scss']
})
export class ForgotPassEmailComponent implements OnInit {
  sendEmailForm: FormGroup = new FormGroup({});

  isSpanish: boolean;

  constructor(
    private fb: FormBuilder,
    private _translateService: OTranslateService
  ) {

  }
  ngOnInit(): void {
    this.isSpanish = this._translateService.getCurrentLang() == "es" ? true : false;
    this.sendEmailForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]]
    });
  }

  changeLang(language): void {
    if (this._translateService && this._translateService.getCurrentLang() !== language) {
      this._translateService.use(language);
      this.isSpanish = language == "es" ? true : false;
    }
  }

  sendEmail() {
    if (this.sendEmailForm.valid) {
      // Valid email to change password
    } else {
      // Wrong email entered
    }
  }

}
