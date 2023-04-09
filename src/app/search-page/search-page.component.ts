import {
  Component,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { CountryServiceService } from '../country-service.service';
import { Country } from '../Country';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageComponent {
  constructor(
    public countryService: CountryServiceService,
    private cdr: ChangeDetectorRef
  ) {}
  faUser = faUser;

  data: Country[] = [];

  ngOnInit(): void {
    this.cdr.detectChanges();
  }

  searchCountry = (country: Country[]): void => {
    this.data = country;
    this.cdr.detectChanges();
  };
}
