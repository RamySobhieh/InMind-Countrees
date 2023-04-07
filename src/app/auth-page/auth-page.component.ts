import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent {
  isLogin: boolean = true;

  onChange = (): void => {
    this.isLogin = !this.isLogin;
  };
}
