import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiLogStates } from '../../consts';
import { indexNameValue } from '../../helpers/index-name-value';


@Component({
  templateUrl: './api-log.component.html',
  styleUrls: ['./api-log.component.scss']
})
export class ApiLogComponent implements OnInit {

  public api_log;
  public apiLogStates;

  constructor(private _dialogRef: MatDialogRef<ApiLogComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {}

  public ngOnInit() {

    this.apiLogStates = indexNameValue(ApiLogStates);

    if (this.data.api_log) {
      this.api_log = this.data.api_log;
    }
  }
}
