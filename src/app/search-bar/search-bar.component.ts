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

  @Input() searchCountry(country: Country[]): void {}

  public changeValue(event: Event): void {
    this.inputValue = (event.target as HTMLInputElement).value;
    if (this.inputValue == '') {
      this.countryService.getAll().subscribe((data) => {
        this.data = data;
      });
    } else {
      this.countryService.getByName(this.inputValue).subscribe((data) => {
        this.data = data;
      });
    }
    this.searchCountry(this.data);
  }
}
