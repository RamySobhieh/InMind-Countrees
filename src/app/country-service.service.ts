import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { Country } from '../app/Country';
@Injectable({
  providedIn: 'root',
})
export class CountryServiceService {
  constructor(private http: HttpClient) {}

  public data: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  getAll(): Observable<any> {
    return this.http.get<any>('https://restcountries.com/v3.1/all');
  }

  getByName(name: string): Observable<any> {
    return this.http.get<any>(`https://restcountries.com/v3.1/name/${name}`);
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

  public getData(): any {
    return this.data.value;
  }

  public setData(data: any): void {
    this.data.next(data);
  }
}
