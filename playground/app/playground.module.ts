import { ProcessDialogComponent } from './components/process-dialog/process-dialog.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FsExampleModule } from '@firestitch/example';
import { FsMessageModule } from '@firestitch/message';
import { FsSystemModule } from '@firestitch/package';
import { FsBuildModule } from '@firestitch/build';
import { FsLabelModule } from '@firestitch/label';
import { ToastrModule } from 'ngx-toastr';

import { AppMaterialModule } from './material.module';
import {
  DashboardComponent,
  ExamplesComponent
} from './components';
import { AppComponent } from './app.component';
import { KitchenSinkConfigureComponent } from './components/kitchen-sink-configure';
import { CronsComponent } from './components/crons';
import { FsListModule } from '@firestitch/list';
import { FsScrollModule } from '@firestitch/scroll';
import { FsSelectionModule } from '@firestitch/selection';
import { SettingsComponent } from './components/settings';
import { FileManagerComponent } from './components/file-manager';
import { FsFileModule } from '@firestitch/file';
import { ProcessesComponent } from './components/processes';
import { ServerLogsComponent } from './components/server-logs';
import { UpgradeLogsComponent } from './components/upgrade-logs';
import { ApiLogsComponent } from './components/api-logs';
import { InfoComponent } from './components/info';
import { FsDatePickerModule } from '@firestitch/datepicker';
import { FsDialogModule } from '@firestitch/dialog';
import { FsFormModule } from '@firestitch/form';

const routes: Routes = [
  { path: '', component: ExamplesComponent },
];

@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    FsSystemModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FsLabelModule,
    FsFormModule,
    FsDialogModule,
    FsExampleModule.forRoot(),
    FsMessageModule.forRoot(),
    ToastrModule.forRoot({ preventDuplicates: true }),
    RouterModule.forRoot(routes),
    FsListModule.forRoot(),
    FsScrollModule.forRoot(),
    FsBuildModule.forRoot({
      origin: 'https://firestitch-dev.s3.us-west-2.amazonaws.com',
      path: 'pub/build.json',
    }),
    FsDatePickerModule.forRoot(),
    FsSelectionModule.forRoot(),
       FsFileModule.forRoot({
      allowDownload: true,
      allowRemove: true,
      dragoverMessage: true
    }),
  ],
  entryComponents: [
    KitchenSinkConfigureComponent,
    ProcessDialogComponent
  ],
  declarations: [
    AppComponent,
    ExamplesComponent,
    CronsComponent,
    DashboardComponent,
    SettingsComponent,
    KitchenSinkConfigureComponent,
    FileManagerComponent,
    ProcessesComponent,
    ServerLogsComponent,
    UpgradeLogsComponent,
    ApiLogsComponent,
    InfoComponent,
    ProcessDialogComponent
  ],
})
export class PlaygroundModule {
}
