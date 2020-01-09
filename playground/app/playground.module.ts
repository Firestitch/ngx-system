import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FsExampleModule } from '@firestitch/example';
import { FsMessageModule } from '@firestitch/message';
import { FsSystemModule } from '@firestitch/package';
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
    FsExampleModule.forRoot(),
    FsMessageModule.forRoot(),
    ToastrModule.forRoot({ preventDuplicates: true }),
    RouterModule.forRoot(routes),
    FsListModule.forRoot(),
    FsFileModule.forRoot(),
    FsScrollModule.forRoot(),
    FsSelectionModule.forRoot()
  ],
  entryComponents: [
    KitchenSinkConfigureComponent
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
    InfoComponent
  ],
})
export class PlaygroundModule {
}
