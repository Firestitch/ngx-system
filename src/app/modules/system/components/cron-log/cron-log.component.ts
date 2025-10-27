import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';

import { CronLogStates } from '../../consts/cron-log-states.const';
import { indexNameValue } from '../../helpers/index-name-value';
import { FsSkeletonModule } from '@firestitch/skeleton';
import { FsDialogModule } from '@firestitch/dialog';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { FsLabelModule } from '@firestitch/label';
import { NgStyle } from '@angular/common';
import { FsDateModule } from '@firestitch/date';
import { MatButton } from '@angular/material/button';


@Component({
    templateUrl: './cron-log.component.html',
    styleUrls: ['./cron-log.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FsSkeletonModule,
        FsDialogModule,
        MatDialogTitle,
        CdkScrollable,
        MatDialogContent,
        FsLabelModule,
        NgStyle,
        FsDateModule,
        MatDialogActions,
        MatButton,
        MatDialogClose,
    ],
})
export class CronLogComponent implements OnInit {
  private _data = inject(MAT_DIALOG_DATA);


  public cronLog;
  public CronLogStates = indexNameValue(CronLogStates);
  public CronLogStateColors = {};

  public ngOnInit(): void {
    this.cronLog = this._data.cronLog;
    this.CronLogStateColors = CronLogStates
      .reduce((accum, cronLogState) => {
        accum[cronLogState.value] = cronLogState.color;

        return accum;
      }, {});
  }
}
