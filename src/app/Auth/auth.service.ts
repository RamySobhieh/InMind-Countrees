import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from '../ViewModels/LoginResponse';
import { SignUpResponse } from '../ViewModels/SignUpResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://173.249.40.235:5005/api/User';
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/Login()`, {
      username,
      password,
    });
  }

  signUp(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    RoleName: string
  ): Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>(`${this.apiUrl}/SignUp()`, {
      firstName,
      lastName,
      email,
      password,
      RoleName,
    });
  }

  signUpAdmin(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    RoleName: string
  ): Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>(`${this.apiUrl}/CreateAdminUser()`, {
      firstName,
      lastName,
      email,
      password,
      RoleName,
    });
  }
}
