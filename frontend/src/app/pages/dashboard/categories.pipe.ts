import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categories'
})
export class CategoriesPipe implements PipeTransform {

  transform(value: Array<any>, ...args: unknown[]): unknown {
    let arr = []
    for(let index in value)
      arr.push(value[index]['name'])

    return arr.toString();
  }

}
