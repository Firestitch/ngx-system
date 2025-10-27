import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';

import { BuildData, FsBuildService } from '@firestitch/build';
import { FsMessage } from '@firestitch/message';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { differenceInMinutes } from 'date-fns';

import { DashboardAction } from './../../interfaces/dashboard-action';
import { FsSkeletonModule } from '@firestitch/skeleton';
import { FsLabelModule } from '@firestitch/label';
import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatButton } from '@angular/material/button';
import { FsMenuModule } from '@firestitch/menu';
import { FsDateModule } from '@firestitch/date';


@Component({
    selector: 'fs-system-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FsSkeletonModule,
        FsLabelModule,
        NgClass,
        MatIcon,
        MatTooltip,
        MatButton,
        FsMenuModule,
        FsDateModule,
    ],
})
export class DashboardComponent implements OnInit, OnDestroy {

  @Input() public init: () => any;
  @Input() public upgrade: () => any;
  @Input() public load: () => any;

  @Input() public actions: DashboardAction[] = [];

  public dashboard;
  public buttonActions: DashboardAction[] = [];
  public build: BuildData;
  public menuActions: DashboardAction[] = [];

  private _destroy$ = new Subject();
  constructor(
    private _message: FsMessage,
    private _cdRef: ChangeDetectorRef,
    private _buildService: FsBuildService,
  ) { }

  public ngOnInit() {
    this._load();
    this.buttonActions = this.actions.filter((item) => {
      return !item.menu; 
    });
    this.menuActions = this.actions.filter((item) => {
      return item.menu; 
    });

    this.build = this._buildService.build;
    this._buildService.build$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((build: BuildData) => {
        this.build = build;
        this._cdRef.markForCheck();
      });
  }

  public ngOnDestroy() {
    this._destroy$.next(null);
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

  private _load() {
    this.load()
      .subscribe((dashboard) => {
        this.dashboard = dashboard;
        this.dashboard.cronRanAttention = !dashboard.cronRan ||
         differenceInMinutes(new Date(), new Date(dashboard.cronRan)) > 15;
        this._cdRef.markForCheck();
      });
  }
}
