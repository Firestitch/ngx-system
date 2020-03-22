import { ProcessState } from '../../enums';
import { FsMessage } from '@firestitch/message';
import { ProcessAction } from './../../interfaces/process-action';
import { SystemService } from './../../services/system.service';
import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';

import { ItemType } from '@firestitch/filter';
import { ProcessStates } from '../../consts';
import { FsListComponent, FsListConfig } from '@firestitch/list';
import { map, takeUntil } from 'rxjs/operators';
import { indexNameValue } from '../../helpers/index-name-value';
import { MatDialog } from '@angular/material/dialog';
import { Subject, Observable } from 'rxjs';


@Component({
  selector: 'fs-system-processes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.scss']
})
export class ProcessesComponent implements OnInit, OnDestroy {

  @ViewChild(FsListComponent, { static: false }) list: FsListComponent;

  @Input() load: (data: any) => Observable<any>;
  @Input() run: (data: any) => Observable<any>;
  @Input() kill: (data: any) => Observable<any>;
  @Input() delete: (data: any) => Observable<any>;
  @Input() download: (data: any) => any;
  @Input() actions: ProcessAction[] = [];

  public config: FsListConfig = null;
  public ProcessStates = indexNameValue(ProcessStates);
  public ProcessState = ProcessState;

  private _destroy$ = new Subject();

  constructor(
    private _systemService: SystemService,
    private _dialog: MatDialog,
    private _message: FsMessage
  ) { }

  ngOnInit() {
    this._configList();
  }

  private _configList() {

    this.config = {
      actions: [],
      rowActions: [],
      filters: [
        {
          type: ItemType.Keyword,
          name: 'keyword',
          label: 'Search'
        },
        {
          type: ItemType.Select,
          name: 'state',
          label: 'Status',
          values: ProcessStates
        },
      ],
      fetch: query => {
        return this.load(query)
          .pipe(
            map((response: any) => ({ data: this._systemService.input(response.data), paging: response.paging }))
          );
      }
    };

    if (this.run) {
      this.config.rowActions.push({
        label: 'Run',
        click: (data) => {
          this._message.info('Running process...');
          this.run(data)
          .subscribe(() => {
            this.list.reload();
            this._message.success('Succesfully ran process');
          });

          setTimeout(() => {
            this.list.reload();
          }, 500);
        }
      });
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
            this.list.reload();
            this._message.success('Succesfully killed process');
          });

          setTimeout(() => {
            this.list.reload();
          }, 500);
        }
      });
    }

    if (this.delete) {
      this.config.rowActions.push({
        label: 'Delete',
        click: (data) => {
          this.delete(data)
          .subscribe(() => {
            this.list.reload();
            this._message.success('Deleted process');
          });
        }
      });
    }

    this.actions.forEach(action => {
      this.config.actions.push({
        primary: false,
        label: action.label,
        menu: action.menu,
        click: () => {
          if (action.click) {
            action.click();
          }

          if (action.component) {
              const dialogRef = this._dialog.open(action.component, {
                width: '800px'
              });

              dialogRef.afterClosed()
              .pipe(
                takeUntil(this._destroy$)
              )
              .subscribe(result => {
                this.list.reload();
              });
          }
        },
      });
    });
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
