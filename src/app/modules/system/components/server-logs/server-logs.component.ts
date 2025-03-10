import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { index } from '@firestitch/common';
import { ItemType } from '@firestitch/filter';
import { FsListAction, FsListComponent, FsListConfig, PaginationStrategy } from '@firestitch/list';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ServerLogComponent } from '../server-log/server-log.component';


@Component({
  selector: 'fs-system-server-logs',
  templateUrl: './server-logs.component.html',
  styleUrls: ['./server-logs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerLogsComponent implements OnInit {

  @ViewChild('list', { static: true }) public list: FsListComponent;

  @Input() public loadLogs: (data: any) => Observable<{ data: any[], paging: any }>;

  public config: FsListConfig = null;
  public actions: FsListAction[] = [];
  public LogTypes = index(LogTypes, 'value', 'name');

  constructor(
    private _dialog: MatDialog,
  ) { }

  public ngOnInit() {
    this._configList();
  }

  public open(log) {
    this._dialog.open(ServerLogComponent, {
      data: { log: log },
      width: '85%',
    });
  }

  private _configList() {
    this.config = {
      actions: this.actions,
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
        return this.loadLogs(query)
          .pipe(
            map((response: any) => ({ data: response.data, paging: response.paging })),
          );
      },
    };
  }
}

const LogTypes = [
  { value: '1', name: 'Fatal Error' },        // E_ERROR
  { value: '2', name: 'Warning' },            // E_WARNING
  { value: '4', name: 'Parse Error' },        // E_PARSE
  { value: '8', name: 'Notice' },             // E_NOTICE
  { value: '16', name: 'Core Error' },        // E_CORE_ERROR
  { value: '32', name: 'Core Warning' },      // E_CORE_WARNING
  { value: '64', name: 'Compile Error' },     // E_COMPILE_ERROR
  { value: '128', name: 'Compile Warning' },  // E_COMPILE_WARNING
  { value: '256', name: 'User Error' },       // E_USER_ERROR
  { value: '512', name: 'User Warning' },     // E_USER_WARNING
  { value: '1024', name: 'User Notice' },     // E_USER_NOTICE
  { value: '2048', name: 'Strict Notice' },   // E_STRICT
  { value: '4096', name: 'Recoverable Error' }, // E_RECOVERABLE_ERROR
  { value: '8192', name: 'Deprecated' },      // E_DEPRECATED
  { value: '16384', name: 'User Deprecated' }, // E_USER_DEPRECATED
  { value: 'exception', name: 'Exception' },
];

