import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ProcessStates } from './../../consts/process-states.const';
import { indexNameValue } from '../../helpers/index-name-value';
import { ProcessState } from './../../enums/process-state.enum';

@Component({
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit {

  public process;
  public ProcessStates;
  public ProcessState = ProcessState;

  constructor(private _dialogRef: MatDialogRef<ProcessComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {}

  public ngOnInit() {

    this.ProcessStates = indexNameValue(ProcessStates);

    if (this.data.loadProcess) {
      this.load();
    } else {
       this.process = this.data.process;
    }
  }

  public load() {
    this.data.loadProcess(this.data.process)
    .subscribe((process) => {
      this.process = process;
    });
  }
}
