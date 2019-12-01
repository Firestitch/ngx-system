import { Component, OnInit, Input } from '@angular/core';

import { FsFileManagerConfig } from '@firestitch/file-manager';


@Component({
  selector: 'fs-system-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss']
})
export class FileManagerComponent implements OnInit {

  @Input() fetch: Function;
  @Input() deleteFile: Function;
  @Input() deleteDirectory: Function;
  @Input() createDirectory: Function;
  @Input() download: Function;
  @Input() upload: Function;

  public config: FsFileManagerConfig;

  constructor() { }

  ngOnInit() {
    this._configFileManager();
  }

  private _configFileManager() {
    this.config = {
      fetch: (path) => {
        return this.fetch(path);
      },
      deleteFile: (path) => {
        return this.deleteFile(path)
      },
      deleteDirectory: (path) => {
        return this.deleteDirectory(path)
      },
      createDirectory: (path) => {
        return this.createDirectory(path)
      },
      download: (path) => {
        return this.download(path);
      },
      upload: (path, file) => {
        return this.upload(path, file);
      }
    };
  }

}
