import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})

export class SearchFilterPipe implements PipeTransform{
    transform(shelters: any[], term: any): any {
        if (term === undefined) return shelters;

        return shelters.filter(function(shelter) {
            return shelter.username.toLowerCase().includes(term.toLowerCase());
        }) 
    }

}