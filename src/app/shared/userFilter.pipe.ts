import { Pipe, PipeTransform } from '@angular/core';
import { AppUser } from '../../models/AppUser';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  // transform(items: any[], searchText: string): any[] {
  //   if (!items) {return []; }
  //   if (!searchText) {return items; }
  //   return items.filter( item => {
  //     return Object.values(item).indexOf(searchText) > -1;
  //   });
  // }

  transform(value: AppUser[], filterBy: string): AppUser[] {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filterBy ? value.filter((user: AppUser) =>
      user.name.toLocaleLowerCase().indexOf(filterBy)
      !== -1) : value;
  }

}
