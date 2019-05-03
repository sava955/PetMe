import { Component, OnInit } from '@angular/core';
import { AdsService } from '../shared/ads.service';
import { Ad } from '../shared/ad.model';

@Component({
  selector: 'app-urgent-ads',
  templateUrl: './urgent-ads.component.html',
  styleUrls: ['./urgent-ads.component.scss']
})
export class UrgentAdsComponent implements OnInit {

  ads: Ad[] = [];

  constructor(private adService: AdsService) { }

  ngOnInit() {
    const adObservable = this.adService.getAds();
    adObservable.subscribe((ads: Ad[]) => {
      this.ads = ads;
    });
  }

  customOptions: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['',''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      }
    },
    nav: false
  }


}
