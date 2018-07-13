import { Pipe, PipeTransform } from '@angular/core';
import { AppUser } from '../../models/AppUser';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: AppUser[], filterBy: string): AppUser[] {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filterBy ? value.filter((user: AppUser) =>
      user.name.toLocaleLowerCase().indexOf(filterBy)
      !== -1) : value;
  }

}
