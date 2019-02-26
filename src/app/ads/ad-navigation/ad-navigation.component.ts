import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/shared/auth.service';
import { Ad } from '../shared/ad.model';

@Component({
  selector: 'app-ad-navigation',
  templateUrl: './ad-navigation.component.html',
  styleUrls: ['./ad-navigation.component.scss']
})
export class AdNavigationComponent implements OnInit {

  filter = {dog: true, cat: true};
  ads: Ad[] = [];
  filteredAds: Ad[] = [];
  
  filterChange() {
    this.filteredAds = this.ads.filter(
      ad => 
      (ad.category === 'dog' && this.filter.dog) ||
      (ad.category === 'cat' && this.filter.cat)
    )
  }


  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

}
