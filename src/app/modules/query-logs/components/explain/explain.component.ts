import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { FsDialogModule } from '@firestitch/dialog';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatButton } from '@angular/material/button';
import { FsFormModule } from '@firestitch/form';
import { JsonPipe } from '@angular/common';


@Component({
    templateUrl: './explain.component.html',
    styleUrls: ['./explain.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FsDialogModule,
        MatDialogTitle,
        CdkScrollable,
        MatDialogContent,
        MatDialogActions,
        MatButton,
        FsFormModule,
        MatDialogClose,
        JsonPipe,
    ],
})
export class ExplainComponent {
  private _data = inject(MAT_DIALOG_DATA);


  public explain;

  constructor() {
    const _data = this._data;

    this.explain = _data.explain;
  }
}
