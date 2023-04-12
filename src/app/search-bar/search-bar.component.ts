import { Component, Input } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { CountryServiceService } from '../country-service.service';
import { Country } from '../Country';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

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
  public currSearch: string = '';
  public filtersArrays: string[] = [];

  @Input() handleIsLoading(): void {}

  ngOnInit(): void {
    this.countryService.getAll().subscribe((data) => {
      this.data = data;
      this.countryService.setData(this.data);
      this.handleIsLoading();
    });
  }
  public changeValue(event: Event): void {
    this.handleIsLoading();
    this.inputValue = (event.target as HTMLInputElement).value;
    if (this.inputValue == '') {
      this.countryService
        .getAll()
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log('Error:', error);
            this.countryService.setData([]);
            this.handleIsLoading();
            return throwError('Something went wrong');
          })
        )
        .subscribe((data) => {
          this.data = data;
          if (this.filtersArrays.length > 0) {
            this.filterCountries(this.filtersArrays);
          } else {
            this.countryService.setData(this.data);
          }
          this.handleIsLoading();
        });
    } else {
      this.currSearch = this.inputValue;
      this.countryService
        .getByName(this.inputValue)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log('Error:', error);
            this.countryService.setData([]);
            this.handleIsLoading();
            return throwError('Something went wrong');
          })
        )
        .subscribe((data) => {
          this.data = data;
          if (this.filtersArrays.length > 0) {
            this.filterCountries(this.filtersArrays);
          } else {
            this.countryService.setData(this.data);
          }
          this.handleIsLoading();
        });
    }
  }

  onFiltersChanged(filters: string[]): void {
    this.handleIsLoading();
    this.filtersArrays = filters;
    if (this.filtersArrays.length > 0) {
      this.filterCountries(this.filtersArrays);
      this.handleIsLoading();
    } else {
      if (this.currSearch === '') {
        this.countryService.getAll().subscribe((data) => {
          this.data = data;
          this.countryService.setData(this.data);
          this.handleIsLoading();
        });
      } else {
        this.countryService.getByName(this.currSearch).subscribe((data) => {
          this.data = data;
          this.countryService.setData(this.data);
          this.handleIsLoading();
        });
      }
    }
  }

  filterCountries(filters: string[]): void {
    this.countryService.setData(
      this.data.filter((country) => filters.includes(country.continents[0]))
    );
  }
}
