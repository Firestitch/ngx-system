import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { ItemType } from '@firestitch/filter';
import { FsListComponent, FsListConfig } from '@firestitch/list';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { QueryLogComponent } from '..';


@Component({
  templateUrl: './query-logs.component.html',
  styleUrls: ['./query-logs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QueryLogsComponent implements OnInit {

  @ViewChild(FsListComponent)
  public list: FsListComponent;

  @Input() public loadQueryLogs: (query: any) => Observable<{ data: any; paging: any }>;
  @Input() public purgeQueryLogs: () => Observable<any>;

  public listConfig: FsListConfig;

  constructor(
    private _dialog: MatDialog,
  ) { }

  public openQueryLog(queryLog): void {
    this._dialog.open(QueryLogComponent, {
      data: { queryLog },
      width: '100%',
    });
  }

  public ngOnInit(): void {
    this.listConfig = {
      filters: [
        {
          name: 'keyword',
          type: ItemType.Keyword,
          label: 'Search',
        },
        {
          name: 'optimized',
          type: ItemType.Select,
          label: 'Optimization',
          values: [
            { name: 'Any', value: undefined },
            { name: 'Yes', value: 'true' },
            { name: 'No', value: 'false' },
          ],
        },
        {
          name: 'createDate',
          type: ItemType.DateTimeRange,
          label: ['From Date', 'To Date'],
        },
        {
          name: 'duration',
          type: ItemType.Range,
          label: ['Min Duration', 'Max Duration'],
        },
      ],
      actions: [
        {
          label: 'Purge',
          primary: false,
          click: () => {
            this.purgeQueryLogs()
              .subscribe(() => {
                this.list.reload();
              });
          },
        },
      ],
      fetch: (query) => {
        return this.loadQueryLogs(query)
          .pipe(
            map((response) => ({ data: response.data, paging: response.paging })),
          );
      },
    };
  }

}
