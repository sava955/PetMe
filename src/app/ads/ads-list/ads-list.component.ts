import { Component, OnInit } from '@angular/core';
import { AdsService } from '../shared/ads.service';
import { Ad } from '../shared/ad.model';

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrls: ['./ads-list.component.scss']
})
export class AdsListComponent implements OnInit {

  ads: Ad[] = [];

  constructor(private adService: AdsService) { }

  ngOnInit() {
    const adObservable = this.adService.getAds();

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
