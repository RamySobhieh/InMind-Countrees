import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Auth/auth.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup = new FormGroup({});
  @Input() onChange() {}
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      isAdmin: [false, [Validators.required]],
    });
  }

  public onSubmit(): void {
    if (this.signUpForm.invalid) {
      console.log('Invalid Form');
      return;
    } else {
      let role = '';
      if (this.signUpForm.get('isAdmin')?.value === true) {
        this.authService
          .signUpAdmin(
            this.signUpForm.get('email')?.value,
            this.signUpForm.get('password')?.value,
            this.signUpForm.get('firstName')?.value,
            this.signUpForm.get('lastName')?.value,
            role
          )
          .pipe(
            catchError((error: HttpErrorResponse) => {
              console.log('Error:', error);
              return throwError('Something went wrong');
            })
          )
          .subscribe((data) => {
            this.authService
              .login(data.email, this.signUpForm.get('password')?.value)
              .subscribe((data) => {
                if (data.Login.AccessToken && data.Login.RefreshToken) {
                  localStorage.setItem('accessToken', data.Login.AccessToken);
                  localStorage.setItem('refreshToken', data.Login.RefreshToken);
                  this.router.navigate(['/']);
                }
              });
          });
      } else {
        this.authService
          .signUp(
            this.signUpForm.get('email')?.value,
            this.signUpForm.get('password')?.value,
            this.signUpForm.get('firstName')?.value,
            this.signUpForm.get('lastName')?.value,
            role
          )
          .pipe(
            catchError((error: HttpErrorResponse) => {
              console.log('Error:', error);
              return throwError('Something went wrong');
            })
          )
          .subscribe((data) => {
            this.authService
              .login(data.email, this.signUpForm.get('password')?.value)
              .subscribe((data) => {
                if (data.Login.AccessToken && data.Login.RefreshToken) {
                  localStorage.setItem('accessToken', data.Login.AccessToken);
                  localStorage.setItem('refreshToken', data.Login.RefreshToken);
                  this.router.navigate(['/']);
                }
              });
          });
      }
    }
  }
}
