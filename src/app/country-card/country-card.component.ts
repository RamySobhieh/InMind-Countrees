import { Component, Input, OnInit } from '@angular/core';
import { CountryServiceService } from '../country-service.service';
@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.scss'],
})
export class CountryCardComponent implements OnInit {
  @Input() ImgSrc: string = '';
  @Input() countryName: string = '';
  @Input() continent: string = '';

  @Input() countryCode: string = '';

  constructor(private countryService: CountryServiceService) {}

  public country: any;

  ngOnInit(): void {
    if (this.countryCode != '') {
      this.countryService.getByCode(this.countryCode).subscribe((data) => {
        this.country = data;
      });
    }
  }
}
