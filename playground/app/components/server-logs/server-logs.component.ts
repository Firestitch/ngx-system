import { Component } from '@angular/core';
import { of } from 'rxjs';


@Component({
  selector: 'server-logs',
  templateUrl: 'server-logs.component.html',
  styleUrls: ['server-logs.component.scss']
})
export class ServerLogsComponent {

  public load = () => {
    return of({"paging":{"limit":25,"records":0,"offset":0},"data":[{
      message: 'Something happened',
      create_date: new Date()
    }]});
  }
}
