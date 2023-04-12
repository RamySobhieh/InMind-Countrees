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
})
export class SearchPageComponent {
  constructor(public countryService: CountryServiceService) {}
  faUser = faUser;

  isLoading: boolean = true;

  data: any;

  ngOnInit(): void {
    this.countryService.data.subscribe((data) => {
      this.data = data;
    });
  }

  handleIsLoading = (): void => {
    this.isLoading = !this.isLoading;
  };
}
