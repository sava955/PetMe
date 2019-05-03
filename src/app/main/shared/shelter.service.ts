import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
const PARAMS = new HttpParams({
  fromObject: {
    action: 'opensearch',
    format: 'json',
    origin: '*'
  }
});
@Injectable()
export class ShelterService {

  constructor(private http: HttpClient) { }

  public getShelterById(shelterId: string): Observable<any> {
    return this.http.get(`/api/v1/shelter/${shelterId}`);
  }

  public getShelter(shelterId: string): Observable<any> {
    return this.http.get(`/api/v1/shelter/${shelterId}/verified-shelter`);
  }

  public getShelters(): Observable<any> {
    return this.http.get('/api/v1/shelter');
  }

  public searchShelter(term: string): Observable<any> {
    if (term === '') {
      return of([]);
    }

    return this.http
      .get(`/api/v1/shelter?username=${term}`, { params: PARAMS.set('search', term) }).pipe(
        map(response => response)
      );
  }

  public createAd(ad: any): Observable<any> {
    return this.http.post('/api/v1/shelter', ad);
  }

  public updateAd(adId: string, adData: any): Observable<any> {
    return this.http.patch(`/api/v1/shelter/ad/${adId}`, adData);
  }

  public deleteAd(adId: string): Observable<any> {
    return this.http.delete(`/api/v1/shelter/ad/${adId}`);
  }

  public updateProfile(shelterId: string, shelterData: any): Observable<any> {
    return this.http.patch(`api/v1/shelter/${shelterId}`, shelterData);
  }

}