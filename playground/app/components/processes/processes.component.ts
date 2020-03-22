import { ProcessDialogComponent } from './../process-dialog/process-dialog.component';
import { FsMessage } from '@firestitch/message';
import { Component } from '@angular/core';
import { of } from 'rxjs';
import { ProcessState } from 'src/app/enums';
import { ProcessAction } from 'src/app/interfaces';


@Component({
  selector: 'processes',
  templateUrl: 'processes.component.html',
  styleUrls: ['processes.component.scss']
})
export class ProcessesComponent {

  constructor(private _message: FsMessage) {}

  public actions: ProcessAction[] = [
    {
      label: 'Import Dialog',
      component: ProcessDialogComponent
    },
    {
      label: 'Import Click',
      click: () => {
        this._message.success('Import Clicked');
      }
    },
    {
      label: 'Import Menu',
      menu: true,
      click: () => {
        this._message.success('Import Menu Clicked');
      }
    }
  ]

  public load = () => {
    return of({"paging":{"limit":25,"records":0,"offset":0},"data":[
      {
        name: 'Process Name',
        message: 'Something happened',
        state: ProcessState.Completed,
        create_date: '2019-12-12T05:45:45',
        duration: 32982,
        filename: 'processed.pdf'
      },
      {
        name: 'Process X',
        message: '',
        state: ProcessState.Running,
        create_date: '2019-12-12T05:45:45',
        duration: 32982,
        percent: 80,
        pid: 23344,
        notify: 'email@email.com'
      }
    ]});
  }

  public run = (process) => {
    return of(true);
  }

  public download = (process) => {
    this._message.info('Starting download...');
  }

  public kill = (process) => {
    return of(true);
  }

  public delete = (process) => {
    return of(true);
  }

}
