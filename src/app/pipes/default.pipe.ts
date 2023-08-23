import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'default'
})
export class defaultPipe implements PipeTransform {

  transform(value: string, fallback: string): string{
    let image = "";
    if(value){
        image = value;
    }else{
        image = fallback;
    }
    return image
}

}
