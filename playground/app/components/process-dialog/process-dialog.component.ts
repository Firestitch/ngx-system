import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';


@Component({
  templateUrl: 'process-dialog.component.html',
  styleUrls: ['process-dialog.component.scss']
})
export class ProcessDialogComponent {
  public setting;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<ProcessDialogComponent>) {}

  save = (): Observable<any> =>  {
    this.dialogRef.close();
    return of(true);
  }
}
