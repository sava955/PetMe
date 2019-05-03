import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';

import { HttpClientModule } from '@angular/common/http';
import { IsUrgentPipe } from '../common/pipes/is-urgent.pipe';
import { NgPipesModule, UcWordsPipe } from 'ngx-pipes';
import { SearchFilterPipe } from '../common/pipes/search-filter.pipes';
import { OrderByDatePipe } from '../common/pipes/order-by-date.pipe';
import { MapModule } from '../common/map/map.module';
import { FormsModule } from '@angular/forms';
import { EditableModule } from '../common/components/editable/editable.module';
import { ImageUploadModule } from '../common/components/image-upload/image-upload.module';
import { HeaderComponent } from '../common/header/header.component';
import { MainComponent } from './main.component';
import { AdsListComponent } from './ads-list/ads-list.component';
import { UrgentAdsComponent } from './urgent-ads/urgent-ads.component';
import { AdCreateComponent } from './ad-create/ad-create.component';
import { AdNavigationComponent } from './ad-navigation/ad-navigation.component';
import { OtherAdsComponent } from './other-ads/other-ads.component';
import { AdsService } from './shared/ads.service';
import { UserService } from './shared/user.service';
import { ShelterService } from './shared/shelter.service';
import { AdDetailComponent } from './ad-detail/ad-detail.component';
import { SearchCategoryComponent } from './search-category/search-category.component'; 
import { NgxGalleryModule } from 'ngx-gallery';
import { AuthGuard } from '../auth/shared/auth.guard';
import { ShelterAdGuard } from './shared/shelter-ad.guard';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { UpdateShelterAd } from './update-shelter-ad/update-shelter-ad.component';
import { ShelterComponent } from './shelter/shelter.component';
import { ShelterDetailComponent } from './shelter/shelter-detail/shelter-detail.component';
import { SearchGenderComponent } from './search-gender/search-gender.component';
import { AllAdsComponent } from './all-ads/all-ads.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';

import { ShelterProfileUpdateComponent } from './shelter/shelter-profile-update/shelter-profile-update.component';
import { FilterPipe } from '../common/pipes/filter.pipe';
import { SearchSheltersComponent } from './search-shelters/search-shelters.component';
import { SheltersComponent } from './shelter/shelters/shelters.component';
import { UserProfileUpdateComponent } from './user/user-profile-update/user-profile-update.component';
import { UsersComponent } from './user/users/users.component';
import { UpdateUserAdComponent } from './update-user-ad/update-user-ad.component';
import { UserAdGuard } from './shared/user-ad.guard';

const routes: Routes = [
  {path: 'main',
   component: MainComponent,
   children: [
     {path: '', component: AdsListComponent, children: [
        {path: '', component: AllAdsComponent},
        {path: ':category/category', component: SearchCategoryComponent},
        {path: ':gender/gender', component: SearchGenderComponent}
     ]},
     {path: 'new', component: AdCreateComponent, canActivate: [AuthGuard]},
     {path: ':adId/shelter-ad-edit', component: UpdateShelterAd, canActivate: [AuthGuard, ShelterAdGuard]},
     {path: ':adId/user-ad-edit', component: UpdateUserAdComponent, canActivate: [AuthGuard, UserAdGuard]},
     {path: ':adId', component: AdDetailComponent},
     {path: 'shelter', component: ShelterComponent, children: [
      {path: 'shelter-profile', component: ShelterDetailComponent, canActivate: [AuthGuard]},
      {path: 'shelter-profile-edit', component: ShelterProfileUpdateComponent, canActivate: [AuthGuard]},
      {path: ':shelterId', component: SheltersComponent}
     ]},
     {path: 'user', component: UserComponent, children: [
       {path: 'user-profile', component: UserDetailComponent, canActivate: [AuthGuard]},
       {path: 'user-profile-edit', component: UserProfileUpdateComponent, canActivate: [AuthGuard]},
       {path: ':userId', component: UsersComponent}
     ]}
     
  ]}];


 
@NgModule({
  declarations: [
    HeaderComponent,
    MainComponent,
    AdsListComponent,
    UrgentAdsComponent,
    AdDetailComponent,
    AdCreateComponent,
    IsUrgentPipe,
    SearchFilterPipe,
    OrderByDatePipe,
    UpdateShelterAd,
    AdNavigationComponent,
    OtherAdsComponent,
    SearchCategoryComponent,
    ShelterComponent,
    SheltersComponent,
    ShelterDetailComponent,
    SearchGenderComponent,
    AllAdsComponent,
    UserComponent,
    UserDetailComponent,
    ShelterProfileUpdateComponent,
    FilterPipe,
    SearchSheltersComponent,
    UserProfileUpdateComponent,
    UsersComponent,
    UpdateUserAdComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    HttpClientModule,
    MapModule,
    FormsModule,
    EditableModule,
    ImageUploadModule,
    NgxGalleryModule,
    CarouselModule
  ],
  providers: [
    AdsService,
    UserService,
    ShelterService, 
    AuthGuard,
    ShelterAdGuard,
    UserAdGuard,
    UcWordsPipe
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  bootstrap: [MainComponent]
})
export class MainModule { }