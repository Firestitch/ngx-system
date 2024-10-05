import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit,
} from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FsMessage } from '@firestitch/message';
import { FsPrompt } from '@firestitch/prompt';

import { Observable, Subject, timer } from 'rxjs';
import { switchMap, takeUntil, takeWhile, tap } from 'rxjs/operators';

import { ProcessProcessStates } from '../../consts';
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
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
       run: (process: any) => Observable<any>,
       queue: (process: any) => Observable<any>,
       delete: (process: any) => Observable<any>,
       kill: (process: any) => Observable<any>,
       loadProcess: (process: any) => Observable<any>,
       download: (process: any) => void,
       process: any,
    },
    private _message: FsMessage,
    private _cdRef: ChangeDetectorRef,
    private _prompt: FsPrompt,
  ) {}

  public ngOnInit() {
    if (this.data.loadProcess) {
      this.load$()
        .subscribe(() => {
          this.runningRefresh();
        });
    } else {
      this.process = this.data.process;
    }
  }

  public load$(): Observable<any> {
    return this.data
      .loadProcess(this.data.process)
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
        takeWhile(() => this.process.state === ProcessState.Running),
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
        switchMap(() => this.data.kill(this.data.process)),
        switchMap(() => this.load$()),
      )  
      .subscribe(() => {
        this._message.success('Killed process');
      });   
  }

  public run() {
    this._message.success('Running process');
    this.data.run(this.data.process)
      .pipe(
        switchMap(() => this.load$()),
      )
      .subscribe(() => {
        this.runningRefresh();
      });
  }

  public queue() {
    this._message.success('Running process');
    this.data.queue(this.data.process)
      .pipe(
        switchMap(() => this.load$()),
      )
      .subscribe();
  }

  public download() {
    this.data.download(this.data.process);
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

}
