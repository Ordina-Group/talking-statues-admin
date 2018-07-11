import { Pipe, PipeTransform } from '@angular/core';
import {AppUser, Monument} from '../../models/AppUser';

@Pipe({
  name: 'filter'
})
export class MonumentFilterPipe implements PipeTransform {

  transform(value: Monument[], filterBy: string): Monument[] {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filterBy ? value.filter((mon: Monument) =>
      mon.information[0].language.toLocaleLowerCase().indexOf(filterBy)
      !== -1) : value;
  }

}
