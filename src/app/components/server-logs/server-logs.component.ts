import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { FsMessage } from '@firestitch/message';
import { chain } from 'lodash-es';
import { CronStates } from '../../consts';
import { FsListConfig, FsListComponent } from '@firestitch/list';
import { map } from 'rxjs/operators';
import { ItemType } from '@firestitch/filter';
import { MatDialog } from '@angular/material/dialog';
import { ServerLogComponent } from '../server-log/server-log.component';


@Component({
  selector: 'fs-system-server-logs',
  templateUrl: './server-logs.component.html',
  styleUrls: ['./server-logs.component.scss']
})
export class ServerLogsComponent implements OnInit {

  @ViewChild('list', { static: true }) list: FsListComponent;

  @Input() load: Function;

  public config: FsListConfig = null;
  public logTypes = [];

  constructor(
    private _dialog: MatDialog
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
        Object.assign(query, { });
        return this.load(query)
          .pipe(
            map((response: any) => ({ data: response.logs, paging: response.paging }))
          );
      }
    };
  }

  public open(log) {
    const dialogRef = this._dialog.open(ServerLogComponent, {
      data: { log: log },
      width: '85%'
    });
  }
}
