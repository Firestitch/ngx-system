import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';

import { FsClipboard } from '@firestitch/clipboard';
import { index } from '@firestitch/common';
import { FsDateModule } from '@firestitch/date';
import { FsDialogModule } from '@firestitch/dialog';
import { FsLabelModule } from '@firestitch/label';
import { FsMessage } from '@firestitch/message';
import { FsSkeletonModule } from '@firestitch/skeleton';

import { LogTypes } from '../../../../../../consts';


@Component({
  templateUrl: './server-log.component.html',
  styleUrls: ['./server-log.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatTabsModule,
    FsLabelModule,
    FsDateModule,
    FsSkeletonModule,
    FsDialogModule,
  ],
})
export class ServerLogComponent implements OnInit {
  data = inject(MAT_DIALOG_DATA);

  private _clipboard = inject(FsClipboard);
  private _message = inject(FsMessage);

  public log;
  public backtrace: string;
  public logData: string;
  public server: string;
  public LogTypes: Record<string, string> = index(LogTypes, 'value', 'name');

  public ngOnInit() {
    if (this.data.log) {
      this.log = this.data.log;
      this.backtrace = this._prettifyBacktrace(this.log.backtrace);
      this.logData = this._prettify(this.log.data);
      this.server = this._prettify(this.log.server);
    }
  }

  public copy() {
    this._clipboard.copy(JSON.stringify(this.log, null, 2));
    this._message.success('Copied to clipboard');
  }

  private _prettifyBacktrace(value): string {
    if (typeof value === 'string') {
      value = value.trim();

      try {
        value = JSON.parse(value);
      } catch (e) {
        return value;
      }
    }

    if (!Array.isArray(value)) {
      return this._prettify(value);
    }

    return value
      .map((frame, idx) => {
        const call = [frame.class, frame.type, frame.function]
          .filter((part) => !!part)
          .join('');
        const args = (frame.args || [])
          .map((arg) => this._formatArg(arg))
          .join(', ');
        const location = frame.file
          ? `${frame.file}(${frame.line ?? '?'})`
          : '[internal function]';

        return `#${idx} ${location}: ${call}(${args})`;
      })
      .join('\n');
  }

  private _formatArg(arg): string {
    if (typeof arg === 'string') {
      const max = 60;
      const value = arg.replace(/\s+/g, ' ');

      return `'${value.length > max ? `${value.substring(0, max)}…` : value}'`;
    }

    if (Array.isArray(arg)) {
      return 'Array';
    }

    if (arg && typeof arg === 'object') {
      return 'Object';
    }

    return String(arg);
  }

  private _prettify(value): string {
    if (typeof value === 'string') {
      value = value.trim();

      try {
        value = JSON.parse(value);
      } catch (e) {
        return value;
      }
    }

    if (!value || (typeof value === 'object' && Object.keys(value).length === 0)) {
      return '';
    }

    return JSON.stringify(value, null, 2);
  }
}
