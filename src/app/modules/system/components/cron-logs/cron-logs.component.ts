import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { FsDateModule } from '@firestitch/date';
import { ItemType } from '@firestitch/filter';
import { FsListConfig, FsListModule } from '@firestitch/list';

import { map } from 'rxjs/operators';

import { CronLogStates } from '../../consts/cron-log-states.const';
import { CronData } from '../../data/cron.data';
import { indexNameValue } from '../../helpers/index-name-value';
import { CronLogComponent } from '../cron-log';


@Component({
  selector: 'app-cron-logs',
  templateUrl: './cron-logs.component.html',
  styleUrls: ['./cron-logs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    FsListModule,
    FsDateModule,
  ],
})
export class CronLogsComponent implements OnInit {

  @Input() public cron;
  public CronLogStateColors = {};

  public config: FsListConfig;
  public CronLogStates = indexNameValue(CronLogStates);
  public cronActions;
  
  private _cronData = inject(CronData);
  private _dialog = inject(MatDialog);
  private _data = inject(MAT_DIALOG_DATA);

  public ngOnInit(): void {
    this.cron = this._data.cron;
    this.load();
    this.CronLogStateColors = CronLogStates
      .reduce((accum, cronLogState) => {
        accum[cronLogState.value] = cronLogState.color;

        return accum;
      }, {});
  }

  public cronLogOpen(cronLog): void {
    this._dialog.open(CronLogComponent, {
      data: { 
        cronLog,
      },
      width: '85%',
    });    
  }

  public load(): void {
    this.config = {
      filters: [
        {
          type: ItemType.Select,
          name: 'state',
          label: 'Status',
          values: [
            { name: 'All', value: null },
            ...CronLogStates,
          ],
        },
        {
          type: ItemType.DateRange,
          name: 'date',
          label: ['From Date', 'To Date'],
        },
      ],          
      fetch: (query) => {
        query = {
          ...query,
          cronId: this.cron.id,
        };

        return this._cronData.cronLogGets(query, {
          key: null,
        })
          .pipe(
            map((data: any) => {
              return { data: data.cronLogs, paging: data.paging };
            }),
          );
      },
    };
  }
}
