import { Component, OnInit } from '@angular/core';
import { ShelterService } from '../../shared/shelter.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shelters',
  templateUrl: './shelters.component.html',
  styleUrls: ['./shelters.component.scss']
})
export class SheltersComponent implements OnInit {
  
  shelter: any;
  p: number = 1;

  constructor(private shelterService: ShelterService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.getShelter(params['shelterId']);
      }
    )
  }

  getShelter(shelterId: string) {
    this.shelterService.getShelterById(shelterId).subscribe(
      (shelter: any) => {
        this.shelter = shelter;
      }
    )
  }

}
