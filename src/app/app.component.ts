import { Component, HostBinding } from '@angular/core';
import { fadeAnimation } from './common/animations/animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation]
})
export class AppComponent {
  title = 'pet-me';

  public getRouterOutletState(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData;
  }
}
