import { Component } from '@angular/core';
import { AuthRoutingModule } from '../../auth/auth-routing-module';

@Component({
  selector: 'app-auth-layout',
  imports: [AuthRoutingModule],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css',
})
export class AuthLayoutComponent {}
