import { Component, Input } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { CountryServiceService } from '../country-service.service';
import { Country } from '../Country';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  constructor(private countryService: CountryServiceService) {}
  faMagnifyingGlass = faMagnifyingGlass;
  public inputValue: string = '';
  public data: Country[] = [];
  public filteredCountries: Country[] = [];
  public filtersArrays: string[] = [];

  @Input() searchCountry(country: Country[]): void {}
  @Input() handleIsLoading(): void {}

  ngOnInit(): void {
    this.countryService.getAll().subscribe((data) => {
      this.data = data;
      this.filteredCountries = data;
      this.searchCountry(data);
      this.handleIsLoading();
    });
  }
  public changeValue(event: Event): void {
    this.handleIsLoading();
    this.inputValue = (event.target as HTMLInputElement).value;
    if (this.inputValue == '') {
      this.countryService.getAll().subscribe((data) => {
        this.data = data;
        if (this.filtersArrays.length > 0) {
          this.filterCountries(this.filtersArrays);
        }
      });
      this.handleIsLoading();
    } else {
      this.countryService.getByName(this.inputValue).subscribe((data) => {
        this.data = data;
        if (this.filtersArrays.length > 0) {
          this.filterCountries(this.filtersArrays);
        }
      });
      this.handleIsLoading();
    }
    this.searchCountry(this.data);
  }

  onFiltersChanged(filters: string[]) {
    this.filtersArrays = filters;
    this.filteredCountries = this.data.filter((country) =>
      filters.includes(country.continents[0])
    );
    if (filters.length > 0) {
      this.searchCountry(this.filteredCountries);
    } else {
      this.searchCountry(this.data);
    }
  }

  filterCountries(filters: string[]) {
    this.filteredCountries = this.data.filter((country) =>
      filters.includes(country.continents[0])
    );
    this.searchCountry(this.filteredCountries);
  }
}
