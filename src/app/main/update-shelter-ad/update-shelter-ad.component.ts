import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdsService } from '../shared/ads.service';
import { ShelterService } from '../shared/shelter.service';
import { Ad } from '../shared/ad.model';
import { UcWordsPipe } from 'ngx-pipes';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-update-shelter-ad',
  templateUrl: './update-shelter-ad.component.html',
  styleUrls: ['./update-shelter-ad.component.scss']
})
export class UpdateShelterAd implements OnInit {

  ad: Ad;
  adCategories: string[] = Ad.CATEGORIES;
  adGender: string[] = Ad.GENDER;
  locationSubject: Subject<any> = new Subject();

  constructor(private route: ActivatedRoute,
              private adService: AdsService,
              private shelterService: ShelterService,
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

  getAd(adId: string) {
   this.adService.getAdById(adId).subscribe(
     (ad: Ad) => {
       this.ad = ad;
     });
  }

  updateAd(adId: string, adData: any) {
    this.shelterService.updateAd(adId, adData).subscribe(
      (updatedAd: Ad) => {
        this.ad = updatedAd;
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
