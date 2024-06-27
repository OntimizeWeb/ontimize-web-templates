import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavigationService } from 'ontimize-web-ngx/lib/services/navigation.service';
import { OTranslateService } from 'ontimize-web-ngx/lib/services/translate/o-translate.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-forgot-pass-email',
  templateUrl: './forgot-pass-email.component.html',
  styleUrls: ['./forgot-pass-email.component.scss']
})
export class ForgotPassEmailComponent implements OnInit {
  sendEmailForm: FormGroup = new FormGroup({});

  isSpanish: boolean;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
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
    if (this.sendEmailForm.value.email) {
      this.httpClient.post<any>(`${this.router.getCurrentNavigation().extractedUrl.toString}`, { email: this.sendEmailForm.value.email }).subscribe(
        value => {
          console.log(value);
        }
      );
    } else {

    }
  }

}
