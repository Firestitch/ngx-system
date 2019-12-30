import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { FsMessage } from '@firestitch/message';
import { CronStates } from '../../consts';
import { FsListConfig, FsListComponent } from '@firestitch/list';
import { map } from 'rxjs/operators';
import { ItemType } from '@firestitch/filter';
import { indexNameValue } from '../../helpers/index-name-value';


@Component({
  selector: 'fs-system-crons',
  templateUrl: './crons.component.html',
  styleUrls: ['./crons.component.scss']
})
export class CronsComponent implements OnInit {

  @ViewChild(FsListComponent, { static: true }) list: FsListComponent;

  @Input() enable: Function;
  @Input() disable: Function;
  @Input() kill: Function;
  @Input() queue: Function;
  @Input() run: Function;
  @Input() load: Function;

  public config: FsListConfig = null;
  public cronStates = indexNameValue(CronStates);

  constructor(
    private _message: FsMessage,
  ) { }

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
      rowActions: [
        {
          click: data => {
            return this.enable(data)
            .subscribe(() => {
              this._message.success('Enabled cron');
              this.list.reload();
            })
          },
          label: 'Enable'
        },
        {
          click: data => {
            return this.disable(data)
            .subscribe(() => {
              this._message.success('Disabled cron');
              this.list.reload();
            })
          },
          label: 'Disable'
        },
        {
          click: data => {
            return this.kill(data)
            .subscribe(() => {
              this._message.success('Killed cron');
              this.list.reload();
            })
          },
          label: 'Kill'
        },
        {
          click: data => {
            return this.queue(data)
            .subscribe(() => {
              this._message.success('Queued cron');
              this.list.reload();
            })
          },
          label: 'Queue'
        },
        {
          click: data => {
            return this.run(data)
            .subscribe((response) => {
              this._message.success('Cron ran');
              this.list.reload();
            })
          },
          label: 'Run'
        }
      ],
      fetch: query => {
        query.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        return this.load(query, { key: null })
          .pipe(
            map(response => ({ data: response }))
          );
      }
    };
  }
}
