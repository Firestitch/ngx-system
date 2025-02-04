import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { FsApi, RequestMethod, StreamEventData } from '@firestitch/api';
import { parse } from '@firestitch/date';
import { ItemType } from '@firestitch/filter';
import { FsListActionSelected, FsListComponent, FsListConfig } from '@firestitch/list';
import { FsMessage } from '@firestitch/message';
import { FsProcess } from '@firestitch/process';
import { FsPrompt } from '@firestitch/prompt';
import { SelectionActionType } from '@firestitch/selection';

import { Observable, Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';

import { differenceInSeconds } from 'date-fns';

import { CronProcessStates, CronStates } from '../../consts';
import { CronData } from '../../data/cron.data';
import { CronState } from '../../enums';
import { indexNameValue } from '../../helpers/index-name-value';
import { CronComponent } from '../cron/cron.component';


@Component({
  selector: 'fs-system-crons',
  templateUrl: './crons.component.html',
  styleUrls: ['./crons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CronsComponent implements OnInit, OnDestroy {

  @ViewChild(FsListComponent, { static: true }) public list: FsListComponent;

  public config: FsListConfig = null;
  public CronStates = indexNameValue(CronStates);
  public CronProcessStates = indexNameValue(CronProcessStates);
  public CronState = CronState;

  private _destroy$ = new Subject();
  private _cronData = inject(CronData);
  private _message = inject(FsMessage);
  private _dialog = inject(MatDialog);
  private _prompt = inject(FsPrompt);
  private _process = inject(FsProcess);
  private _api = inject(FsApi);

  public ngOnInit(): void {
    this._configList();
  }

  public open(cron) {
    this._dialog.open(CronComponent, {
      data: {
        cron,
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
  
  public enable(data) {
    return this._cronData.enable(data);
  }

  public disable(data) {
    return this._cronData.disable(data);
  }

  public kill (data) {
    return this._cronData.kill(data);
  }

  public queue(data) {
    return this._cronData.queue(data);
  }

  public run(cron): Observable<any> {
    return new Observable((observer) => {  
      const process = this._process
        .run(`Run ${cron.name}`, this._api
          .stream(
            RequestMethod.Post, `system/crons/${cron.id}/run`)
          .pipe(
            filter((event) => event instanceof StreamEventData),
            map((event) => {
              return event?.data;
            }),   
            filter((data) => !!data),
          ),
        );

      process.failed$
        .pipe(
          takeUntil(this._destroy$),
        )
        .subscribe((error) => {
          observer.next(error);
          observer.complete();
        });

      process.completed$  
        .pipe(
          takeUntil(this._destroy$),
        )
        .subscribe((data) => {
          observer.next(data);
          observer.complete();
        });

      process.cancelled$
        .pipe(
          takeUntil(this._destroy$),
        )
        .subscribe((data) => {
          observer.next(data);
          observer.complete();
        });
    });
  }

  public loadCrons = (query) => {
    query.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return this._cronData.gets(query, { key: 'crons' });
  };

  public loadCronLogs = (query) => {
    return this._cronData.cronLogGets(query, { key: null })
      .pipe(
        map((data: any) => {
          return { data: data.cronLogs, paging: data.paging };
        }),
      );
  };

  public bulk = (action, crons) => {
    const processes = crons
      .map((cron) => {
        return cron.process;
      });

    return this._cronData.bulk(action, processes);
  };

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
