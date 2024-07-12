import { NgModule } from '@angular/core';
import { OntimizeWebModule } from 'ontimize-web-ngx';

import { SharedModule } from '../shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPassEmailComponent } from './forgot-pass-email/forgot-pass-email.component';

@NgModule({
  imports: [
    SharedModule,
    OntimizeWebModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPassEmailComponent
  ]
})
export class LoginModule { }
