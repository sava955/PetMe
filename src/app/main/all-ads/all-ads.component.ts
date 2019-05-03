import { Component, OnInit, Input } from '@angular/core';
import { AdsService } from '../shared/ads.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-ads',
  templateUrl: './all-ads.component.html',
  styleUrls: ['./all-ads.component.scss']
})
export class AllAdsComponent implements OnInit {
  @Input() searchCity: any;
  p: number = 1;
  ads: any;
  category: string;
  gender: string;

  constructor(private adsService: AdsService,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.getAds();
  }

  getAds() {
    this.adsService.getAds().subscribe(
      (ads: any) => {
        this.ads = ads;
      }
    )
  }

}
