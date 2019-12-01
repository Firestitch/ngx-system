import { Component } from '@angular/core';
import { of } from 'rxjs';
import { ProcessState } from 'src/app/enums';


@Component({
  selector: 'processes',
  templateUrl: 'processes.component.html',
  styleUrls: ['processes.component.scss']
})
export class ProcessesComponent {

  public load = () => {
    return of({"paging":{"limit":25,"records":0,"offset":0},"processes":[{
      name: 'Process Name',
      message: 'Something happened',
      state: ProcessState.Completed
    }]});
  }
}
