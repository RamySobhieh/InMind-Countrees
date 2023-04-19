import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { CountryServiceService } from '../country-service.service';
import { UnsplashService } from '../unsplash.service';
import { ImgUnsplash } from '../ViewModels/Gallery';
import jwt_decode from 'jwt-decode';
import { AuthService } from '../Auth/auth.service';

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
  public galleryArray: string[] = [];
  public username: string = '';
  public inEditMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private countryService: CountryServiceService,
    private imgSerivce: UnsplashService,
    private router: Router,
    private authService: AuthService
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
        this.imgUnsplash.results.forEach((result) => {
          this.galleryArray.push(result.urls.small);
        });
      });
    });
  }

  logOut(): void {
    this.authService.logOut();
    this.router.navigate(['/auth']);
  }

  handleEdit = () => {
    this.inEditMode = !this.inEditMode;
  };

  onUpload = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result?.toString();
      console.log(base64Image);
      if (base64Image != undefined) {
        this.galleryArray.push(base64Image);
      }
    };
    reader.readAsDataURL(file);
  };
}
