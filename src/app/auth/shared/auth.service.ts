import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Shelter } from '../shared/shelter.model';

class DecodedToken {
  exp: number = 0;
  username: string = '';
}

@Injectable()
export class AuthService {
  private decodedToken;

  constructor(private http: HttpClient) {
    this.decodedToken = JSON.parse(localStorage.getItem('pet-me_meta')) || new DecodedToken();
  }

  private saveToken(token: string): string {
    const jwt = new JwtHelperService();
    this.decodedToken = jwt.decodeToken(token);

    localStorage.setItem('pet-me_auth', token);
    localStorage.setItem('pet-me_meta', JSON.stringify(this.decodedToken));

    return token;
  }

  private getExpiration() {
    return (moment.unix(this.decodedToken.exp));
  }

  public getShelter(): Observable<any> {
    return this.http.get('/api/v1/shelter');
  }

  public registerUser(userData: any): Observable<any> {
    return this.http.post('api/v1/users/register', userData);
  }

  public registerShelter(shelterData: any): Observable<any> {
    return this.http.post('api/v1/shelter/register', shelterData);
  }

  public loginUser(userData: any): Observable<any> {
    return this.http.post('api/v1/users/auth', userData).pipe(map(
      (token: string) => this.saveToken(token))
    );
  }

  public loginShelter(shelterData: any): Observable<any> {
    return this.http.post('api/v1/shelter/auth', shelterData).pipe(map(
      (token: string) => this.saveToken(token))
    );
  }

  public logout() {
    localStorage.removeItem('pet-me_auth');
    localStorage.removeItem('pet-me_meta');

    this.decodedToken = new DecodedToken();
  }

  public isAuthenticated(): boolean {

    return moment().isBefore(this.getExpiration());
  }

  public getAuthToken(): string {
    return localStorage.getItem('pet-me_auth');
  }

  public getUsername(): string {
    return this.decodedToken.username;
  }

}