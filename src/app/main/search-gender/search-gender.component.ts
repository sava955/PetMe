import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdsService } from '../shared/ads.service';
import { AuthService } from '../../auth/shared/auth.service';
import { Ad } from '../shared/ad.model';

@Component({
  selector: 'app-search-gender',
  templateUrl: './search-gender.component.html',
  styleUrls: ['./search-gender.component.scss']
})
export class SearchGenderComponent implements OnInit {
  ads: Ad[] = [];
  gender: string;
  p: number = 1;

  constructor(private adsService: AdsService,
              private auth: AuthService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.gender = params['gender'];
      this.getGender();
    });
  }

  getGender() {
    this.adsService.getAdsByGender(this.gender).subscribe(
      (ads: Ad[]) => {
        this.ads = ads;
      },
      () => {

      }
    )
  }

}
