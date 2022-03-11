import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { FsMessage } from '@firestitch/message';
import { ItemType } from '@firestitch/filter';
import { FsListConfig, FsListComponent, FsListActionSelected } from '@firestitch/list';

import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { indexNameValue } from '../../helpers/index-name-value';
import { CronComponent } from '../cron/cron.component';
import { CronStates } from '../../consts';
import { CronState } from '../../enums';
import { SelectionActionType } from '@firestitch/selection';


@Component({
  selector: 'fs-system-crons',
  templateUrl: './crons.component.html',
  styleUrls: ['./crons.component.scss'],
})
export class CronsComponent implements OnInit {

  @ViewChild(FsListComponent, { static: true }) list: FsListComponent;

  @Input() public enable: (data: any) => Observable<any>;
  @Input() public disable: (data: any) => Observable<any>;
  @Input() public kill: (data: any) => Observable<any>;
  @Input() public queue: (data: any) => Observable<any>;
  @Input() public run: (data: any) => Observable<any>;
  @Input() public loadCrons: (data: any) => Observable<any[]>;
  @Input() public loadCron: (data: any) => Observable<any>;
  @Input() public loadCronLogs: (data: any) => Observable<{ data: any[], paging: any }>;
  @Input() public bulk: (actionName: string, data: any[]) => Observable<any>;

  public config: FsListConfig = null;
  public cronStates = indexNameValue(CronStates);

  constructor(
    private _message: FsMessage,
    private _dialog: MatDialog,
  ) { }

  public ngOnInit(): void {
    this._configList();
  }

  private _configList(): void {
    this.config = {
      paging: false,
      filters: [
        {
          type: ItemType.Keyword,
          name: 'keyword',
          label: 'Search'
        }
      ],
      rowActions: this.getCronActions()
      .map((rowAction) => {
        return {
          ...rowAction,
          click: (cron) => {
            rowAction.action(cron)
            .subscribe();
          },
        }
      }),
      fetch: query => {
        query.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        return this.loadCrons(query)
          .pipe(
            map((response) => ({ data: response }))
          );
      },    
    };

    if(this.bulk) {
      this.config.selection = {
        selectAll: false,
        actions: [
          {
            type: SelectionActionType.Action,
            name: 'disable',
            label: 'Disable'
          },
          {
            type: SelectionActionType.Action,
            name: 'enable',
            label: 'Enable'
          },
        ],
        actionSelected: (action: FsListActionSelected) => {
          return this.bulk(action.action.name, action.selected)
          .pipe(
            tap(() => {
              this.list.reload();
              this._message.success('Applied Changes');
            }),
          );
        },
      };
    }
  }

  public open(cron) {
    this._dialog.open(CronComponent, {
      data: { 
        cron,
        loadCronLogs: this.loadCronLogs,
        loadCron: this.loadCron,
        cronActions: this.getCronActions(),
      },
      width: '85%'
    });
  }  

  public getCronActions() {
    return [
      {
        action: (data) => {
          return this.queue(data)
          .pipe(
            tap(() => {
              this._message.success('Queued cron');
              this.list.reload();
            }),
          );
        },
        label: 'Queue',
        show: (cron) => {
          return cron.state === CronState.Idle || cron.state === CronState.Failed;
        },
      },
      {
        action: (data) => {
          return this.run(data)
          .pipe(
            tap(() => {
              this._message.success('Cron ran');
              this.list.reload();
            })
          );
        },
        label: 'Run',
        show: (cron) => {
          return cron.state === CronState.Idle || cron.state === CronState.Failed;
        },
      },
      {
        action: (data) => {
          return this.enable(data)
          .pipe(
            tap(() => {
              this._message.success('Enabled cron');
              this.list.reload();
            }),
          );
        },
        label: 'Enable',
        show: (cron) => {
          return cron.state === CronState.Disabled;
        },
      },
      {
        action: (data) => {
          return this.disable(data)
          .pipe(
            tap(() => {
              this._message.success('Disabled cron');
              this.list.reload();
            }),
          );
        },
        label: 'Disable',
        show: (cron) => {
          return cron.state === CronState.Idle || cron.state === CronState.Failed;
        },
      },
      {
        action: (data) => {
          return this.kill(data)
          .pipe(
            tap(() => {
              this._message.success('Killed cron');
              this.list.reload();
            }),
          );
        },
        label: 'Kill',
        show: (cron) => {
          return cron.state === CronState.Running;
        },
      },
    ];    
  }
}
