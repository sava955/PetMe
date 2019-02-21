import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { IsUrgentPipe } from '../common/pipes/is-urgent.pipe';
import { SearchFilterPipe } from '../common/pipes/search-filter.pipes';
import { MapModule } from '../common/map/map.module';
import { FormsModule } from '@angular/forms';
import { EditableModule } from '../common/components/editable/editable.module';

import { HeaderComponent } from '../common/header/header.component';
import { AdsComponent } from './ads.component';
import { AdsListComponent } from './ads-list/ads-list.component';
import { UrgentAdsComponent } from './urgent-ads/urgent-ads.component';
import { OtherAdsComponent } from './other-ads/other-ads.component';
import { AdNavigationComponent } from './ad-navigation/ad-navigation.component';
import { AdCreateComponent } from './ad-create/ad-create.component';

import { AdsService } from './shared/ads.service';
import { AdDetailComponent } from './ad-detail/ad-detail.component'; 

import { NgxGalleryModule } from 'ngx-gallery';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule, MatSelectModule } from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AuthGuard } from '../auth/shared/auth.guard';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { AdUpdateComponent } from './ad-update/ad-update.component';

const routes: Routes = [
  {path: 'ads',
   component: AdsComponent,
   children: [
     {path: '', component: AdsListComponent},
     {path: 'new', component: AdCreateComponent, canActivate: [AuthGuard]},
     {path: ':adId/edit', component: AdUpdateComponent, canActivate: [AuthGuard]},
     {path: ':adId', component: AdDetailComponent}
   ]}
];
 
@NgModule({
  declarations: [
    HeaderComponent,
    AdsComponent,
    AdsListComponent,
    UrgentAdsComponent,
    OtherAdsComponent,
    AdDetailComponent,
    AdNavigationComponent,
    AdCreateComponent,
    IsUrgentPipe,
    SearchFilterPipe,
    AdUpdateComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forChild(routes),
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    MapModule,
    FormsModule,
    EditableModule,
    NgxGalleryModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    CarouselModule
  ],
  providers: [AdsService, AuthGuard],
  schemas: [ NO_ERRORS_SCHEMA ],
  bootstrap: [AdsComponent]
})
export class AdsModule { }