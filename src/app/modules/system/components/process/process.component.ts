import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Inject, OnDestroy, OnInit,
} from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FsMessage } from '@firestitch/message';
import { FsPrompt } from '@firestitch/prompt';

import { Observable, Subject, timer } from 'rxjs';
import { filter, switchMap, takeUntil, tap } from 'rxjs/operators';

import { HttpEventType } from '@angular/common/http';

import { ProcessProcessStates } from '../../consts';
import { ProcessData } from '../../data/process.data';
import { indexNameValue } from '../../helpers/index-name-value';
import { Process } from '../../interfaces';

import { ProcessStates } from './../../consts/process-states.const';
import { ProcessState } from './../../enums/process-state.enum';


@Component({
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessComponent implements OnInit, OnDestroy {

  public process: Process;
  public ProcessStates = indexNameValue(ProcessStates);
  public ProcessProcessStates = indexNameValue(ProcessProcessStates);
  public ProcessState = ProcessState;

  private _destroy$ = new Subject();
  private _processData = inject(ProcessData);
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
       process: any,
    },
    private _message: FsMessage,
    private _cdRef: ChangeDetectorRef,
    private _prompt: FsPrompt,
  ) {}

  public ngOnInit() {
    this.load$()
      .subscribe(() => {
        this.runningRefresh();
      });
  }

  public load$(): Observable<any> {
    return this._processData.get(this.data.process.id)
      .pipe(
        tap((process) => {
          this.process = process;
          this._cdRef.markForCheck();
        }),
      );
  }
  
  public runningRefresh() {
    timer(0, 2000)
      .pipe(
        filter(() => this.process.state === String(ProcessState.Running)),
        switchMap(() => this.load$()),
        takeUntil(this._destroy$),
      )
      .subscribe();
  }

  public kill() {
    this._prompt.confirm({
      title: 'Kill process',
      template: 'Are you sure you would like to kill the process?',
    })
      .pipe(
        switchMap(() => this._processData.kill(this.data.process)),
        switchMap(() => this.load$()),
      )  
      .subscribe(() => {
        this._message.success('Killed process');
      });   
  }

  public run() {
    this._message.success('Running process');
    this._processData
      .run(this.data.process, {
        reportProgress: true,
      })
      .pipe(
        tap((event) => {
          switch (event.type) {
            case HttpEventType.Sent: {
              this.process.state = ProcessState.Running;
              this._cdRef.markForCheck();
            } break;
          }
        }),
      )
      .subscribe();
  }

  public queue() {
    this._message.success('Running process');
    this._processData.queue(this.data.process)
      .pipe(
        switchMap(() => this.load$()),
      )
      .subscribe();
  }

  public download() {
    this._processData.download(this.data.process);
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

}
