import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { FsApi } from '@firestitch/api';
import { index } from '@firestitch/common';
import { ItemType } from '@firestitch/filter';
import { FsListAction, FsListComponent, FsListConfig, PaginationStrategy } from '@firestitch/list';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LogTypes } from '../../../../consts';

import { ServerLogComponent } from './components';


@Component({
  selector: 'fs-system-server-logs',
  templateUrl: './server-logs.component.html',
  styleUrls: ['./server-logs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerLogsComponent implements OnInit {

  @ViewChild(FsListComponent) 
  public list: FsListComponent;

  @Input() public loadLogs: (data: any) => Observable<{ data: any[], paging: any }>;

  public config: FsListConfig = null;
  public actions: FsListAction[] = [];
  public LogTypes = index(LogTypes, 'value', 'name');

  constructor(
    private _dialog: MatDialog,
    private _api: FsApi,
  ) { }

  public ngOnInit() {
    this._configList();
  }

  public toggleAcknowledged(log) {
    const acknowledge = log.acknowledged ? 'unacknowledge' : 'acknowledge';
    this._api
      .put(`system/logs/server/${log.id}/${acknowledge}`)
      .subscribe((response) => {
        this.list
          .updateData([response],
            (item: any) => {
              return item.id === log.id;
            });
      });
  }

  public open(log) {
    this._dialog
      .open(ServerLogComponent, {
        data: { log: log },
        width: '85%',
      });
  }

  private _configList() {
    this.config = {
      actions: [
        ...this.actions,
        {
          primary: false,
          label: 'Acknowledge',
          click: () =>  {
            this._api
              .put('system/logs/server/acknowledge')
              .subscribe(() => {
                this.list.reload();
              });
          },
        },
      ],
      paging:  {
        strategy: PaginationStrategy.Many,
      },
      filters: [
        {
          type: ItemType.Keyword,
          name: 'keyword',
          label: 'Search',
        },
      ],
      fetch: (query) => {
        return this._api
          .get('system/logs/server', query, { key: null })
          .pipe(
            map((response: any) => ({ data: response.logs, paging: response.paging })),
          );
      },
    };
  }
}
