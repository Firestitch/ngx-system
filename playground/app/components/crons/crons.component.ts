import { Component } from '@angular/core';
import { KitchenSinkConfigureComponent } from '../kitchen-sink-configure';
import { FsExampleComponent } from '@firestitch/example';
import { FsMessage } from '@firestitch/message';
import { of } from 'rxjs';

@Component({
  selector: 'crons',
  templateUrl: 'crons.component.html',
  styleUrls: ['crons.component.scss']
})
export class CronsComponent {

  public config = {};

  constructor(private message: FsMessage) {
  }

  public load = () => {
    return of([{"state":"idle","cron_setting":{"summary":"Every minute","weekdays":[],"days":[],"hours":[],"minutes":[],"timeout":1,"disabled":false},"name":"Message Queue","id":1,"create_date":"2019-11-30T17:27:01+00:00","message":"","process":"process_message_queue","is_valid":null,"duration":0,"configs":null,"process_id":null,"long_running":"0"},{"state":"idle","cron_setting":{"summary":"Every minute","weekdays":[],"days":[],"hours":[],"minutes":[],"timeout":1,"disabled":false},"name":"Processes","id":2,"create_date":"2019-11-30T17:27:02+00:00","message":"","process":"process_processes","is_valid":null,"duration":null,"configs":null,"process_id":null,"long_running":"0"},{"state":"idle","cron_setting":{"summary":"Every day at 10:00 am America\/Toronto","weekdays":[],"days":[],"hours":[5],"minutes":[0],"timeout":1,"disabled":false},"name":"Temp Cleanup","id":3,"create_date":"2019-11-30T05:00:02+00:00","message":"","process":"process_temp_cleanup","is_valid":null,"duration":0,"configs":null,"process_id":null,"long_running":"0"},{"state":"disabled","cron_setting":{"summary":"Every minute","weekdays":[],"days":[],"hours":[],"minutes":[],"timeout":1,"disabled":true},"name":"Digest Emails","id":4,"create_date":"2019-05-10T15:33:15+00:00","message":"","process":"process_digest_emails","is_valid":null,"duration":7,"configs":null,"process_id":null,"long_running":"0"},{"state":"idle","cron_setting":{"summary":"The 1st of each month at 7:00 am America\/Toronto","weekdays":[],"days":[1],"hours":[2],"minutes":[0],"timeout":1,"disabled":false},"name":"Timezones","id":5,"create_date":"2019-11-01T02:00:05+00:00","message":"","process":"process_timezones","is_valid":null,"duration":3,"configs":null,"process_id":null,"long_running":"0"}]);
  }

  public enable = () => {
    return of(true);
  }

  public disable = () => {
    return of(true);
  }

  public queue = () => {
    return of(true);
  }

  public run = () => {
    return of(true);
  }

  public kill = () => {
    return of(true);
  }
}
