import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { FsListConfig, FsListComponent } from '@firestitch/list';
import { map } from 'rxjs/operators';
import { ItemType } from '@firestitch/filter';
import { MatDialog } from '@angular/material/dialog';
import { ServerLogComponent } from '../server-log/server-log.component';
import { Observable } from 'rxjs';


@Component({
  selector: 'fs-system-server-logs',
  templateUrl: './server-logs.component.html',
  styleUrls: ['./server-logs.component.scss']
})
export class ServerLogsComponent implements OnInit {

  @ViewChild('list', { static: true }) public list: FsListComponent;

  @Input() public loadLogs: (data: any) => Observable<{ data: any[], paging: any }>;

  public config: FsListConfig = null;
  public logTypes = [];

  constructor(
    private _dialog: MatDialog,
  ) { }

  ngOnInit() {
    this._configList();
  }

  private _configList() {

    this.config = {
      filters: [
        {
          type: ItemType.Keyword,
          name: 'keyword',
          label: 'Search'
        }
      ],
      fetch: query => {
        return this.loadLogs(query)
          .pipe(
            map((response: any) => ({ data: response.data, paging: response.paging }))
          );
      }
    };
  }

  public open(log) {
    this._dialog.open(ServerLogComponent, {
      data: { log: log },
      width: '85%'
    });
  }
}
