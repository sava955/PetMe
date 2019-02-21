import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'urgent'
})

export class IsUrgentPipe implements PipeTransform{
    transform(values: any[], args?: boolean): any {
        return values.filter((ad) => ad.isUrgent);
    }

}