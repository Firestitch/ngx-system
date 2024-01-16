import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';

import { FsClipboardModule } from '@firestitch/clipboard';
import { FsCommonModule } from '@firestitch/common';
import { FsDateModule } from '@firestitch/date';
import { FsDialogModule } from '@firestitch/dialog';
import { FsFormModule } from '@firestitch/form';
import { FsLabelModule } from '@firestitch/label';
import { FsListModule } from '@firestitch/list';
import { FsPopoverModule } from '@firestitch/popover';

import { ExplainComponent, QueryLogComponent, QueryLogsComponent } from './components';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CommonModule,
    FormsModule,

    MatTabsModule,
    MatButtonModule,
    MatDialogModule,

    FsFormModule,
    FsLabelModule,
    FsPopoverModule,
    FsCommonModule,
    FsDateModule,
    FsDialogModule,
    FsListModule,
    FsClipboardModule,
  ],
  declarations: [
    QueryLogsComponent,
    QueryLogComponent,
    ExplainComponent,
  ],
})
export class FsSystemQueryLogsModule {
}
