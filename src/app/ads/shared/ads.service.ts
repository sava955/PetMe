import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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

  public createAd(ad): Observable<any> {
    return this.http.post('/api/v1/ads', ad);
  }

  public updatedAd(adId: string, adData: any): Observable<any> {
    return this.http.patch(`/api/v1/ads/${adId}`, adData);
  }
}