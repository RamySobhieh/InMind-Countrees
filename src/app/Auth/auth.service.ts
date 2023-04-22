import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../ViewModels/LoginResponse';
import { SignUpResponse } from '../ViewModels/SignUpResponse';
import jwt_decode from 'jwt-decode';

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

  logOut(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  refresh(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    const body = { refreshToken };
    return this.http
      .post<any>('http://173.249.40.235:5005/api/User/RefreshToken()', body)
      .pipe(
        tap((response) => {
          localStorage.setItem('accessToken', response.AccessToken);
          localStorage.setItem('refreshToken', response.RefreshToken);
        })
      );
  }

  validateAccessToken() {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return false;
    else {
      const decodedToken: any = jwt_decode(accessToken);
      const tokenDate = decodedToken.exp * 1000;
      const currDate = Date.now();
      return tokenDate > currDate;
    }
  }

  validateRefreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return false;
    else {
      const decodedToken: any = jwt_decode(refreshToken);
      const tokenDate = decodedToken.exp * 1000;
      const currDate = Date.now();
      return tokenDate > currDate;
    }
  }
}
