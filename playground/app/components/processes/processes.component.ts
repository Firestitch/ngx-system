import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FsMessage } from '@firestitch/message';
import { ProcessAction, ProcessState } from '@firestitch/package';

import { of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProcessDialogComponent } from './../process-dialog/process-dialog.component';


@Component({
  selector: 'processes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

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

  public loadProcess = (process) => {
    return this.load()
      .pipe(
        map((data) => {
          return data.data.find((item) => {
            return item.id === process.id;
          });
        }),
      );
  };

  public load = () => {
    return of({ paging:{ limit:25,records:0,offset:0 },data:[
      {
        id: 1,
        prettyName: 'Process Name',
        message: 'Something happened',
        state: ProcessState.Completed,
        create_date: '2019-12-12T05:45:45',
        duration: 32982,
        filename: 'processed.pdf',
      },
      {
        id: 2,
        prettyName: 'Process X',
        message: '',
        state: ProcessState.Running,
        createDate: '2019-12-12T05:45:45+00:00',
        endDate: '2019-12-12T05:45:45+00:00',
        startDate: '2019-12-12T05:45:45+00:00',
        duration: 32982,
        percent: 80,
        pid: 23344,
        notify: 'email@email.com',
        log: `Jan 28 21:56:25 Lab12 php-cgi: PHP Warning:  Module 'gd' already loaded in Unknown on line 0
Jan 28 21:56:25 Lab12 php-cgi: PHP Warning:  PHP Startup: Unable to load dynamic library '/usr/lib/php5/20060613/gettext.so' - /usr/lib/php5/20060613/gettext.so: cannot open shared object file: No such file or directory in Unknown on line 0
Jan 28 21:56:25 Lab12 php-cgi: PHP Warning:  PHP Startup: Unable to load dynamic library '/usr/lib/php5/20060613/session.so' - /usr/lib/php5/20060613/session.so: cannot open shared object file: No such file or directory in Unknown on line 0
Jan 28 21:56:25 Lab12 php-cgi: PHP Warning:  PHP Startup: Unable to load dynamic library '/usr/lib/php5/20060613/zlib.so' - /usr/lib/php5/20060613/zlib.so: cannot open shared object file: No such file or directory in Unknown on line 0
Jan 28 21:56:25 Lab12 php-cgi: PHP Warning:  Module 'ADOdb' already loaded in Unknown on line 0
Jan 28 21:56:25 Lab12 php-cgi: PHP Warning:  Module 'gd' already loaded in Unknown on line 0
Jan 28 21:56:25 Lab12 php-cgi: PHP Warning:  Module 'ADOdb' already loaded in Unknown on line 0
Jan 28 21:56:25 Lab12 php-cgi: PHP Warning:  Module 'gd' already loaded in Unknown on line 0
Jan 28 21:56:25 Lab12 php-cgi: PHP Warning:  Module 'gd' already loaded in Unknown on line 0
Jan 28 21:56:25 Lab12 php-cgi: PHP Warning:  PHP Startup: Unable to load dynamic library '/usr/lib/php5/20060613/gettext.so' - /usr/lib/php5/20060613/gettext.so: cannot open shared object file: No such file or directory in Unknown on line 0
Jan 28 21:56:25 Lab12 php-cgi: PHP Warning:  Module 'mysql' already loaded in Unknown on line 0
Jan 28 21:56:25 Lab12 php-cgi: PHP Warning:  Module 'mysqli' already loaded in Unknown on line 0
Jan 28 21:56:25 Lab12 php-cgi: PHP Warning:  PHP Startup: Unable to load dynamic library '/usr/lib/php5/20060613/session.so' - /usr/lib/php5/20060613/session.so: cannot open shared object file: No such file or directory in Unknown on line 0
Jan 28 21:56:25 Lab12 php-cgi: PHP Warning:  PHP Startup: Unable to load dynamic library '/usr/lib/php5/20060613/zlib.so' - /usr/lib/php5/20060613/zlib.so: cannot open shared object file: No such file or directory in Unknown on line 0
Jan 28 21:56:25 Lab12 php-cgi: PHP Warning:  Cannot load module 'pdo_sqlite' because required module 'pdo' is not loaded in Unknown on line 0`,
      },
    ] });
  };

  public run = (process) => {
    return of(true);
  };

  public download = (process) => {
    this._message.info('Starting download...');
  };

  public kill = (process) => {
    return of(true);
  };

  public delete = (process) => {
    return of(true);
  };

}
