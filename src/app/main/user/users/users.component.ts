import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  user: any;
  p: number = 1;

  constructor(private userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.getUser(params['userId']);
      }
    )
  }

  getUser(userId: string) {
    this.userService.getUserById(userId).subscribe(
      (user: any) => {
        this.user = user;
      }
    )
  }

}
