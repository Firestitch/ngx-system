import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, inject } from '@angular/core';


import { Subject, timer } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { addDays, addHours, addMinutes, differenceInSeconds, getDaysInMonth, subSeconds } from 'date-fns';
import { FsDateModule } from '@firestitch/date';


@Component({
    selector: 'app-next-run',
    templateUrl: './cron-next-run.component.html',
    styleUrls: ['./cron-next-run.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FsDateModule],
})
export class CronNextRunComponent implements OnInit, OnDestroy {
  private _cdRef = inject(ChangeDetectorRef);


  @Input() public cron;

  public duration;

  private _destroy$ = new Subject();


  public ngOnInit() {
    this.update();
  }

  public calculateDuration() {
    const now = new Date();
    const nextMinutes = this._getNextMinutes(now);
    const nextHours = this._getNextHours(now);
    const nextDays = this._getNextDays(now);

    if(
      this.cron.cronSetting.minutes.length ||
      this.cron.cronSetting.hours.length ||
      this.cron.cronSetting.days.length 
    ) {
      let next = new Date();
      next = addMinutes(next, nextMinutes);
      next = addHours(next, nextHours);
      next = addDays(next, nextDays);
      next = subSeconds(next, next.getSeconds());

      this.duration = differenceInSeconds(next, now);
    } else {
      this.duration = 60 - now.getSeconds();
    }
  }

  public update() {
    this.calculateDuration();
    timer(0, 1000)
      .pipe(
        tap(() => {
          this.duration -= 1;    

          if(this.duration % 60 === 0 || this.duration < (60 * 5)) {
            this._cdRef.markForCheck();
          }

          if(this.duration <= 0) {
            this.calculateDuration();
            this._cdRef.markForCheck();
          }

        }),
        takeUntil(this._destroy$),
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  private _getNextMinutes(now: Date) {
    const minutes: number[] = this.cron.cronSetting.minutes;
    if(minutes.length) {
      for(let i = minutes.length - 1; i >= 0; i--) {
        if(now.getUTCMinutes() >= minutes[i]) {
          return (minutes[i + 1] ? minutes[i + 1] - now.getUTCMinutes() : (60 - now.getUTCMinutes() + minutes[i]));
        }
      }

      return minutes[0] - now.getMinutes();
    }

    return 0;
  }

  private _getNextHours(now: Date) {
    const hours: number[] = this.cron.cronSetting.hours;
    if(hours.length) {
      for(let i = hours.length - 1; i >= 0; i--) {
        if(now.getUTCHours() >= hours[i]) {
          return (hours[i + 1] ? hours[i + 1] - now.getUTCHours() : (24 - now.getUTCHours() + hours[i]));
        }
      }

      return hours[0] - now.getUTCHours();
    }

    return 0;
  }

  private _getNextDays(now: Date) {
    const days = this.cron.cronSetting.days;
    if(days.length) {
      for(let i = days.length - 1; i >= 0; i--) {
        if(now.getDate() >= days[i]) {
          return (days[i + 1] ? days[i + 1] : getDaysInMonth(now)) - now.getDate();
        }
      }

      return days[0] - getDaysInMonth(now);
    }

    return 0;
  }
}
