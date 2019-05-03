import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})

export class SearchFilterPipe implements PipeTransform{
    transform(ads: any[], term: any): any {
        if (term === undefined) return ads;

        return ads.filter(function(ad) {
            return ad.city.toLowerCase().includes(term.toLowerCase());
        }); 
    }

}