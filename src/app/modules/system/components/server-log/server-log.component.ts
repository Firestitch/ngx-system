import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  templateUrl: './server-log.component.html',
  styleUrls: ['./server-log.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerLogComponent implements OnInit {

  public log;

  constructor(@Inject(MAT_DIALOG_DATA) public data) {}

  public ngOnInit() {

    if (this.data.log) {
      this.log = this.data.log;

      try {
        this.log.backtrace = JSON.parse(this.log.backtrace);
      } catch (e) {
        //
      }

      try {
        this.log.server = JSON.parse(this.log.server);
      } catch (e) {
        // 
      }
    }
  }
}
