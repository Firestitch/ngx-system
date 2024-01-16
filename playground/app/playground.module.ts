import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';


import { FsBuildModule } from '@firestitch/build';
import { FsDatePickerModule } from '@firestitch/datepicker';
import { FsDialogModule } from '@firestitch/dialog';
import { FsExampleModule } from '@firestitch/example';
import { FsFileModule } from '@firestitch/file';
import { FsFormModule } from '@firestitch/form';
import { FsLabelModule } from '@firestitch/label';
import { FsListModule } from '@firestitch/list';
import { FsMessageModule } from '@firestitch/message';
import { FsSystemModule, FsSystemQueryLogsModule } from '@firestitch/package';
import { FsScrollModule } from '@firestitch/scroll';
import { FsSelectionModule } from '@firestitch/selection';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {
  DashboardComponent,
  ExamplesComponent,
  QueryLogsComponent,
} from './components';
import { ApiLogsComponent } from './components/api-logs';
import { CronsComponent } from './components/crons';
import { InfoComponent } from './components/info';
import { KitchenSinkConfigureComponent } from './components/kitchen-sink-configure';
import { ProcessDialogComponent } from './components/process-dialog/process-dialog.component';
import { ProcessesComponent } from './components/processes';
import { ServerLogsComponent } from './components/server-logs';
import { SettingsComponent } from './components/settings';
import { UpgradeLogsComponent } from './components/upgrade-logs';
import { AppMaterialModule } from './material.module';

const routes: Routes = [
  { path: '', component: ExamplesComponent },
];

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    FsSystemModule,
    FsSystemQueryLogsModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FsLabelModule,
    FsFormModule,
    FsDialogModule,
    FsExampleModule.forRoot(),
    FsMessageModule.forRoot(),
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    FsListModule.forRoot(),
    FsScrollModule.forRoot(),
    FsBuildModule.forRoot({
      origin: 'https://firestitch-dev.s3.us-west-2.amazonaws.com',
      path: 'pub/build.json',
    }),
    FsDatePickerModule.forRoot(),
    FsSelectionModule,
    FsFileModule.forRoot({
      allowDownload: true,
      allowRemove: true,
      dragoverMessage: true,
    }),
  ],
  declarations: [
    AppComponent,
    ExamplesComponent,
    CronsComponent,
    DashboardComponent,
    SettingsComponent,
    KitchenSinkConfigureComponent,
    ProcessesComponent,
    ServerLogsComponent,
    UpgradeLogsComponent,
    ApiLogsComponent,
    InfoComponent,
    ProcessDialogComponent,
    QueryLogsComponent,
  ],
})
export class PlaygroundModule {
}
