import {Component, Injectable, OnInit, Input, ViewChild, ViewEncapsulation} from '@angular/core';
import {Observable, Subject, merge, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap, filter} from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { ShelterService } from '../shared/shelter.service';
import { AuthService } from '../../auth/shared/auth.service';


@Component({
  selector: 'app-search-shelters',
  templateUrl: './search-shelters.component.html',
  styleUrls: ['./search-shelters.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchSheltersComponent  {
  model: any;
  searching = false;
  searchFailed = false;
  shelters: any;
  
  constructor(private shelterService: ShelterService, private auth: AuthService, private router: Router) {}
  
  search = (text$: Observable<string>) => 
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.shelterService.searchShelter(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )

    goToProfile() {
      if(this.auth.getShelterId() !== null) {
        return this.router.navigate(['/main/shelter/shelter-profile']); 
      } else {
        return this.router.navigate(['/main/shelter/{{model._id}}']);
      }
    }

    formatter = (x: { username: string }) => x.username;

}
