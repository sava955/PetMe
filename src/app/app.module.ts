import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
//import { HeaderComponent } from './common/header/header.component';
import { AdsComponent } from './ads/ads.component';
import { AdsModule } from './ads/ads.module';
import { AuthModule } from './auth/auth.module';

const routes: Routes = [
    {path: '', redirectTo: '/ads', pathMatch: 'full'}
  
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AdsModule,
    RouterModule.forRoot(routes),
    MDBBootstrapModule.forRoot(),
    AuthModule
  ],
  providers: [],
  schemas: [ NO_ERRORS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
