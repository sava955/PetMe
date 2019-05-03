import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShelterService } from '../../shared/shelter.service';
import { AuthService } from '../../../auth/shared/auth.service';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-shelter-profile-update',
  templateUrl: './shelter-profile-update.component.html',
  styleUrls: ['./shelter-profile-update.component.scss']
})
export class ShelterProfileUpdateComponent implements OnInit {
  shelter: any;
  locationSubject: Subject<any> = new Subject();
  usernameSubject: Subject<any> = new Subject();
  adDeleteIndex: number;
  p: number = 1;

  constructor(private shelterService: ShelterService,
              private auth: AuthService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getShelter();
    /*this.route.params.subscribe(
      (params) => {
        this.getShelter(params['shelterId']);
      }
    )*/
  }

  getShelter() {
     const shelterId = this.auth.getShelterId();
     this.shelterService.getShelter(shelterId).subscribe((shelter: any) => {
       this.shelter = shelter;
     });
     
  }

  deleteAd(adId: string) {
    this.shelterService.deleteAd(adId).subscribe(
      () => {
        this.shelter.ads.splice(this.adDeleteIndex, 1);
        this.adDeleteIndex = undefined;
      }
    )
  }

  updateProfile(shelterId: string, shelterData: any) {
    this.shelterService.updateProfile(shelterId, shelterData).subscribe(
      (updatedShelter: any) => {
        this.shelter = updatedShelter;
      
      if (shelterData.city || shelterData.street) {
        this.locationSubject.next(this.shelter.city + ', ' + this.shelter.street)
      }
     
    },
    () => {
      this.getShelter();
    }
    )
  }

}
