import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterformation'
})
export class FilterPipeFormation implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      return item.title.toLowerCase().includes(searchText) ||
             item.nomCentre.toLowerCase().includes(searchText);
    });
  }
}
