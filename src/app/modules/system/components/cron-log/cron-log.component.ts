import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CronLogStates } from '../../consts/cron-log-states.const';
import { indexNameValue } from '../../helpers/index-name-value';


@Component({
  templateUrl: './cron-log.component.html',
  styleUrls: ['./cron-log.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CronLogComponent implements OnInit {

  public cronLog;
  public CronLogStates = indexNameValue(CronLogStates);
  public CronLogStateColors = {};
  
  constructor(
    @Inject(MAT_DIALOG_DATA) private _data,
  ) {}

  public ngOnInit(): void {
    this.cronLog = this._data.cronLog;
    this.CronLogStateColors = CronLogStates
      .reduce((accum, cronLogState) => {
        accum[cronLogState.value] = cronLogState.color;

        return accum;
      }, {});
  }
}
