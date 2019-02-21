import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shelter-register',
  templateUrl: './shelter-register.component.html',
  styleUrls: ['./shelter-register.component.scss']
})
export class ShelterRegisterComponent implements OnInit {

  formData: any = {};

  constructor(private auth: AuthService,
              private router: Router
              ) { }

  ngOnInit() {
    this.formData = {};
  }

  register() {
    this.auth.registerShelter(this.formData).subscribe(
      () => {
        this.router.navigate(['./auth/login', {registered: "true"}]);
      }
    )
    
  }

}
