import { SystemService } from './../../services/system.service';
import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { FsMessage } from '@firestitch/message';
import { map } from 'rxjs/operators';
import { differenceInHours } from 'date-fns';
import { isObject } from 'lodash-es';

@Component({
  selector: 'fs-system-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: [ 'dashboard.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {

  public dashboard;

  @Input() init: Function;
  @Input() upgrade: Function;
  @Input() load: Function;

  constructor(
    private _message: FsMessage,
    private _cdRef: ChangeDetectorRef,
    private _systemService: SystemService
  ) { }

  ngOnInit() {
    this._load();
  }

  private _load() {
    this.load()
    .subscribe(dashboard => {
      this.dashboard = this._systemService.input(dashboard);
      this.dashboard.cronRanAttention = differenceInHours(new Date(), new Date(dashboard.cronRan)) > 1;
      this._cdRef.markForCheck();
    });
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
