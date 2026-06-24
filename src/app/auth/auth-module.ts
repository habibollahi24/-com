import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';

import { AuthRoutingModule } from './auth-routing-module';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared-module';

@NgModule({
  declarations: [SigninComponent, SignupComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    JsonPipe,
    SharedModule,
  ],
})
export class AuthModule {}
