import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTienda'
})
export class FilterTiendaPipe implements PipeTransform {

  transform(items: any[], tiendaId: number | null | string): any[] {
    if (tiendaId == 'null' || tiendaId == null) {
      return items;
    }

    return items.filter(item => item.id_tienda == tiendaId);
  }


}
