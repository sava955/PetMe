import { Component, OnInit } from '@angular/core';
import { Ad } from '../shared/ad.model';
import { AdsService } from '../shared/ads.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ad-create',
  templateUrl: './ad-create.component.html',
  styleUrls: ['./ad-create.component.scss']
})
export class AdCreateComponent implements OnInit {
  newAd: Ad;
  adCategories = Ad.CATEGORIES;
  adGender = Ad.GENDER;
  errors: any[] = [];

  constructor(private adService: AdsService,
              private router: Router
              ) { }

  handleImageChange() {
    this.newAd.image = "https://ichef.bbci.co.uk/news/660/cpsprodpb/475B/production/_98776281_gettyimages-521697453.jpg"
  }

  ngOnInit() {
    this.newAd = new Ad();
    this.newAd.isUrgent = false;
  }

  createAd() {
    this.adService.createAd(this.newAd).subscribe(
      (ad: Ad) => {
        this.router.navigate([`/ads/${ad._id}`]);
      },
      (errorResponse: HttpErrorResponse) => {
        this.errors = errorResponse.error.errors;
      }
    )

  }

}
