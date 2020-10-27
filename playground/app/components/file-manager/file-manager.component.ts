import { Component } from '@angular/core';
import { of } from 'rxjs';


@Component({
  selector: 'file-manager',
  templateUrl: 'file-manager.component.html',
  styleUrls: ['file-manager.component.scss']
})
export class FileManagerComponent {

  public fetch = () => {
    return of([
      { "full_path": "100MB.bin", "path": "", "name": "100MB.bin", "type": "file", "size": 104857600, "modified": null },
      { "full_path": "50MB.zip", "path": "", "name": "50MB.zip", "type": "file", "size": 52428800, "modified": null },
      { "full_path": "assets", "path": "", "name": "assets", "type": "directory", "size": null, "modified": null },
      { "full_path": "content_import", "path": "", "name": "content_import", "type": "directory", "size": null, "modified": null },
      { "full_path": "employee", "path": "", "name": "employee", "type": "directory", "size": null, "modified": null },
      { "full_path": "fa5525", "path": "", "name": "fa5525", "type": "directory", "size": null, "modified": null },
      { "full_path": "files", "path": "", "name": "files", "type": "directory", "size": null, "modified": null },
    ]);
  }

  public deleteFile = (file) => {
    return of(true);
  }

  public deleteDirectory = (file) => {
    return of(true);
  }

  public createDirectory = (file) => {
    return of(true);
  }

  public download = (file) => {
    return of(true);
  }

  public upload = (file) => {
    return of(true);
  }
}
