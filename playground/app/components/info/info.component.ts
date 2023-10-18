import { Component } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'info',
  templateUrl: 'info.component.html',
  styleUrls: ['info.component.scss']
})
export class InfoComponent {

  public config = {};

  public load = () => {
    return of('Content');
  }
}
