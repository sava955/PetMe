import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-other-ads',
  templateUrl: './other-ads.component.html',
  styleUrls: ['./other-ads.component.scss']
})
export class OtherAdsComponent implements OnInit {
 
  @Input() ad: any;

  constructor() { }

  ngOnInit() {
  }

}
