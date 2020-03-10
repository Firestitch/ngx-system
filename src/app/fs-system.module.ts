import { FsSystemConfig } from './interfaces/system-config';
import { FS_SYSTEM_CONFIG } from './injectors/system-config.injector';
import { SystemService } from './services/system.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FsDateModule } from '@firestitch/date';
import { FsDatePickerModule } from '@firestitch/datepicker';
import { FsSkeletonModule } from '@firestitch/skeleton';
import { FsListModule } from '@firestitch/list';
import { FsFileManagerModule } from '@firestitch/file-manager';
import { FsDialogModule } from '@firestitch/dialog';
import { FsLabelModule } from '@firestitch/label';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule, MatInputModule, MatSelectModule, MatFormFieldModule, MatDialogModule } from '@angular/material';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CronsComponent } from './components/crons/crons.component';
import { SettingsComponent } from './components/settings/settings.component';
import { FileManagerComponent } from './components/file-manager/file-manager.component';
import { KeyNameValuePipe } from './pipes/key-name-value.pipe';
import { ProcessesComponent } from './components/processes/processes.component';
import { ServerLogsComponent } from './components/server-logs/server-logs.component';
import { ServerLogComponent } from './components/server-log/server-log.component';
import { UpgradeLogsComponent } from './components/upgrade-logs/upgrade-logs.component';
import { ApiLogsComponent } from './components/api-logs/api-logs.component';
import { ApiLogComponent } from './components/api-log/api-log.component';
import { InfoComponent } from './components/info/info.component';


@NgModule({
  imports: [
    CommonModule,
    FsDateModule,
    MatTooltipModule,
    MatIconModule,
    FsSkeletonModule,
    FlexLayoutModule,
    MatButtonModule,
    FsListModule,
    MatExpansionModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FsFileManagerModule,
    FsLabelModule,
    MatDialogModule,
    FsDialogModule,
    FsDatePickerModule
  ],
  exports: [
    DashboardComponent,
    CronsComponent,
    SettingsComponent,
    FileManagerComponent,
    ProcessesComponent,
    ServerLogsComponent,
    UpgradeLogsComponent,
    ApiLogsComponent,
    InfoComponent
  ],
  declarations: [
    DashboardComponent,
    CronsComponent,
    SettingsComponent,
    KeyNameValuePipe,
    FileManagerComponent,
    ProcessesComponent,
    ServerLogComponent,
    ServerLogsComponent,
    UpgradeLogsComponent,
    ApiLogsComponent,
    ApiLogComponent,
    InfoComponent
  ],
  entryComponents: [
    ServerLogComponent,
    ApiLogComponent
  ],
  providers: [
    SystemService
  ]
})
export class FsSystemModule {
  static forRoot(config: FsSystemConfig): ModuleWithProviders {
    return {
      ngModule: FsSystemModule,
      providers: [
        { provide: FS_SYSTEM_CONFIG, useValue: config || {} },
      ]
    };
  }
}



