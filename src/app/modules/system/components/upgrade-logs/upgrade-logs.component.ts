import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';

import { ItemType } from '@firestitch/filter';
import { FsListComponent, FsListConfig, FsListModule } from '@firestitch/list';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FsDateModule } from '@firestitch/date';


@Component({
    selector: 'fs-system-upgrade-logs',
    templateUrl: './upgrade-logs.component.html',
    styleUrls: ['./upgrade-logs.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FsListModule, FsDateModule],
})
export class UpgradeLogsComponent implements OnInit {

  @ViewChild(FsListComponent, { static: true })
  public list: FsListComponent;

  @Input() public loadUpgradeLogs: (data: any) => Observable<{ data: any[], paging: any }>;

  public config: FsListConfig = null;
  public logTypes = [];

  public ngOnInit() {
    this._configList();
  }

  private _configList() {

    this.config = {
      paging: false,
      filters: [
        {
          type: ItemType.Keyword,
          name: 'keyword',
          label: 'Search',
        },
      ],
      fetch: (query) => {
        return this.loadUpgradeLogs(query)
          .pipe(
            map((response: any) => ({ data: response.data, paging: response.paging })),
          );
      },
    };
  }
}
