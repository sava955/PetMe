import { Component, OnInit } from '@angular/core';
import { ShelterService } from '../../shared/shelter.service';
import { AdsService } from '../../shared/ads.service';
import { AuthService } from '../../../auth/shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Ad } from '../../shared/ad.model';

@Component({
  selector: 'app-shelter-detail',
  templateUrl: './shelter-detail.component.html',
  styleUrls: ['./shelter-detail.component.scss']
})
export class ShelterDetailComponent implements OnInit {
  
  shelter: any;
  adDeleteIndex: number;
  p: number = 1;

  constructor(private shelterService: ShelterService,
              private adsService: AdsService,
              private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getShelter();
  }

  getShelter() {
    const shelterId = this.auth.getShelterId();

    this.shelterService.getShelter(shelterId).subscribe((shelter) => {
         this.shelter = shelter;
    }, (err) => {

    })
  }

  deleteAd(adId: string) {
   this.shelterService.deleteAd(adId).subscribe(
     () => {
       this.shelter.ads.splice(this.adDeleteIndex, 1);
       this.adDeleteIndex = undefined;
     }
   )
  }

}
