import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      return true;
    } else {
      this.router.navigate(['/auth']);
      return false;
    }
  }
}
