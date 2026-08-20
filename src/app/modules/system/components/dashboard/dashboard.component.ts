import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, inject } from '@angular/core';

import { StreamEventData } from '@firestitch/api';
import { BuildData, FsBuildService } from '@firestitch/build';
import { FsMessage } from '@firestitch/message';
import { FsProcess, ProcessState } from '@firestitch/process';

import { Subject } from 'rxjs';
import { filter, map, take, takeUntil } from 'rxjs/operators';

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
import { UpgradeEvent } from './../../interfaces/upgrade-event';


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
  private _message = inject(FsMessage);
  private _cdRef = inject(ChangeDetectorRef);
  private _buildService = inject(FsBuildService);
  private _process = inject(FsProcess);


  @Input() public init: () => any;
  @Input() public upgrade: () => any;
  @Input() public load: () => any;

  @Input() public actions: DashboardAction[] = [];

  public dashboard;
  public buttonActions: DashboardAction[] = [];
  public build: BuildData;
  public menuActions: DashboardAction[] = [];

  private _destroy$ = new Subject();

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

  /**
   * Run the pending upgrades as a process rather than behind a spinner.
   *
   * A spinner says the same thing for ten seconds and for ten minutes, which is
   * the whole problem: an upgrade that rebuilds the largest table in a schema
   * looks exactly like one that has hung, and the only way anybody found out
   * which was to wait for a proxy to give up.
   *
   * Works whether or not the application's endpoint streams. Where it does, each
   * NDJSON event becomes a line in the process log — which function is running,
   * how far through it is, what each one cost. Where it does not, the single
   * reply produces no lines and the process is simply a labelled spinner, which
   * is what every application had before this.
   */
  public upgradeClick() {
    const process = this._process.run(
      'System upgrade',
      this.upgrade()
        .pipe(
          map((event) => this._upgradeLine(event)),
          filter((line): line is string => line !== null),
        ),
    );

    // The pending-upgrade count on this screen is the thing the button was
    // pressed to change, so it is re-read when the run settles — including when
    // it FAILS, because a run that stopped halfway still completed everything
    // before the one that broke.
    process.completed$
      .pipe(
        take(1),
        takeUntil(this._destroy$),
      )
      .subscribe((state: ProcessState) => {
        this._load();

        if (state === ProcessState.Success) {
          this._message.success('Successfully upgraded the system');
        }
      });
  }

  /**
   * One emission off the upgrade endpoint, as a line for the process log — or
   * null for anything with nothing to say, which is dropped rather than logged.
   *
   * `FsApi.stream()` wraps every NDJSON line in a `StreamEventData`, and
   * `FsProcess` logs a string emission verbatim. So the mapping happens here: an
   * object handed to the log renders as `[object Object]`.
   *
   * `ping` is deliberately silent. It is the heartbeat that stops a proxy
   * closing a run that is still working, it fires after every statement, and it
   * would bury the events worth reading.
   */
  private _upgradeLine(event: unknown): string | null {
    const data: UpgradeEvent = (event instanceof StreamEventData ? event.data : event) as UpgradeEvent;

    if (typeof data === 'string') {
      return data;
    }

    if (!data || !data.type || data.type === 'ping') {
      return null;
    }

    const step = `${data.index} of ${data.total}`;

    switch (data.type) {
      case 'start':
        return data.total
          ? `${data.total} upgrade(s) to run: ${(data.functions || []).join(', ')}`
          : 'Nothing to upgrade';

      case 'upgrade':
        if (data.state === 'started') {
          return `${step} ${data.name}…`;
        }

        return data.state === 'completed'
          ? `${step} ${data.name} — ${data.duration}`
          : `${step} ${data.name} FAILED — ${data.message}`;

      case 'done':
        return data.completed
          ? `Completed ${data.completed} upgrade(s)`
          : 'Nothing to upgrade';

      default:
        return data.message || null;
    }
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
