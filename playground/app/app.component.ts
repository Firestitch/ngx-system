import { Component } from '@angular/core';

import { FsBuildService } from '@firestitch/build';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public constructor(
    private _buildService: FsBuildService,
  ) { }
}
