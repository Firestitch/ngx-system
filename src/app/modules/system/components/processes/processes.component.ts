import {
  ChangeDetectionStrategy, Component, inject, Input, OnDestroy, OnInit, ViewChild,
} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { FsApi, RequestMethod, StreamEventData, StreamEventType } from '@firestitch/api';
import { ItemType } from '@firestitch/filter';
import { FsListComponent, FsListConfig, FsListModule } from '@firestitch/list';
import { FsMessage } from '@firestitch/message';
import { FsProcess } from '@firestitch/process';

import { Subject } from 'rxjs';
import { filter, finalize, map, takeUntil, tap } from 'rxjs/operators';

import { ProcessStates } from '../../consts';
import { ProcessData } from '../../data/process.data';
import { ProcessState } from '../../enums';
import { indexNameValue } from '../../helpers/index-name-value';


import { ProcessAction } from './../../interfaces/process-action';
import { ProcessComponent } from './../process/process.component';
import { FsDateModule } from '@firestitch/date';


@Component({
    selector: 'fs-system-processes',
    templateUrl: './processes.component.html',
    styleUrls: ['./processes.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FsListModule, FsDateModule],
})
export class ProcessesComponent implements OnInit, OnDestroy {

  @ViewChild(FsListComponent) 
  public list: FsListComponent;

  @Input() public actions: ProcessAction[] = [];

  public config: FsListConfig = null;
  public ProcessStates = indexNameValue(ProcessStates);
  public ProcessState = ProcessState;

  private _destroy$ = new Subject();
  private _processData = inject(ProcessData);

  constructor(
    private _dialog: MatDialog,
    private _message: FsMessage,
    private _process: FsProcess,
    private _api: FsApi,
  ) { }

  public ngOnInit() {
    this._configList();
  }

  public reload() {
    this.list.reload();
  }

  public open(process) {
    this._dialog
      .open(ProcessComponent, {
        data: {
          process,
        },
        width: '85%',
      })
      .afterClosed()
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this.reload();
      });
  }

  public ngOnDestroy() {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  public download(process) {
    this._processData.download(process);
  }

  private _configList() {
    this.config = {
      actions: [],
      rowActions: [      
        {
          label: 'Queue',
          show: (process) => {
            return process.state !== ProcessState.Running && 
              process.state !== ProcessState.Queued;
          },
          click: (data) => {
            this._processData.queue(data)
              .subscribe(() => {
                this.reload();
                this._message.success('Queued process');
              });
          },
        },
        {
          label: 'Run',
          show: (data) => {
            return data.state !== ProcessState.Running;
          },
          click: (process) => {
            this._process
              .run(`Run ${process.name}`, this._api
                .stream(
                  RequestMethod.Post, `processes/${process.id}/run`)
                .pipe(
                  tap((event) => {
                    if(
                      event instanceof StreamEventData && event.type === StreamEventType.Sent
                    ) {
                      process = {
                        ...process,
                        state: ProcessState.Running,
                      };

                      this.list
                        .updateData(process, (row) => {
                          return process.id === row.id;
                        });
                    }
                  }),
                  filter((event) => event instanceof StreamEventData),
                  map((event) => {
                    return event?.data;
                  }),
                  filter((data) => !!data),
                  finalize(() => {
                    this.list.reload();
                  }),
                ),
              );
          },
        },
        {
          label: 'Kill',
          show: (data) => {
            return !!data.pid;
          },
          click: (data) => {
            this._message.info('Killing process...');
            this._processData.kill(data)
              .subscribe(() => {
                this.reload();
                this._message.success('Killed process');
              });
          },
        },
        {
          label: 'Delete',
          click: (data) => {
            this._processData.delete(data)
              .subscribe(() => {
                this.reload();
                this._message.success('Deleted process');
              });
          },
        },
      ],
      filters: [
        {
          type: ItemType.Keyword,
          name: 'keyword',
          label: 'Search',
        },
        {
          type: ItemType.Select,
          name: 'state',
          label: 'Status',
          values: ProcessStates,
        },
      ],
      fetch: (query) => {
        return this._processData.gets(query, { key: null })
          .pipe(
            map((response: any) => ({ data: response.processes, paging: response.paging })),
          );
      },
    };

    this.actions.forEach((action) => {
      this.config.actions.push(
        {
          primary: false,
          label: action.label,
          menu: action.menu,
          click: (data) => {
            if (action.click) {
              action.click(data);
            }

            if (action.component) {
              this._dialog.open(action.component, {
                width: '800px',
              })
                .afterClosed()
                .pipe(
                  takeUntil(this._destroy$),
                )
                .subscribe(() => {
                  this.reload();
                });
            }
          },
        },
      );
    });
  }
}
