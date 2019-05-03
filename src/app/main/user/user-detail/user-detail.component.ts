import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/shared/auth.service';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  user: any;
  adDeleteIndex: number;
  p: number = 1;

  constructor(private auth: AuthService,
              private userService: UserService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    const userId = this.auth.getUserId();

    this.userService.getUser(userId).subscribe((user) => {
      this.user = user;
    }, (error) => {});
  }

  deleteAd(adId: string) {
    this.userService.deleteAd(adId).subscribe(
      () => {
        this.user.ads.splice(this.adDeleteIndex, 1);
        this.adDeleteIndex = undefined;
      }
    )
  }

}
