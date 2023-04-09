import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Country } from '../app/Country';
@Injectable({
  providedIn: 'root',
})
export class CountryServiceService {
  constructor(private http: HttpClient) {}

  public data: any;

  getAll(): Observable<any[]> {
    if (this.data) {
      return of(this.data);
    } else {
      return this.http
        .get<any>('https://restcountries.com/v3.1/all')
        .pipe(tap((data) => (this.data = data)));
    }
  }

  getByName(name: string): Observable<Country[]> {
    return this.http
      .get<Country[]>(`https://restcountries.com/v3.1/name/${name}`)
      .pipe(tap((data) => (this.data = data)));
  }

  getStrictByName(name: string): Observable<any> {
    return this.http.get<any>(
      `https://restcountries.com/v3.1/name/${name}?fullText=true`
    );
  }

  getByCode(code: string): Observable<any> {
    return this.http.get<any>(`
    https://restcountries.com/v3.1/alpha/${code}`);
  }
}
