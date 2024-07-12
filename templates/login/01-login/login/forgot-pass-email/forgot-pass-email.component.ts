import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-pass-email',
  templateUrl: './forgot-pass-email.component.html',
  styleUrls: ['../login.component.scss']
})
export class ForgotPassEmailComponent implements OnInit {
  sendEmailForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder
  ) {

  }
  ngOnInit(): void {
    this.sendEmailForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]]
    });
  }

  sendEmail() {
    if (this.sendEmailForm.valid) {
      // Email valid
    } else {
      // Wrong email
    }
  }

}
