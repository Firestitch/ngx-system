import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { ItemType } from '@firestitch/filter';
import { FsListComponent, FsListConfig } from '@firestitch/list';
import { FsMessage } from '@firestitch/message';

import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { ProcessStates } from '../../consts';
import { ProcessState } from '../../enums';
import { indexNameValue } from '../../helpers/index-name-value';

import { ProcessAction } from './../../interfaces/process-action';
import { ProcessComponent } from './../process/process.component';


@Component({
  selector: 'fs-system-processes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessesComponent implements OnInit, OnDestroy {

  @ViewChild(FsListComponent) public list: FsListComponent;

  @Input() public loadProcesses: (data: any) => Observable<{ data: any[]; paging: any }>;
  @Input() public loadProcess: (data: any) => Observable<any>;
  @Input() public run: (data: any) => Observable<any>;
  @Input() public kill: (data: any) => Observable<any>;
  @Input() public delete: (data: any) => Observable<any>;
  @Input() public download: (data: any) => any;
  @Input() public queue: (data: any) => any;
  @Input() public actions: ProcessAction[] = [];

  public config: FsListConfig = null;
  public ProcessStates = indexNameValue(ProcessStates);
  public ProcessState = ProcessState;

  private _destroy$ = new Subject();

  constructor(
    private _dialog: MatDialog,
    private _message: FsMessage,
  ) { }

  public ngOnInit() {
    this._configList();
  }

  public reload() {
    this.list.reload();
  }

  public open(process) {
    this._dialog.open(ProcessComponent, {
      data: {
        process,
        download: this.download,
        run: this.run,
        loadProcess: this.loadProcess,
        queue: this.queue,
        kill: this.kill,
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

  private _configList() {
    this.config = {
      actions: [],
      rowActions: [],
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
        return this.loadProcesses(query)
          .pipe(
            map((response: any) => ({ data: response.data, paging: response.paging })),
          );
      },
    };

    if (this.run) {
      this.config.rowActions
        .push(
          {
            label: 'Run',
            show: (process) => {
              return process.state !== ProcessState.Running;
            },
            click: (data) => {
              this._message.info('Running process...');
              this.run(data)
                .subscribe(() => {
                  this.reload();
                  this._message.success('Succesfully ran process');
                });

              setTimeout(() => {
                this.reload();
              }, 500);
            },
          },
        );
    }

    if (this.kill) {
      this.config.rowActions.push({
        label: 'Kill',
        show: (data) => {
          return !!data.pid;
        },
        click: (data) => {
          this._message.info('Killing process...');
          this.kill(data)
            .subscribe(() => {
              this.reload();
              this._message.success('Succesfully killed process');
            });

          setTimeout(() => {
            this.reload();
          }, 500);
        },
      });
    }

    if (this.delete) {
      this.config.rowActions.push({
        label: 'Delete',
        click: (data) => {
          this.delete(data)
            .subscribe(() => {
              this.reload();
              this._message.success('Deleted process');
            });
        },
      });
    }

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
