import { Pipe, PipeTransform } from '@angular/core';
import { Information, Monument } from '../../models/AppUser';

@Pipe({
  name: 'monumentFilter'
})
export class MonumentFilterPipe implements PipeTransform {

  transform(value: Monument[], filterBy: string): Monument[] {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filterBy ? value.filter((mon: Monument) =>
      mon.information[0].name.toLocaleLowerCase().indexOf(filterBy)
      !== -1) : value;
  }

}
