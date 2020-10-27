import { Component } from '@angular/core';
import { of } from 'rxjs';


@Component({
  selector: 'upgrade-logs',
  templateUrl: 'upgrade-logs.component.html',
  styleUrls: ['upgrade-logs.component.scss']
})
export class UpgradeLogsComponent {

  public load = () => {
    return of({
      data: [
        { "name": "Assets Status", "create_date": "2019-11-29T15:13:22+00:00", "function": "upgrade_assets_status", "state": "completed" },
        { "name": "Post Upgrade Object Project Object", "create_date": "2019-11-25T16:46:19+00:00", "function": "post_upgrade_object_project_object", "state": "completed" },
        { "name": "Object Subclass Image", "create_date": "2019-11-25T11:23:39+00:00", "function": "upgrade_object_subclass_image", "state": "completed" },
        { "name": "Audit Metas Value", "create_date": "2019-10-31T13:35:44+00:00", "function": "upgrade_audit_metas_value", "state": "completed" },
        { "name": "Audits Subject Object Id", "create_date": "2019-10-21T20:27:55+00:00", "function": "upgrade_audits_subject_object_id", "state": "completed" },
        { "name": "Parent Task Id", "create_date": "2019-10-11T11:15:25+00:00", "function": "upgrade_parent_task_id", "state": "completed" },]
    });
  }
}
