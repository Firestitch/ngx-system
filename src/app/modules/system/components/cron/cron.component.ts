import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FsListConfig } from '@firestitch/list';

import { CronProcessStates, CronStates } from '../../consts';
import { CronData } from '../../data/cron.data';
import { indexNameValue } from '../../helpers/index-name-value';


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

  public config: FsListConfig;
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
