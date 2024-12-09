import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';


@Component({
  selector: 'fs-system-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoComponent implements AfterViewInit {

  @ViewChild('iframe') 
  public iframe: ElementRef;

  @Input() public load: () => Observable<any>;

  public ngAfterViewInit() {
    this._load();
  }

  private _load() {
    this.load()
      .subscribe((info) => {

        info += '<style>body { background: transparent; }</style>';

        const doc =  this.iframe.nativeElement.contentDocument || this.iframe.nativeElement.contentWindow;
        doc.open();
        doc.write(info);
        doc.close();
        const scrollHeight = (this.iframe.nativeElement.contentWindow.document.documentElement.scrollHeight + 100);
        this.iframe.nativeElement.style.height = `${scrollHeight}px`;
      });
  }
}
