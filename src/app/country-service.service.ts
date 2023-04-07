import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country } from '../app/Country';
@Injectable({
  providedIn: 'root',
})
export class CountryServiceService {
  constructor(private http: HttpClient) {}

  data: Country[] = [];

  getAll(): Observable<Country[]> {
    return this.http.get<Country[]>('https://restcountries.com/v3.1/all');
  }

  getByName(name: string): Observable<Country[]> {
    return this.http.get<Country[]>(
      `https://restcountries.com/v3.1/name/${name}`
    );
  }
}
