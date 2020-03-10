import { SystemService } from './../../services/system.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { ItemType } from '@firestitch/filter';
import { ProcessStates } from '../../consts';
import { FsListComponent, FsListConfig } from '@firestitch/list';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { indexNameValue } from '../../helpers/index-name-value';


@Component({
  selector: 'fs-system-processes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.scss']
})
export class ProcessesComponent implements OnInit {

  @ViewChild('list', { static: true }) list: FsListComponent;

  @Input() load: Function;

  public config: FsListConfig = null;
  public processStates = indexNameValue(ProcessStates);

  constructor(
    private _systemService: SystemService,
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
          values: ProcessStates
        },
      ],
      fetch: query => {
        Object.assign(query, { });
        return this.load(query)
          .pipe(
            map((response: any) => ({ data: this._systemService.input(response.data), paging: response.paging }))
          );
      }
    };
  }
}
