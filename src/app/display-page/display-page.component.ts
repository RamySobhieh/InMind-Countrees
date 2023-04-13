import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { CountryServiceService } from '../country-service.service';
import { UnsplashService } from '../unsplash.service';
import { ImgUnsplash } from '../ViewModels/Gallery';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-display-page',
  templateUrl: './display-page.component.html',
  styleUrls: ['./display-page.component.scss'],
})
export class DisplayPageComponent {
  public isAdmin: boolean = false;
  public countryName: string = '';
  public faUser = faUser;
  public country: any;
  public isLoading: boolean = true;
  public imgUnsplash: ImgUnsplash = {} as ImgUnsplash;
  public username: string = '';

  constructor(
    private route: ActivatedRoute,
    private countryService: CountryServiceService,
    private imgSerivce: UnsplashService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const decodedToken: any = jwt_decode(accessToken);
      this.username = decodedToken.given_name;
      if (decodedToken.realm_access.roles[2]) {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    } else {
      this.router.navigate(['/auth']);
    }
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.countryName = params.get('name') ?? '';

      this.countryService
        .getStrictByName(this.countryName)
        .subscribe((data) => {
          this.country = data;
          this.isLoading = false;
        });

      this.imgSerivce.searchPhotos(this.countryName).subscribe((data) => {
        this.imgUnsplash = data;
      });
    });
  }
}
