import { Component, OnInit, Inject } from '@angular/core';
import { chain } from 'lodash-es';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiLogStates } from '../../consts';


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

    this.apiLogStates = chain(ApiLogStates)
                      .keyBy('value')
                      .mapValues('name')
                      .value();

    if (this.data.api_log) {
      this.api_log = this.data.api_log;
    }
  }
}
