import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { ItemType } from '@firestitch/filter';
import { FsListComponent, FsListConfig, PaginationStrategy } from '@firestitch/list';

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
  public logTypes = [];

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
