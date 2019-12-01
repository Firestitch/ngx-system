import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { chain } from 'lodash-es';
import { ItemType } from '@firestitch/filter';
import { ProcessStates } from '../../consts';
import { FsListComponent, FsListConfig } from '@firestitch/list';
import { MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';


@Component({
  selector: 'fs-system-processes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.scss']
})
export class ProcessesComponent implements OnInit {

  @ViewChild('list', { static: true }) list: FsListComponent;

  @Input() load: Function;

  public config: FsListConfig = null;
  public processStates = chain(ProcessStates)
                          .keyBy('value')
                          .mapValues('name')
                          .value();

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
          values: ProcessStates
        },
      ],
      fetch: query => {
        Object.assign(query, { });
        return this.load(query)
          .pipe(
            map((response: any) => ({ data: response.processes, paging: response.paging }))
          );
      }
    };
  }
}