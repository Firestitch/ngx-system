import { Component } from '@angular/core';
import { FsMessage } from '@firestitch/message';
import { addSeconds } from 'date-fns';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'crons',
  templateUrl: 'crons.component.html',
  styleUrls: ['crons.component.scss']
})
export class CronsComponent {

  public config = {};

  constructor(private message: FsMessage) {
  }

  public loadCrons = () => {
    return of([
      {"processId": 123123123, "host": "asdas wer5234523423213412421.23434234.com","state":"idle","cron_setting":{"summary":"Every minute","weekdays":[],"days":[],"hours":[],"minutes":[],"timeout":1,"disabled":false},"name":"Message Queue","id":1,"createDate":"2019-11-30T17:27:01+00:00","message":"","process":"process_message_queue","is_valid":null,"duration":100,"configs":null,"process_id":null,"long_running":"0"},
      {"state":"failed","cron_setting":{"summary":"Every minute","weekdays":[],"days":[],"hours":[],"minutes":[],"timeout":1,"disabled":false},"name":"Processes","id":2,"createDate":"2019-11-30T17:27:02+00:00","message":"","process":"process_processes","is_valid":null,"duration":5,"configs":null,"process_id":null,"long_running":"0"},
      {"state":"running","cron_setting":{"summary":"Every day at 10:00 am America\/Toronto","weekdays":[],"days":[],"hours":[5],"minutes":[0],"timeout":1,"disabled":false},"name":"Temp Cleanup","id":3,"createDate": addSeconds(new Date(), 425),"message":"","process":"process_temp_cleanup","is_valid":null,"duration":0,"configs":null,"process_id":null,"long_running":"0"},
      {"state":"disabled","cron_setting":{"summary":"Every minute","weekdays":[],"days":[],"hours":[],"minutes":[],"timeout":1,"disabled":true},"name":"Digest Emails","id":4,"createDate":"2019-05-10T15:33:15+00:00","message":"","process":"process_digest_emails","is_valid":null,"duration":500,"configs":null,"process_id":null,"long_running":"0"},
      {"state":"queued","cron_setting":{"summary":"Every minute","weekdays":[],"days":[],"hours":[],"minutes":[],"timeout":1,"disabled":false},"name":"Digest Emails","id":4,"createDate":"2019-05-10T15:33:15+00:00","message":"","process":"process_digest_emails","is_valid":null,"duration":1555,"configs":null,"process_id":null,"long_running":"0"},
      {"state":"killing","cron_setting":{"summary":"The 1st of each month at 7:00 am America\/Toronto","weekdays":[],"days":[1],"hours":[2],"minutes":[0],"timeout":1,"disabled":false},"name":"Timezones","id":5,"createDate":"2019-11-01T02:00:05+00:00","message":"","process":"process_timezones","is_valid":null,"duration":45,"configs":null,"process_id":null,"long_running":"0"}]);
  }

  public bulk = (action, selected) => {
    console.log(action, selected);
    return of(true);
  }

  public loadCron = (cron) => {
    return this.loadCrons()
    .pipe(
      map((crons) => {
        return crons.find((item) => {
          return cron.id === item.id;
        });
      }),
    );
  }

  public loadCronLogs = () => {
    return of(
      {"paging":{"limit":10,"records":90681,"offset":0},"data":[{"id":1793296,"state":"started","message":"","processId":7656,"createDate":"2021-08-03T20:05:46+00:00"},
      {"id":1793297,"createDate":"2021-08-03T20:05:46+00:00","state":"message","message":"twfasdfasdf saf sadf","processId":7656, duration: 23},
      {"id":1793298,"createDate":"2021-08-03T20:05:46+00:00","state":"failed","message":"asdasd\nC:\\Projects\\hallmark\\backend\\Manager\\CronManager.php @ 57\n\nC:\\Projects\\hallmark\\framework\\Cron\\CronManagerBase.php @ 195\nBackend\\Manager\\CronManager->processRecurringWorkOrderGeneration\n\n\nC:\\Projects\\hallmark\\framework\\Cron\\Model\\CronModel.php @ 168\nFramework\\Cron\\CronManagerBase->process\n\n\nC:\\Projects\\hallmark\\framework\\Api\\View\\System\\SystemView.php @ 139\nFramework\\Cron\\Model\\CronModel->run\n\n\nC:\\Projects\\hallmark\\backend\\View\\Api\\SystemView.php @ 46\nFramework\\Api\\View\\System\\SystemView->cronRun\n\n\n\nBackend\\View\\Api\\SystemView->cronRun\n\n\nC:\\Projects\\hallmark\\backend\\View\\Api\\BaseView.php @ 90\ncall_user_func\n\n\nC:\\Projects\\hallmark\\framework\\Core\\View.php @ 355\nBackend\\View\\Api\\BaseView->process\n\n\nC:\\Projects\\hallmark\\framework\\Core\\View.php @ 350\nFramework\\Core\\View->_show\n\n\nC:\\Projects\\hallmark\\framework\\Core\\WebApplication.php @ 282\nFramework\\Core\\View->show\n\n\nC:\\Projects\\hallmark\\framework\\Core\\WebApplication.php @ 246\nFramework\\Core\\WebApplication->processView\n\n\nC:\\Projects\\hallmark\\framework\\Core\\WebApplication.php @ 213\nFramework\\Core\\WebApplication->processTask\n\n\nC:\\Projects\\hallmark\\framework\\Core\\WebApplication.php @ 194\nFramework\\Core\\WebApplication->process\n\n\nC:\\Projects\\hallmark\\framework\\Core\\ApplicationBase.php @ 561\nFramework\\Core\\WebApplication->Framework\\Core\\{closure}\n\n\nC:\\Projects\\hallmark\\framework\\Core\\WebApplication.php @ 195\nFramework\\Core\\ApplicationBase->run\n\n\nC:\\Projects\\hallmark\\backend\\web\\index.php @ 11\nFramework\\Core\\WebApplication->start\n","processId":7656,duration: 3244},
      {"id":1793293,"createDate":"2021-08-03T20:00:46+00:00","state":"started","message":"","processId":7656, duration: 233},
      {"id":1793294,"createDate":"2021-08-03T20:00:46+00:00","state":"message","message":"twfasdfasdf saf sadf","processId":7656},
      {"id":1793295,"createDate":"2021-08-03T20:00:46+00:00","state":"failed","message":"asdasd\nC:\\Projects\\hallmark\\backend\\Manager\\CronManager.php @ 57\n\nC:\\Projects\\hallmark\\framework\\Cron\\CronManagerBase.php @ 195\nBackend\\Manager\\CronManager->processRecurringWorkOrderGeneration\n\n\nC:\\Projects\\hallmark\\framework\\Cron\\Model\\CronModel.php @ 168\nFramework\\Cron\\CronManagerBase->process\n\n\nC:\\Projects\\hallmark\\framework\\Api\\View\\System\\SystemView.php @ 139\nFramework\\Cron\\Model\\CronModel->r","processId":7656},
      {"id":1793291,"createDate":"2021-08-03T19:58:27+00:00","state":"started","message":"","processId":7656},
      {"id":1793292,"createDate":"2021-08-03T19:58:27+00:00","state":"failed","message":"asdasd\nC:\\Projects\\hallmark\\backend\\Manager\\CronManager.php @ 56\n\nC:\\Projects\\hallmark\\framework\\Cron\\CronManagerBase.php @ 195\nBackend\\Manager\\CronManager->processRecurringWorkOrderGeneration\n\n\nC:\\Projects\\hallmark\\framework\\Cron\\Model\\CronModel.php @ 168\nFramework\\Cron\\CronManagerBase->process\n\n\nC:\\Projects\\hallmark\\framework\\Api\\View\\System\\SystemView.php @ 139\nFramework\\Cron\\Model\\CronModel->r","processId":7656},
      {"id":1793289,"createDate":"2021-08-03T19:39:07+00:00","state":"started","message":null,"processId":7656},
      {"id":1793290,"createDate":"2021-08-03T19:39:07+00:00","state":"failed","message":"asdasd","processId":7656}]}
    );
  }

  public enable = (data) => {
    return of(true);
  }

  public disable = (data) => {
    return of(true);
  }

  public queue = (data) => {
    return of(true);
  }

  public run = (data) => {
    return of(true);
  }

  public kill = (data) => {
    return of(true);
  }
}
