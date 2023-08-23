import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCategory'
})
export class FilterCategoryPipe implements PipeTransform {

  transform(items: any[], categoriaId: number | null | string): any[] {
    if (categoriaId == 'null' || categoriaId == null) {
      return items;
    }

    return items.filter(item => item.id_categoria == categoriaId);
  }

}
