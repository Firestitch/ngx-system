import { Component } from '@angular/core';
import { of } from 'rxjs';
import { ProcessState } from 'src/app/enums';


@Component({
  selector: 'server-logs',
  templateUrl: 'server-logs.component.html',
  styleUrls: ['server-logs.component.scss']
})
export class ServerLogsComponent {

  public load = () => {
    return of({"paging":{"limit":25,"records":0,"offset":0},"logs":[{
      message: 'Something happened'
    }]});
  }
}
