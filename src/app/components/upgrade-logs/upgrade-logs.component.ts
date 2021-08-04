import { SystemService } from './../../services/system.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ItemType } from '@firestitch/filter';
import { FsListConfig, FsListComponent } from '@firestitch/list';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'fs-system-upgrade-logs',
  templateUrl: './upgrade-logs.component.html',
  styleUrls: ['./upgrade-logs.component.scss']
})
export class UpgradeLogsComponent implements OnInit {

  @ViewChild(FsListComponent, { static: true }) list: FsListComponent;

  @Input() loadUpgradeLogs: (data: any) => Observable<{ data: any[], paging: any }>;

  public config: FsListConfig = null;
  public logTypes = [];

  constructor(private _systemService: SystemService) {}

  ngOnInit() {
    this._configList();
  }
  private _configList() {

    this.config = {
      paging: false,
      filters: [
        {
          type: ItemType.Keyword,
          name: 'keyword',
          label: 'Search'
        }
      ],
      fetch: query => {
        return this.loadUpgradeLogs(query)
        .pipe(
          map((response: any) => ({ data: this._systemService.input(response.data), paging: response.paging }))
        );
      }
    };
  }
}
