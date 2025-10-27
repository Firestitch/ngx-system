import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FsMessage } from '@firestitch/message';
import { ProcessAction } from '@firestitch/package';


import { ProcessDialogComponent } from './../process-dialog/process-dialog.component';
import { ProcessesComponent as ProcessesComponent_1 } from '../../../../src/app/modules/system/components/processes/processes.component';


@Component({
    selector: 'processes',
    templateUrl: './processes.component.html',
    styleUrls: ['./processes.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ProcessesComponent_1],
})
export class ProcessesComponent {

  public actions: ProcessAction[] = [
    {
      label: 'Import Dialog',
      component: ProcessDialogComponent,
    },
    {
      label: 'Import Click',
      click: () => {
        this._message.success('Import Clicked');
      },
    },
    {
      label: 'Import Menu',
      menu: true,
      click: () => {
        this._message.success('Import Menu Clicked');
      },
    },
  ];

  constructor(private _message: FsMessage) {}

}
