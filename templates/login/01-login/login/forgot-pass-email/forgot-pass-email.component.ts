import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-pass-email',
  templateUrl: './forgot-pass-email.component.html',
  styleUrls: ['./forgot-pass-email.component.scss']
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
      console.log("email valid");
    } else {
      console.log("wrong email");
    }
  }

}
