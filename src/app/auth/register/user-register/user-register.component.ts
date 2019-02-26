import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
  
  formData: any = {};
  errors: any[] = [];

  constructor(private auth: AuthService,
              private router: Router
              ) { }

  ngOnInit() {
  }

  register() {
    this.auth.registerUser(this.formData).subscribe(
      () => {
        this.router.navigate(['/auth/login', {registered: 'success'}]);
        
        
      },
      (errorResponse) => {
        this.errors = errorResponse.error.errors;
        
        
      }
    )
    
  }

}
