import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
  standalone: true
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any, args: string): any {
    if (!args) return value
    args = args.toLowerCase()
    return value.filter((item: any) => {
      return JSON.stringify(item)
      .toLowerCase()
      .includes(args)
    })
  }
  }


