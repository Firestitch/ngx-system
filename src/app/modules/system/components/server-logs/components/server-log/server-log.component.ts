import { CommonModule, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FsBadgeModule } from '@firestitch/badge';
import { FsDateModule } from '@firestitch/date';
import { FsDialogModule } from '@firestitch/dialog';
import { FsLabelModule } from '@firestitch/label';
import { FsSkeletonModule } from '@firestitch/skeleton';


@Component({
  templateUrl: './server-log.component.html',
  styleUrls: ['./server-log.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    FsLabelModule,
    FsLabelModule,
    FsBadgeModule,
    JsonPipe,
    FsDateModule,
    FsSkeletonModule,
    FsDialogModule,
  ],
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
