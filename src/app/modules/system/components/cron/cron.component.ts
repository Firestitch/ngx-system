import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { ItemType } from '@firestitch/filter';
import { FsListConfig } from '@firestitch/list';

import { CronProcessStates, CronStates } from '../../consts';
import { CronLogStates } from '../../consts/cron-log-states.const';
import { CronData } from '../../data/cron.data';
import { indexNameValue } from '../../helpers/index-name-value';
import { CronLogComponent } from '../cron-log';


@Component({
  templateUrl: './cron.component.html',
  styleUrls: ['./cron.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CronComponent implements OnInit {

  public cron;
  public tabIndex = 0;
  public CronStates = indexNameValue(CronStates);
  public CronProcessStates = indexNameValue(CronProcessStates);
  public CronLogStates = indexNameValue(CronLogStates);
  public CronLogStateColors = {};

  public config: FsListConfig;
  public cronActions;
  
  private _cronData = inject(CronData);
  private _dialog = inject(MatDialog);
  private _cdRef = inject(ChangeDetectorRef);
  private _data = inject(MAT_DIALOG_DATA);

  public ngOnInit(): void {
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

  public cronActionClick(cronAction) {
    cronAction
      .action(this.cron)
      .subscribe(() => {
        this.load();
      });
  }

  public selectedIndexChange(index) {
    this.tabIndex = index;
  }

  public load(): void {
    const query = {
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    this._cronData.get(this._data.cron.id, query)
      .subscribe((cron) => {
        this.cron = {
          ...this._data.cron,
          ...cron,
        };

        if(this._data.loadCronLogs) {
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

              return this._data.loadCronLogs(query);
            },
          };
        }

        this.cronActions = this._data.cronActions
          .filter((cronLogAction) => {
            return cronLogAction.show(this.cron);
          });

        this._cdRef.markForCheck();
      });
  }
}
