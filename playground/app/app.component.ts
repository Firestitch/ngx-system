import { Component, inject } from '@angular/core';

import { FsBuildService } from '@firestitch/build';
import { RouterOutlet } from '@angular/router';


@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    standalone: true,
    imports: [RouterOutlet]
})
export class AppComponent {
  private _buildService = inject(FsBuildService);
}
