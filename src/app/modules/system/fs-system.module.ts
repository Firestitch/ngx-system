import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FsBadgeModule } from '@firestitch/badge';
import { FsColorPickerModule } from '@firestitch/colorpicker';
import { FsDateModule } from '@firestitch/date';
import { FsDatePickerModule } from '@firestitch/datepicker';
import { FsDialogModule } from '@firestitch/dialog';
import { FsFileModule } from '@firestitch/file';
import { FsFileManagerModule } from '@firestitch/file-manager';
import { FsLabelModule } from '@firestitch/label';
import { FsListModule } from '@firestitch/list';
import { FsMenuModule } from '@firestitch/menu';
import { FsPopoverModule } from '@firestitch/popover';
import { FsSkeletonModule } from '@firestitch/skeleton';

import { ApiLogComponent } from './components/api-log/api-log.component';
import { ApiLogsComponent } from './components/api-logs/api-logs.component';
import { CronComponent } from './components/cron';
import { CronLogComponent } from './components/cron-log';
import { CronLogsComponent } from './components/cron-logs';
import { CronNextRunComponent } from './components/cron-next-run';
import { CronsComponent } from './components/crons/crons.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InfoComponent } from './components/info/info.component';
import { ProcessComponent } from './components/process/process.component';
import { ProcessesComponent } from './components/processes/processes.component';
import { ServerLogsComponent } from './components/server-logs/server-logs.component';
import { SettingsComponent } from './components/settings/settings.component';
import { UpgradeLogsComponent } from './components/upgrade-logs/upgrade-logs.component';
import { FS_SYSTEM_CONFIG } from './injectors/system-config.injector';
import { FsSystemConfig } from './interfaces/system-config';
import { KeyNameValuePipe } from './pipes/key-name-value.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    MatButtonModule,
    MatExpansionModule,
    MatTooltipModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTabsModule,

    FsDateModule,
    FsSkeletonModule,
    FsListModule,
    FsFileModule,
    FsFileManagerModule,
    FsLabelModule,
    FsDialogModule,
    FsDatePickerModule,
    FsMenuModule,
    FsBadgeModule,
    FsPopoverModule,
    FsColorPickerModule,
    CronLogsComponent,
  ],
  exports: [
    DashboardComponent,
    CronsComponent,
    SettingsComponent,
    ProcessesComponent,
    ServerLogsComponent,
    UpgradeLogsComponent,
    ApiLogsComponent,
    InfoComponent,
  ],
  declarations: [
    DashboardComponent,
    CronNextRunComponent,
    CronsComponent,
    SettingsComponent,
    KeyNameValuePipe,
    ProcessesComponent,
    ServerLogsComponent,
    UpgradeLogsComponent,
    ApiLogsComponent,
    ApiLogComponent,
    InfoComponent,
    ProcessComponent,
    CronComponent,
    CronLogComponent,
  ],
})
export class FsSystemModule {
  public static forRoot(config: FsSystemConfig): ModuleWithProviders<FsSystemModule> {
    return {
      ngModule: FsSystemModule,
      providers: [
        { provide: FS_SYSTEM_CONFIG, useValue: config || {} },
      ],
    };
  }
}


