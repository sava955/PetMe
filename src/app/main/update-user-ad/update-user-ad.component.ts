import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdsService } from '../shared/ads.service';
import { UserService } from '../shared/user.service';
import { Ad } from '../shared/ad.model';
import { UcWordsPipe } from 'ngx-pipes';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-update-user-ad',
  templateUrl: './update-user-ad.component.html',
  styleUrls: ['./update-user-ad.component.scss']
})
export class UpdateUserAdComponent implements OnInit {

  ad: Ad;
  adCategories: string[] = Ad.CATEGORIES;
  adGender: string[] = Ad.GENDER;
  locationSubject: Subject<any> = new Subject();

  constructor(private route: ActivatedRoute,
              private adService: AdsService,
              private userService: UserService,
              private upperPipe: UcWordsPipe) {
                this.transformLocation = this.transformLocation.bind(this);
              }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.getAd(params['adId']);
      });
  }
  
  transformLocation(location: string): string {
    return this.upperPipe.transform(location);
  }

  getAd(adId:string) {
   this.adService.getAdById(adId).subscribe(
     (ad) => {
       this.ad = ad;
     });
  }

  updateAd(adId: string, adData: any) {
    this.userService.updateAd(adId, adData).subscribe(
      (updatedAd: Ad) => {
        debugger;
        this.ad = updatedAd;
        debugger;
        if (adData.city || adData.street) {
          this.locationSubject.next(this.ad.city + ', ' + this.ad.street)
        }
      },
      () => {
        this.getAd(adId);
      }
    )
  }  

}
