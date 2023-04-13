import { Component } from '@angular/core';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { CountryServiceService } from '../country-service.service';
import { Country } from '../ViewModels/Country';
import jwt_decode from 'jwt-decode';
import { AuthService } from '../Auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent {
  constructor(
    public countryService: CountryServiceService,
    private authService: AuthService,
    private router: Router
  ) {}
  faUser = faUser;
  username: string = '';

  isLoading: boolean = true;

  data: any;

  ngOnInit(): void {
    let token = localStorage.getItem('accessToken');
    if (token) {
      let decodedToken: any = jwt_decode(token);
      console.log(decodedToken);
      this.username = decodedToken.given_name;
    }
    this.countryService.data.subscribe((data) => {
      this.data = data;
    });
  }

  handleIsLoading = (): void => {
    this.isLoading = !this.isLoading;
  };

  logOut(): void {
    this.authService.logOut();
    this.router.navigate(['/auth']);
  }
}
