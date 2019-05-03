import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdsService } from '../shared/ads.service';
import { UserService } from '../shared/user.service';
import { ShelterService } from '../shared/shelter.service';
import { AuthService } from '../../auth/shared/auth.service';
import { Router } from '@angular/router';
import { Ad } from '../shared/ad.model';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-ad-detail',
  templateUrl: './ad-detail.component.html',
  styleUrls: ['./ad-detail.component.scss']
})
export class AdDetailComponent implements OnInit {

  ad: any;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = [];

  constructor(private route: ActivatedRoute,
              private adService: AdsService,
              private userService: UserService,
              private shelterService: ShelterService,
              private auth: AuthService,
              private router: Router) { }

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

  /*this.galleryImages = [
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
  ];*/
  this.galleryImages = [
    {
      url: this.ad.image/*,
      medium: this.ad.image.url,
      big: this.ad.image.url*/
    }
  ]
  }

  getAd(adId:string) {
   this.adService.getAdById(adId).subscribe(
     (ad) => {
       this.ad = ad;
     }
   )
  }

  goToShelterProfile() {
   if (this.auth.getShelterId() !== null) {
     this.router.navigate(['/main/shelter/shelter-profile']);
   } 
   if (this.auth.getShelterId() == null) {
     this.router.navigate([`/main/shelter/${this.ad.shelter._id}`]);
   }
   if (this.auth.getShelterId() == this.ad.shelter._id) {
     this.router.navigate(['/main/shelter/shelter-profile']);
   }
   if (this.auth.getShelterId() !== this.ad.shelter._id) {
     this.router.navigate([`/main/shelter/${this.ad.shelter._id}`]);
   }
  }

  goToUserProfile() {
    if (this.auth.getUserId() !== null) {
      this.router.navigate(['/main/user/user-profile']);
    }
    if (this.auth.getUserId() == null) {
      this.router.navigate([`/main/user/${this.ad.user._id}`]);
    }
    if (this.auth.getUserId() == this.ad.user._id) {
      this.router.navigate(['/main/user/user-profile']);
    }
    if (this.auth.getUserId() !== this.ad.user._id) {
      this.router.navigate([`/main/user/${this.ad.user._id}`]);
    }
  }

}
