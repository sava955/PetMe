import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AdsService } from './ads.service';
import { of as ObservableOf, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ShelterAdGuard implements CanActivate {

    constructor(
        private adsService: AdsService,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const adId: string = route.params.adId;

            return this.adsService.verifyAdShelter(adId).pipe(
                map(() => { return true }),
                catchError(() => {
                    this.router.navigate(['/main/ads']);
                    return ObservableOf(false);
                }));
    }
}