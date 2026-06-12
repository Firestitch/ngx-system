import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';

import { FsApi } from '@firestitch/api';
import { FsClipboard } from '@firestitch/clipboard';
import { index } from '@firestitch/common';
import { FsDateModule } from '@firestitch/date';
import { FsDialogModule } from '@firestitch/dialog';
import { FsLabelModule } from '@firestitch/label';
import { FsMessage } from '@firestitch/message';
import { FsSkeletonModule } from '@firestitch/skeleton';

import { tap } from 'rxjs/operators';

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
export class ServerLogComponent {

  public log = signal<any>(null);
  public backtrace = signal<string>('');
  public logData = signal<string>('');
  public server = signal<string>('');
  public LogTypes: Record<string, string> = index(LogTypes, 'value', 'name');

  private _data = inject(MAT_DIALOG_DATA);
  private _api = inject(FsApi);
  private _clipboard = inject(FsClipboard);
  private _message = inject(FsMessage);
  private _destroyRef = inject(DestroyRef);

  constructor() {
    this._init();
  }

  public copy() {
    this._clipboard.copy(JSON.stringify(this.log(), null, 2));
    this._message.success('Copied to clipboard');
  }

  private _init(): void {
    // The listing excludes the large columns — fetch the single log with them included
    this._api
      .get(
        `system/logs/server/${this._data.log.id}`,
        {
          backtraces: true,
          data: true,
          servers: true,
        },
        { key: 'log' },
      )
      .pipe(
        tap((log) => {
          this.log.set(log);
          this.backtrace.set(this._prettifyBacktrace(log.backtrace));
          this.logData.set(this._prettify(log.data));
          this.server.set(this._prettify(log.server));
        }),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe();
  }

  private _prettifyBacktrace(value): string {
    let truncated = false;

    if (typeof value === 'string') {
      value = value.trim();

      const parsed = this._parseBacktrace(value);

      if (!parsed) {
        return value;
      }

      truncated = parsed.truncated;
      value = parsed.frames;
    }

    if (!Array.isArray(value)) {
      return this._prettify(value);
    }

    const lines = value
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
      });

    if (truncated) {
      lines.push('… (backtrace truncated)');
    }

    return lines.join('\n');
  }

  private _parseBacktrace(value: string): { frames: any; truncated: boolean } | null {
    try {
      return { frames: JSON.parse(value), truncated: false };
    } catch (e) {
      // stored backtrace may be cut off mid-frame — recover the complete frames
    }

    let boundary = value.lastIndexOf('},{');

    while (boundary > 0) {
      try {
        const frames = JSON.parse(`${value.substring(0, boundary + 1)}]`);

        return { frames, truncated: true };
      } catch (e) {
        // keep trying earlier frame boundaries
      }

      boundary = value.lastIndexOf('},{', boundary - 1);
    }

    return null;
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
