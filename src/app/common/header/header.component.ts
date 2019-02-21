import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/shared/auth.service';
import { Router } from '@angular/router';
import { Shelter } from '../../auth/shared/shelter.model';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  startWith,
  map,
  debounceTime,
  mergeMapTo,
  mergeMap,
  switchMap,
  catchError
} from 'rxjs/operators';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  myControl = new FormControl();
  options: Shelter[] = [];
  filteredOptions: Observable<Shelter[]> = null;

  constructor(public auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    const shelterObservable = this.auth.getShelter();

    shelterObservable.subscribe(
      (options: Shelter[]) => {
        this.options = options;
      })
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith<string | Shelter>(''),
      map(value => typeof value === 'string' ? value : value.username),
      map(username => username ? this._filter(username) : this.options.slice())
    );


  }

  displayFn(shelter?: Shelter): string | undefined {
    return shelter ? shelter.username : undefined;
  }

  private _filter(username: string): Shelter[] {
    const filterValue = username.toLowerCase();

    return this.options.filter(option => option.username.toLowerCase().indexOf(filterValue) === 0);
  }

  logout() {
    this.auth.logout();

    this.router.navigate(['/auth/login']);
  }

}
