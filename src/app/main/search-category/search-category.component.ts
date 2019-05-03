import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdsService } from '../shared/ads.service';
import { Ad } from '../shared/ad.model';

@Component({
  selector: 'app-search-category',
  templateUrl: './search-category.component.html',
  styleUrls: ['./search-category.component.scss']
})
export class SearchCategoryComponent implements OnInit {

  ads: Ad[] = [];
  category: string;
  p: number = 1;

  constructor(private adsService: AdsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.category = params['category'];
      this.getCategory();
    });
  }

  getCategory() {
    this.adsService.getAdsByCategory(this.category).subscribe(
      (ads: Ad[]) => {
        this.ads = ads;
      },
      () => {

      }
    )
  }

}
