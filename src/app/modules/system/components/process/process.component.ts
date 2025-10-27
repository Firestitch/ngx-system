import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Inject, OnDestroy, OnInit,
} from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';

import { FsApi, RequestMethod, StreamEventData, StreamEventType } from '@firestitch/api';
import { FsMessage } from '@firestitch/message';
import { FsProcess } from '@firestitch/process';
import { FsPrompt } from '@firestitch/prompt';

import { Observable, Subject, timer } from 'rxjs';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';


import { ProcessProcessStates } from '../../consts';
import { ProcessData } from '../../data/process.data';
import { indexNameValue } from '../../helpers/index-name-value';
import { Process } from '../../interfaces';

import { ProcessStates } from './../../consts/process-states.const';
import { ProcessState } from './../../enums/process-state.enum';
import { FsSkeletonModule } from '@firestitch/skeleton';
import { FsDialogModule } from '@firestitch/dialog';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { FsLabelModule } from '@firestitch/label';
import { NgClass } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatButton } from '@angular/material/button';
import { FsDateModule } from '@firestitch/date';


@Component({
    templateUrl: './process.component.html',
    styleUrls: ['./process.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FsSkeletonModule,
        FsDialogModule,
        MatDialogTitle,
        CdkScrollable,
        MatDialogContent,
        FsLabelModule,
        NgClass,
        MatProgressSpinner,
        MatDialogActions,
        MatButton,
        MatDialogClose,
        FsDateModule,
    ],
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
    private _process: FsProcess,
    private _api: FsApi,
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
    this._process
      .run(`Run ${this.process.name}`, this._api
        .stream(
          RequestMethod.Post, `processes/${this.process.id}/run`)
        .pipe(
          tap((event) => {
            if(event instanceof StreamEventData && event.type === StreamEventType.Sent) {
              this.process.state = ProcessState.Running;
              this._cdRef.markForCheck();
            }
          }),
          filter((event) => event instanceof StreamEventData),
          map((event) => {
            return event?.data;
          }),   
          filter((data) => !!data),
        ),
      );
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
