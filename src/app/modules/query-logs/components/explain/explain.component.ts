import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  templateUrl: './explain.component.html',
  styleUrls: ['./explain.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExplainComponent {

  public explain;

  constructor(
    @Inject(MAT_DIALOG_DATA) private _data: any,
  ) {
    this.explain = _data.explain;
  }
}
