import { Component } from '@angular/core';
import { of } from 'rxjs';
import { InfoComponent as InfoComponent_1 } from '../../../../src/app/modules/system/components/info/info.component';

@Component({
    selector: 'info',
    templateUrl: 'info.component.html',
    styleUrls: ['info.component.scss'],
    standalone: true,
    imports: [InfoComponent_1]
})
export class InfoComponent {

  public config = {};

  public load = () => {
    return of('Content');
  }
}
