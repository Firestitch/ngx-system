import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit,
} from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';

import { CronProcessStates, CronStates } from '../../consts';
import { CronData } from '../../data/cron.data';
import { indexNameValue } from '../../helpers/index-name-value';
import { FsSkeletonModule } from '@firestitch/skeleton';
import { FsDialogModule } from '@firestitch/dialog';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatTabGroup, MatTab, MatTabContent } from '@angular/material/tabs';
import { FsLabelModule } from '@firestitch/label';
import { FsDateModule } from '@firestitch/date';
import { CronLogsComponent } from '../cron-logs/cron-logs.component';
import { MatButton } from '@angular/material/button';


@Component({
    templateUrl: './cron.component.html',
    styleUrls: ['./cron.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FsSkeletonModule,
        FsDialogModule,
        MatDialogTitle,
        CdkScrollable,
        MatDialogContent,
        MatTabGroup,
        MatTab,
        FsLabelModule,
        FsDateModule,
        MatTabContent,
        CronLogsComponent,
        MatDialogActions,
        MatButton,
        MatDialogClose,
    ],
})
export class CronComponent implements OnInit {

  public cron;
  public tabIndex = 0;
  public CronStates = indexNameValue(CronStates);
  public CronProcessStates = indexNameValue(CronProcessStates);

  public cronActions;
  
  private _cronData = inject(CronData);
  private _cdRef = inject(ChangeDetectorRef);
  private _data = inject(MAT_DIALOG_DATA);

  public ngOnInit(): void {
    this.load();
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
    this._cronData
      .get(this._data.cron.id, {
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      })
      .subscribe((cron) => {
        this.cron = {
          ...this._data.cron,
          ...cron,
        };

        this.cronActions = this._data.cronActions
          .filter((cronLogAction) => {
            return cronLogAction.show(this.cron);
          });

        this._cdRef.markForCheck();
      });
  }
}
