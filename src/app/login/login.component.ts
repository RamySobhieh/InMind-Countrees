import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
  @Input() onChange() {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  public onSubmit(): void {
    if (this.loginForm.invalid) {
      console.log('Invalid Form');
      return;
    } else {
      this.authService
        .login(
          this.loginForm.get('email')?.value,
          this.loginForm.get('password')?.value
        )
        .subscribe((data) => {
          console.log(data);
          if (data.Login.AccessToken && data.Login.RefreshToken) {
            localStorage.setItem('accessToken', data.Login.AccessToken);
            localStorage.setItem('refreshToken', data.Login.RefreshToken);
            this.router.navigate(['/']);
          }
        });
    }
  }
}
