import { DashboardAction } from './../../interfaces/dashboard-action';
import { SystemService } from './../../services/system.service';
import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { FsMessage } from '@firestitch/message';
import { differenceInHours } from 'date-fns';


@Component({
  selector: 'fs-system-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: [ 'dashboard.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {

  public dashboard;
  public buttonActions: DashboardAction[] = [];
  public menuActions: DashboardAction[] = [];

  @Input() init: Function;
  @Input() upgrade: Function;
  @Input() load: Function;

  @Input() actions: DashboardAction[] = [];

  constructor(
    private _message: FsMessage,
    private _cdRef: ChangeDetectorRef,
    private _systemService: SystemService
  ) { }

  ngOnInit() {
    this._load();
    this.buttonActions = this.actions.filter(item => { return !item.menu; });
    this.menuActions = this.actions.filter(item => { return item.menu; });
  }

  private _load() {
    this.load()
    .subscribe(dashboard => {
      this.dashboard = this._systemService.input(dashboard);
      this.dashboard.cronRanAttention = differenceInHours(new Date(), new Date(dashboard.cronRan)) > 1;
      this._cdRef.markForCheck();
    });
  }

  public actionClick(action) {
    action.click();
  }

  initClick() {
    this.init()
    .subscribe(() => {
      this._message.success('Successfully initialized the system');
    });
  }

  upgradeClick() {
    this.upgrade()
    .subscribe(() => {
      this._load();
      this._message.success('Successfully upgraded the system');
    });
  }
}
