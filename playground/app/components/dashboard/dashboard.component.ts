import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { FsMessage } from '@firestitch/message';
import { DashboardAction } from '@firestitch/package';

import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DashboardComponent as DashboardComponent_1 } from '../../../../src/app/modules/system/components/dashboard/dashboard.component';


@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [DashboardComponent_1],
})
export class DashboardComponent {
  private _message = inject(FsMessage);


  public config = {};
  public actions: DashboardAction[] = [
    {
      label: 'Do Something',
      click: () => {
        this._message.success('Did Something');
      },
    },
    {
      label: 'Do Something Menu',
      menu: true,
      click: () => {
        this._message.success('Did Something');
      },
    },
  ];

  public load = () => {
    return of({
      gitBranch: 'develop',
      notifyRecipients: ['sysadmin@firestitch.com'],
      serverTimezone: 'UTC +00:00',
      databaseName: 'boilerplate',
      databaseTime: '2019-11-30T17:00:34+00:00',
      databaseTimezone: 'SYSTEM',
      appMode: 'Debug',
      lastUpgrade: '2019-11-29T15:13:22+00:00',
      cronRan: '2019-11-30T17:00:02+00:00',
      appDirectory: '\/var\/www\/boilerplate',
      serverHostname: 'boilerplate.firestitch.com',
      upgrades: ['upgrade 1', 'upgrade 2', 'upgrade 3'],
      serverTime: '2019-11-30T17:00:34+00:00',
    })
      .pipe(
        delay(0),
      );
  };

  public init = () => {
    return of(true);
  };

  public upgrade = () => {
    return of(true);
  };
}
