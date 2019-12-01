import { Component } from '@angular/core';
import { KitchenSinkConfigureComponent } from '../kitchen-sink-configure';
import { FsExampleComponent } from '@firestitch/example';
import { FsMessage } from '@firestitch/message';
import { of } from 'rxjs';

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent {

  public config = {};

  constructor(private exampleComponent: FsExampleComponent,
              private message: FsMessage) {
    exampleComponent.setConfigureComponent(KitchenSinkConfigureComponent, { config: this.config });
  }

  public load = () => {
    return of({"git_branch":"develop\n","notify_recipients":["sysadmin@firestitch.com"],"server_timezone":"UTC +00:00\n","database_name":"boilerplate","database_time":"2019-11-30T17:00:34+00:00","database_timezone":"SYSTEM","app_mode":"Debug","last_upgrade":"2019-11-29T15:13:22+00:00","cron_ran":"2019-11-30T17:00:02+00:00","app_directory":"\/var\/www\/boilerplate","server_hostname":"boilerplate.firestitch.com","upgrades":[],"server_time":"2019-11-30T17:00:34+00:00"});
  }

  public init = () => {
    return of(true);
  }

  public upgrade= () => {
    return of(true);
  }
}