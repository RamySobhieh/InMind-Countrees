import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { CountryServiceService } from '../country-service.service';
import { Country } from '../Country';
import { UnsplashService } from '../unsplash.service';
import { ImgUnsplash } from '../Gallery';

@Component({
  selector: 'app-display-page',
  templateUrl: './display-page.component.html',
  styleUrls: ['./display-page.component.scss'],
})
export class DisplayPageComponent {
  public countryName: string = '';
  public faUser = faUser;
  public country: any;
  public isLoading: boolean = true;
  public imgUnsplash: ImgUnsplash = {} as ImgUnsplash;

  constructor(
    private route: ActivatedRoute,
    private countryService: CountryServiceService,
    private imgSerivce: UnsplashService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.countryName = params.get('name') ?? '';
    });

    this.countryService.getStrictByName(this.countryName).subscribe((data) => {
      this.country = data;
      this.isLoading = false;
    });

    this.imgSerivce.searchPhotos(this.countryName).subscribe((data) => {
      this.imgUnsplash = data;
    });
  }
}
