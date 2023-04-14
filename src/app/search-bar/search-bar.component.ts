import { Component, Input } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { CountryServiceService } from '../country-service.service';
import { Country } from '../ViewModels/Country';
import { catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  constructor(private countryService: CountryServiceService) {}
  faMagnifyingGlass = faMagnifyingGlass;
  public data: Country[] = [];
  public currSearch: string = '';
  public filtersArrays: string[] = [];
  searchControl = new FormControl();

  @Input() handleIsLoading(): void {}

  ngOnInit(): void {
    this.countryService.getAll().subscribe((data) => {
      this.data = data;
      this.countryService.setData(this.data);
      this.handleIsLoading();
    });

    // formControlSubsbscription
    this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.handleIsLoading();
        if (value == '') {
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
            .subscribe((response) => {
              this.data = response;
              if (this.filtersArrays.length > 0) {
                this.filterCountries(this.filtersArrays);
              } else {
                this.countryService.setData(this.data);
              }
              this.handleIsLoading();
            });
        } else {
          this.currSearch = value;
          this.countryService
            .getByName(value)
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
              console.log(this.data);
              if (this.filtersArrays.length > 0) {
                this.filterCountries(this.filtersArrays);
              } else {
                this.countryService.setData(this.data);
              }
              this.handleIsLoading();
            });
        }
      });
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
