import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ItemType } from '@firestitch/filter';
import { FsListConfig, FsListComponent } from '@firestitch/list';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { ApiLogStates } from '../../consts';
import { ApiLogComponent } from '../api-log/api-log.component';
import { indexNameValue } from '../../helpers/index-name-value';


@Component({
  selector: 'fs-system-api-logs',
  templateUrl: './api-logs.component.html',
  styleUrls: ['./api-logs.component.scss']
})
export class ApiLogsComponent implements OnInit {

  @ViewChild(FsListComponent, { static: true }) list: FsListComponent;

  @Input() load: Function;

  public config: FsListConfig = null;
  public apiLogStates = indexNameValue(ApiLogStates);

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
        },
        {
          type: ItemType.Select,
          name: 'state',
          label: 'Status',
          values: ApiLogStates
        },
        {
          name: 'create_date',
          type: ItemType.DateRange,
          label: ['From Date', 'To Date'],
        }
      ],
      fetch: query => {
        Object.assign(query, { });
        return this.load(query)
          .pipe(
            map((response: any) => ({ data: response.api_logs, paging: response.paging }))
          );
      }
    };
  }

  public open(api_log) {
    this._dialog.open(ApiLogComponent, {
      data: { api_log: api_log },
      width: '85%'
    });
  }
}
