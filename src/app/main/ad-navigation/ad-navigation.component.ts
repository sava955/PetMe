import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdsService } from '../shared/ads.service';
import { AuthService } from '../../auth/shared/auth.service';
import { Ad } from '../shared/ad.model';

@Component({
  selector: 'app-ad-navigation',
  templateUrl: './ad-navigation.component.html',
  styleUrls: ['./ad-navigation.component.scss']
})
export class AdNavigationComponent implements OnInit {
  
  ads: Ad[] = [];
  adCategories = Ad.CATEGORIES;
  city: string;
  filterCategories: Ad[] = [];

  constructor(private adsService: AdsService,
              private auth: AuthService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const adObservable = this.adsService.getAds();

    adObservable.subscribe(
      (ads: Ad[]) => {
        this.ads = ads;
      },
      (err) => {

      },
      () => {

      }
    );
  }

  

}
