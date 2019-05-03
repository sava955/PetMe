import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { AuthService } from '../../../auth/shared/auth.service';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-profile-update',
  templateUrl: './user-profile-update.component.html',
  styleUrls: ['./user-profile-update.component.scss']
})
export class UserProfileUpdateComponent implements OnInit {
  user: any;
  locationSubject: Subject<any> = new Subject();
  usernameSubject: Subject<any> = new Subject();
  adDeleteIndex: number;
  p: number = 1;

  constructor(private userService: UserService,
              private auth: AuthService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    const userId = this.auth.getUserId();

    this.userService.getUser(userId).subscribe(
      (user) => {
        this.user = user;
      }, (err) => {

      }
    )
  }

  deleteAd(adId: string) {
    this.userService.deleteAd(adId).subscribe(
      () => {
        this.user.ads.splice(this.adDeleteIndex, 1);
        this.adDeleteIndex = undefined;
      }
    )
  }

  updateProfile(userId: string, userData: string) {
    this.userService.updateProfile(userId, userData).subscribe(
      (user) => {
        this.user = user;
      },
      () => {
        this.getUser();
      }
    )
  }

}
