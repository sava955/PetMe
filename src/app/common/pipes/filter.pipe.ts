import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filter-search'
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;
        searchText = searchText.toLowerCase();
        return items.filter(it => {
            // const val = this.fieldNameFormatter(it);
            return JSON.stringify(it).toLowerCase().includes(searchText);
        });
        
    }
}