import { Injectable, Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'keyNameValue',
    standalone: true,
})
@Injectable()
export class KeyNameValuePipe implements PipeTransform {

  public transform(values): any {
    return Object.keys(values).map((key) => {
      return { value: key, name: values[key] };
    });
  }
}
