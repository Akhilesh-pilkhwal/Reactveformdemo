import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userfilter'
})
export class UserfilterPipe implements PipeTransform {

  transform(value: any[], args?: any): any {
    if(args!=""){
    return value.filter(x=>(x.first_name.toLowerCase().includes(args)||x.last_name.toLowerCase().includes(args)));
    }else{
      return value;
    }
    
  }

}
