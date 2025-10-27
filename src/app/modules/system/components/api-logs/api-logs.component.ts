import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { ItemType } from '@firestitch/filter';
import { FsListComponent, FsListConfig, PaginationStrategy, FsListModule } from '@firestitch/list';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiLogStates } from '../../consts';
import { indexNameValue } from '../../helpers/index-name-value';
import { ApiLogComponent } from '../api-log/api-log.component';
import { MatIcon } from '@angular/material/icon';
import { NgClass } from '@angular/common';
import { FsDateModule } from '@firestitch/date';


@Component({
    selector: 'fs-system-api-logs',
    templateUrl: './api-logs.component.html',
    styleUrls: ['./api-logs.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FsListModule,
        MatIcon,
        NgClass,
        FsDateModule,
    ],
})
export class ApiLogsComponent implements OnInit {

  @ViewChild(FsListComponent, { static: true })
  public list: FsListComponent;

  @Input() public loadApiLogs: (data: any) => Observable<{ data: any[]; paging: any }>;

  public config: FsListConfig = null;
  public apiLogStates = indexNameValue(ApiLogStates);

  constructor(
    private _dialog: MatDialog,
  ) { }

  public ngOnInit() {
    this._configList();
  }

  public open(apiLog) {
    this._dialog.open(ApiLogComponent, {
      data: { apiLog },
      width: '85%',
    });
  }

  private _configList() {
    this.config = {
      paging: {
        strategy: PaginationStrategy.Many,
      },
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
          values: ApiLogStates,
        },
        {
          name: 'createDate',
          type: ItemType.DateRange,
          label: ['From Date', 'To Date'],
        },
      ],
      fetch: (query) => {
        Object.assign(query, { });

        return this.loadApiLogs(query)
          .pipe(
            map((response: any) => ({ data: response.data, paging: response.paging })),
          );
      },
    };
  }
}
