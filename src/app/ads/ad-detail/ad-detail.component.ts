import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdsService } from '../shared/ads.service';
import { Ad } from '../shared/ad.model';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-ad-detail',
  templateUrl: './ad-detail.component.html',
  styleUrls: ['./ad-detail.component.scss']
})
export class AdDetailComponent implements OnInit {

  ad: Ad;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private route: ActivatedRoute,
              private adService: AdsService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.getAd(params['adId']);
      }
    )
    this.galleryOptions = [
      {
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
          breakpoint: 800,
          width: '100%',
          height: '600px',
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20
      },
      // max-width 400
      {
          breakpoint: 400,
          preview: false
      }
  ];

  this.galleryImages = [
      {
          small: '../../assets/images/cat3.jpeg',
          medium: '../../assets/images/cat3.jpeg',
          big: '../../assets/images/cat3.jpeg'
      },
      {
          small: '../../assets/images/cat3.jpeg',
          medium: '../../assets/images/cat3.jpeg',
          big: '../../assets/images/cat3.jpeg'
      }
  ];
  }

  getAd(adId:string) {
   this.adService.getAdById(adId).subscribe(
     (ad: Ad) => {
       this.ad = ad;
     }
   )
  }

}
