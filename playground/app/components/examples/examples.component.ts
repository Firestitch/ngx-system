import { Component } from '@angular/core';
import { environment } from '@env';
import { FsExampleModule } from '@firestitch/example';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CronsComponent } from '../crons/crons.component';
import { SettingsComponent } from '../settings/settings.component';
import { ProcessesComponent } from '../processes/processes.component';
import { ServerLogsComponent } from '../server-logs/server-logs.component';
import { UpgradeLogsComponent } from '../upgrade-logs/upgrade-logs.component';
import { ApiLogsComponent } from '../api-logs/api-logs.component';
import { QueryLogsComponent } from '../query-logs/query-logs.component';
import { InfoComponent } from '../info/info.component';


@Component({
    templateUrl: 'examples.component.html',
    standalone: true,
    imports: [FsExampleModule, DashboardComponent, CronsComponent, SettingsComponent, ProcessesComponent, ServerLogsComponent, UpgradeLogsComponent, ApiLogsComponent, QueryLogsComponent, InfoComponent]
})
export class ExamplesComponent {
  public config = environment;
}
