import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ImgUnsplash } from './ViewModels/Gallery';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UnsplashService {
  private apiUrl = 'https://api.unsplash.com';
  private accessKey = 'GNHP_zqLNvBDawjULZEVcc60fjV2WtOQhUmvlQIQe8w';
  constructor(private http: HttpClient) {}

  searchPhotos(query: string): Observable<ImgUnsplash> {
    return this.http.get<ImgUnsplash>(
      `${this.apiUrl}/search/photos?query=${query}&client_id=${this.accessKey}`
    );
  }
}
