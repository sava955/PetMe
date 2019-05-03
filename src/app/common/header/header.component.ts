import { Component, OnInit, ViewChild, HostBinding } from '@angular/core';
import { AuthService } from '../../auth/shared/auth.service';
import { ShelterService } from '../../main/shared/shelter.service';
import { Router } from '@angular/router';
import { Shelter } from '../../auth/shared/shelter.model';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  startWith,
  map
} from 'rxjs/operators';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  shelter: any;
  //shelter: Shelter[];
  myControl = new FormControl();
  //options: Shelter[] = [];
  optionsShelter: any;
  optionsUser: any;
  //filteredShelterOptions: Observable<Shelter[]> = null;
  filteredShelterOptions: Observable<any[]> = null;
  filteredUserOptions: Observable<any[]> = null;


  constructor(public auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    const shelterObservable = this.auth.getShelter();

    shelterObservable.subscribe(
      (optionsShelter: any) => {
        this.optionsShelter = optionsShelter;
      })
    this.filteredShelterOptions = this.myControl.valueChanges.pipe(
      startWith<string | any>(''),
      map(value => typeof value === 'string' ? value : value.username),
      map(username => username ? this._filterUsername(username) : this.optionsShelter.slice()),
      map(value => typeof value === 'string' ? value : value.avatar),
      map(avatar => avatar ? this._filterAvatar(avatar) : this.optionsShelter.slice())
    );
    /*const userObservable = this.auth.getUser();

    userObservable.subscribe(
      (options: any) => {
        this.options = options;
      })
    this.filteredUserOptions = this.myControl.valueChanges.pipe(
      startWith<string | any>(''),
      map(value => typeof value === 'string' ? value : value.username),
      map(username => username ? this._filter(username) : this.options.slice())
    );*/

  }

  displayFn(shelter?: Shelter, user?: any): string | undefined {
    if (shelter !== null) {
      return shelter.username;
    }

    if (user !== null) {
      return user.username;
    }

    /*if (user !== null) {}
    return shelter ? shelter.username : undefined;*/
  }

  private _filterUsername(username: string): any[] {
    const filterValue = username.toLowerCase();
    
    return this.optionsShelter.filter(optionShelter => optionShelter.username.toLowerCase().indexOf(filterValue) === 0);
    
  }

  private _filterAvatar(avatar: string): any {
    const filterAvatar = avatar.toLowerCase();

    return this.optionsShelter.filter(optionShelter => optionShelter.avatar.toLowerCase().indexOf(filterAvatar) === 0);
  }

  goToProfile() {
    if (this.auth.getShelterId() !== undefined) {
        this.router.navigate(['/main/shelter/shelter-profile', { profile: 'success' }]);
      }

    if (this.auth.getUserId() !== undefined) {
        this.router.navigate(['/main/user/user-profile', { profile: 'success' }]);
      }
  }
  
  goToProfileSettings() {
    if (this.auth.getShelterId() !== undefined) {
        this.router.navigate(['/main/shelter/shelter-profile-edit', { profile: 'edit' }]);
      }

    if (this.auth.getUserId() !== undefined) {
        this.router.navigate(['/main/user/user-profile-edit', { profile: 'success' }]);
      }
  }


  logout() {
    this.auth.logout();

    this.router.navigate(['/auth/login']);
  }

}
