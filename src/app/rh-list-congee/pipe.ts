import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], filters: { searchText: string, selectedResponse: any }): any[] {
    if (!items) return [];
    let filteredItems = items;

    if (filters.searchText) {
      filteredItems = filteredItems.filter(item => {
        return item.matricule.toLowerCase().includes(filters.searchText.toLowerCase())
          || item.nomPrenom.toLowerCase().includes(filters.searchText.toLowerCase())
          || item.type.toLowerCase().includes(filters.searchText.toLowerCase());
      });
    }

    if (filters.selectedResponse.confirmation && filters.selectedResponse.confirmation !== 'tout' ) {
      filteredItems = filteredItems.filter(item => {
        return item.confirmation.toLowerCase() === filters.selectedResponse.confirmation.toLowerCase();
      });
    }

    return filteredItems;
  }
}

