import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Ad } from './ad.model';

@Injectable()
export class AdsService {

  constructor(private http: HttpClient) { }

  public getAdById(adId: string): Observable<any> {
    return this.http.get('/api/v1/ads/' + adId);
  }

  public getAds(): Observable<any> {
    return this.http.get('/api/v1/ads');
  }
  
  public getAdsByGender(gender: string): Observable<any> {
    return this.http.get(`/api/v1/ads?gender=${gender}`);
  }
  
  public getAdsByCategory(category: string): Observable<any> {
    return this.http.get(`/api/v1/ads?category=${category}`);
  }

  public verifyAdShelter(adId: string): Observable<any> {
    return this.http.get(`api/v1/ads/${adId}/verify-shelter`);
  }
  
  public verifyAdUser(adId: string): Observable<any> {
    return this.http.get(`api/v1/ads/${adId}/verify-user`);
  }
}