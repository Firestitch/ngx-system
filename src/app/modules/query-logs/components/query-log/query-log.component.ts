import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialog, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';


import { ExplainComponent } from '../explain';
import { FsDialogModule } from '@firestitch/dialog';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { FsLabelModule } from '@firestitch/label';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { FsClipboardModule } from '@firestitch/clipboard';
import { NgTemplateOutlet, NgClass } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { FsFormModule } from '@firestitch/form';
import { FsPopoverModule } from '@firestitch/popover';
import { FsCommonModule } from '@firestitch/common';


@Component({
    templateUrl: './query-log.component.html',
    styleUrls: ['./query-log.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FsDialogModule,
        MatDialogTitle,
        CdkScrollable,
        MatDialogContent,
        FsLabelModule,
        MatTabGroup,
        MatTab,
        FsClipboardModule,
        NgTemplateOutlet,
        MatDialogActions,
        MatButton,
        FsFormModule,
        MatDialogClose,
        FsPopoverModule,
        NgClass,
        FsCommonModule,
    ],
})
export class QueryLogComponent {
  private _data = inject(MAT_DIALOG_DATA);
  private _dialog = inject(MatDialog);


  public queryLog;
  public accessTypes = {
    NULL: 'This access method means MySQL can resolve the query during the optimization phase and will not even access the table or index during the execution stage.',
    system: 'The table is empty or has one row.',
    const: 'The value of the column can be treated as a constant (there is one row matching the query). Note: Primary Key Lookup, Unique Index Lookup',
    eq_ref: 'The index is clustered and is being used by the operation (either the index is a PRIMARY KEY or UNIQUE INDEX with all key columns defined as NOT NULL)',
    ref: 'The indexed column was accessed using an equality operator Note: The ref_or_null access type is a variation on ref. It means MySQL must do a second lookup to find NULL entries after doing the initial lookup.',
    fulltext: 'Operation (JOIN) is using the table’s fulltext index',
    index: 'The entire index is scanned to find a match for the query. Note: The main advantage is that this avoids sorting. The biggest disadvantage is the cost of reading an entire table in index order. This usually means accessing the rows in random order, which is very expensive.',
    index_merge: 'This join type indicates that the Index Merge optimization is used. In this case, the key column in the output row contains a list of indexes used. It indicates a query can make limited use of multiple indexes on a single table.',
    range: 'This type replaces eq_ref for some IN subqueries of the following form: value IN (SELECT primary_key FROM single_table WHERE some_expr)',
    unique_subquery: '',
    ALL: 'MySQL scans the entire table to satisfy the query',
  };

  constructor() {
    const _data = this._data;

    this.queryLog = _data.queryLog;
  }

  public openExplain() {
    this._dialog.open(ExplainComponent, {
      data: { explain: this.explain },
    });
  }

  public get explain() {
    return this.queryLog.explain;
  }

  public get queryBlock() {
    return this.explain?.queryBlock;
  }

  public get orderingOperation() {
    return this.queryBlock?.orderingOperation;
  }
}
