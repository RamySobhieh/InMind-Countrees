import { Component, Input } from '@angular/core';
import { Root } from '../Country';
@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.scss'],
})
export class CountryCardComponent {
  @Input() ImgSrc: string = '';
  @Input() countryName: string = '';
  @Input() continent: string = '';
  @Input() countryId: number = 0;
}
