import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';

import { FsMessage } from '@firestitch/message';
import { BuildData, FsBuildService } from '@firestitch/build';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { differenceInMinutes } from 'date-fns';

import { DashboardAction } from './../../interfaces/dashboard-action';


@Component({
  selector: 'fs-system-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: [ 'dashboard.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {

  public dashboard;
  public buttonActions: DashboardAction[] = [];
  public build: BuildData;
  public menuActions: DashboardAction[] = [];

  private _destroy$ = new Subject();

  @Input() init: Function;
  @Input() upgrade: Function;
  @Input() load: Function;

  @Input() actions: DashboardAction[] = [];

  constructor(
    private _message: FsMessage,
    private _cdRef: ChangeDetectorRef,
    private _buildService: FsBuildService,
  ) { }

  ngOnInit() {
    this._load();
    this.buttonActions = this.actions.filter(item => { return !item.menu; });
    this.menuActions = this.actions.filter(item => { return item.menu; });

    this.build = this._buildService.build;
    this._buildService.build$
    .pipe(
      takeUntil(this._destroy$)
    )
    .subscribe((build: BuildData) => {
      this.build = build;
      this._cdRef.markForCheck();
    });
  }

  private _load() {
    this.load()
    .subscribe((dashboard) => {
      this.dashboard = dashboard;
      this.dashboard.cronRanAttention = !dashboard.cronRan ||
         differenceInMinutes(new Date(), new Date(dashboard.cronRan)) > 15;
      this._cdRef.markForCheck();
    });
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public actionClick(action) {
    action.click();
  }

  public initClick() {
    this.init()
    .subscribe(() => {
      this._message.success('Successfully initialized the system');
    });
  }

  public upgradeClick() {
    this.upgrade()
    .subscribe(() => {
      this._load();
      this._message.success('Successfully upgraded the system');
    });
  }
}
