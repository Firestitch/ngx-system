import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { ApiLogStates } from '../../consts';
import { indexNameValue } from '../../helpers/index-name-value';
import { FsSkeletonModule } from '@firestitch/skeleton';
import { FsDialogModule } from '@firestitch/dialog';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { FsLabelModule } from '@firestitch/label';
import { MatButton } from '@angular/material/button';
import { JsonPipe } from '@angular/common';
import { FsDateModule } from '@firestitch/date';


@Component({
    templateUrl: './api-log.component.html',
    styleUrls: ['./api-log.component.scss'],
    standalone: true,
    imports: [FsSkeletonModule, FsDialogModule, MatDialogTitle, CdkScrollable, MatDialogContent, FsLabelModule, MatDialogActions, MatButton, MatDialogClose, JsonPipe, FsDateModule]
})
export class ApiLogComponent implements OnInit {

  public apiLog;
  public apiLogStates;

  constructor(private _dialogRef: MatDialogRef<ApiLogComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {}

  public ngOnInit() {

    this.apiLogStates = indexNameValue(ApiLogStates);

    if (this.data.apiLog) {
      this.apiLog = this.data.apiLog;
    }
  }
}
