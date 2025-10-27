import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { Component, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { FsFormModule } from '@firestitch/form';
import { FsDialogModule } from '@firestitch/dialog';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatLabel, MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';


@Component({
    templateUrl: 'process-dialog.component.html',
    styleUrls: ['process-dialog.component.scss'],
    standalone: true,
    imports: [FormsModule, FsFormModule, FsDialogModule, MatDialogTitle, CdkScrollable, MatDialogContent, MatLabel, MatFormField, MatInput, MatDialogActions, MatButton, MatDialogClose]
})
export class ProcessDialogComponent {
  data = inject(MAT_DIALOG_DATA);
  private dialogRef = inject<MatDialogRef<ProcessDialogComponent>>(MatDialogRef);

  public setting;

  save = (): Observable<any> =>  {
    this.dialogRef.close();
    return of(true);
  }
}
