import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterEmploye'
})
export class filterEmploye implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      return item.nomPrenom.toLowerCase().includes(searchText) ||
             item.poste.toLowerCase().includes(searchText);
    });
  }
}