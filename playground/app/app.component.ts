import { Component } from '@angular/core';

import { FsBuildService } from '@firestitch/build';
import { RouterOutlet } from '@angular/router';


@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    standalone: true,
    imports: [RouterOutlet]
})
export class AppComponent {

  public constructor(
    private _buildService: FsBuildService,
  ) { }
}
