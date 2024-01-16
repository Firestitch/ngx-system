import { Component, OnInit, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ProcessStates } from './../../consts/process-states.const';
import { indexNameValue } from '../../helpers/index-name-value';
import { ProcessState } from './../../enums/process-state.enum';
import { FsMessage } from '@firestitch/message';


@Component({
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessComponent implements OnInit {

  public process;
  public ProcessStates = indexNameValue(ProcessStates);
  public ProcessState = ProcessState;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _message: FsMessage,
    private _cdRef: ChangeDetectorRef,
  ) {}

  public ngOnInit() {
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
      this._cdRef.markForCheck();
    });
  }

  public run() {
    this._message.success('Running process');
    this.data.run(this.data.process)
    .subscribe(() => {
      this.load();
    });

  setTimeout(() => {
    this.load();
  }, 1000);    
  }

  public download() {
    this.data.download(this.data.process);
  }
}
