import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { parse } from '@firestitch/date';
import { ItemType } from '@firestitch/filter';
import { FsListActionSelected, FsListComponent, FsListConfig } from '@firestitch/list';
import { FsMessage } from '@firestitch/message';
import { FsPrompt } from '@firestitch/prompt';
import { SelectionActionType } from '@firestitch/selection';

import { Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';

import { differenceInSeconds } from 'date-fns';

import { CronProcessStates, CronStates } from '../../consts';
import { CronState } from '../../enums';
import { indexNameValue } from '../../helpers/index-name-value';
import { CronComponent } from '../cron/cron.component';


@Component({
  selector: 'fs-system-crons',
  templateUrl: './crons.component.html',
  styleUrls: ['./crons.component.scss'],
})
export class CronsComponent implements OnInit, OnDestroy {

  @ViewChild(FsListComponent, { static: true }) public list: FsListComponent;

  @Input() public enable: (data: any) => Observable<any>;
  @Input() public disable: (data: any) => Observable<any>;
  @Input() public kill: (data: any) => Observable<any>;
  @Input() public queue: (data: any) => Observable<any>;
  @Input() public run: (data: any) => Observable<any>;
  @Input() public loadCrons: (data: any) => Observable<any[]>;
  @Input() public loadCron: (data: any) => Observable<any>;
  @Input() public loadCronLogs: (data: any) => Observable<{ data: any[]; paging: any }>;
  @Input() public bulk: (actionName: string, data: any[]) => Observable<any>;

  public config: FsListConfig = null;
  public CronStates = indexNameValue(CronStates);
  public CronProcessStates = indexNameValue(CronProcessStates);
  public CronState = CronState;

  private _destroy$ = new Subject();

  constructor(
    private _message: FsMessage,
    private _dialog: MatDialog,
    private _prompt: FsPrompt,
  ) { }

  public ngOnInit(): void {
    this._configList();
  }

  public open(cron) {
    this._dialog.open(CronComponent, {
      data: {
        cron,
        loadCronLogs: this.loadCronLogs,
        loadCron: this.loadCron,
        cronActions: this.getCronActions(),
      },
      width: '85%',
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
              }),
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
          return this._prompt.confirm({
            title: 'Confirm',
            template: 'Are you sure you would like to kill the cron?',
          })
            .pipe(
              switchMap(() => {
                return this.kill(data);
              }),
              tap(() => {
                this._message.success('Killed cron');
                this.list.reload();
              }),
              takeUntil(this._destroy$),
            );
        },
        label: 'Kill',
        show: (cron) => {
          return cron.state === CronState.Running;
        },
      },
      {
        action: (data) => {
          return this._prompt.confirm({
            title: 'Confirm',
            template: 'Are you sure you would like to reset the cron?',
          })
            .pipe(
              switchMap(() => {
                return this.enable(data);
              }),
              tap(() => {
                this._message.success('Reset cron');
                this.list.reload();
              }),
              takeUntil(this._destroy$),
            );
        },
        label: 'Reset',
        show: (cron) => {
          return cron.state === CronState.Killing || cron.state === CronState.Running || cron.state === CronState.Failed || cron.state === CronState.Queued;
        },
      },
    ];
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  private _configList(): void {
    this.config = {
      paging: false,
      filters: [
        {
          type: ItemType.Keyword,
          name: 'keyword',
          label: 'Search',
        },
      ],
      rowActions: this.getCronActions()
        .map((rowAction) => {
          return {
            ...rowAction,
            click: (cron) => {
              rowAction.action(cron)
                .subscribe();
            },
          };
        }),
      fetch: (query) => {
        query = { 
          ...query,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        };

        return this.loadCrons(query)
          .pipe(
            map((crons) => ({
              data: crons
                .map((cron) => {
                  return {
                    ...cron,
                    runningDuration: differenceInSeconds(parse(cron.createDate), new Date()),
                  };
                }),
            })),
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
            label: 'Disable',
          },
          {
            type: SelectionActionType.Action,
            name: 'enable',
            label: 'Enable',
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
}
