import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog';

import { FsDialogModule } from '@firestitch/dialog';
import { FsMarkdownRendererComponent } from '@firestitch/markdown-editor';
import { CdkScrollable } from '@angular/cdk/scrolling';


@Component({
  templateUrl: './setting-instructions.component.html',
  styleUrls: ['./setting-instructions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FsDialogModule,
    CdkScrollable,
    MatDialogContent,
    FsMarkdownRendererComponent,
  ],
})
export class SettingInstructionsComponent {
  private _data = inject(MAT_DIALOG_DATA);

  public setting = this._data.setting;
}
