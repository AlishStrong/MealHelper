import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSearch'
})
export class FilterSearchPipe implements PipeTransform {

  transform(items: any[], searchItem: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchItem) {
      return [];
    }
    return items.filter((item: string) => this.contains(item, searchItem));
  }

  private contains(source: string, toCheck: string): boolean {
    return source.toLocaleLowerCase().includes(toCheck.toLocaleLowerCase());
  }
}
