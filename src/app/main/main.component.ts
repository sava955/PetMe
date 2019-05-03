import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fadeAnimation } from '../common/animations/animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [fadeAnimation]
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public getRouterOutletState(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData;
  }

}
