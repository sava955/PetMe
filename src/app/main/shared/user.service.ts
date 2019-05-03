import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) {}

    public getUserById(userId: string): Observable<any> {
        return this.http.get(`api/v1/users/${userId}`);
    }

    public getUser(userId: string): Observable<any> {
        return this.http.get(`/api/v1/users/${userId}/verified-user`);
    }

    public updateProfile(userId: string, userData: any): Observable<any> {
        return this.http.patch(`/api/v1/users/${userId}`, userData);
    }

    public createAd(ad: any): Observable<any> {
        return this.http.post('/api/v1/users', ad);
    }

    public updateAd(adId: string, adData: any): Observable<any> {
        return this.http.patch(`/api/v1/users/ad/${adId}`, adData);
    }

    public deleteAd(adId: string): Observable<any> {
        return this.http.delete(`/api/v1/users/ad/${adId}`);
    }
}