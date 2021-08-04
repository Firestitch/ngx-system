import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { FsPrompt } from '@firestitch/prompt';
import { parse } from '@firestitch/date';
import { FsMessage } from '@firestitch/message';

import { groupBy, reduce } from 'lodash-es';
import { ClipboardService } from 'ngx-clipboard';

import { SystemService } from './../../services/system.service';
import { SettingInterfaceType } from '../../enums';
import { Observable } from 'rxjs';


@Component({
  selector: 'fs-system-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit {

  @Input() public loadSettings: () => Observable<any[]>;
  @Input() public save: (data: any, group: string) => Observable<any>;

  @Output() public fileRemove = new EventEmitter();
  @Output() public fileSelect = new EventEmitter<{ setting: any, file: Blob }>();

  public groupedSettings = [];
  public groups = [];
  public SettingInterfaceType = SettingInterfaceType;

  constructor(
    private _message: FsMessage,
    private _systemService: SystemService,
    private _clipboardService: ClipboardService,
    private _prompt: FsPrompt,
    private _cdRef: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
    this.loadSettings()
      .subscribe((settings) => {
        settings = this._systemService.input(settings);

        settings = settings.map((setting) => {
          switch (setting.interfaceType) {
            case SettingInterfaceType.Date:
            case SettingInterfaceType.Time:
              setting.value = parse(setting.value);
              break;
          }
          return setting;
        });

        this.groupedSettings = groupBy(settings, (item) => {
          return item.group;
        });
        this.groups = Object.keys(this.groupedSettings);
        this._cdRef.markForCheck();
      });
  }

  public export(event: UIEvent, settings): void {
    event.stopPropagation();
    const data = settings.map((setting) => {
      return {
        name: setting.name,
        value: setting.value,
        group: setting.group,
      }
    });

    this._clipboardService.copy(JSON.stringify(data));
    this._message.success('Copied to clipboard');
  }

  public import(event: UIEvent, group): void {
    event.stopPropagation();
    this._prompt.input({
        label: 'JSON Import',
        title: 'Import Settings',
        commitLabel: 'Import',
        required: true,
      }).subscribe((value: string) => {
        if (value) {
          try {
            const settings = this.groupedSettings[group];
            const data = JSON.parse(value);

            data.forEach((item) => {
              const setting = settings.find((s) => {
                return item.name === s.name;
              });

              if (setting) {
                Object.assign(setting, item);
              }
            });

            this._cdRef.markForCheck();
          } catch (e) {
            this._message.error(e);
          }
        }
      });
  }

  public saveGroup(group): void {
    const settings = this.groupedSettings[group];
    const values = reduce(settings, (result, value, key) => {
      return (result[value.name] = value.value, result);
    }, {});

    this.save(group, values)
    .subscribe(() => {
      this._message.success('Changes Saved');
    });
  }
}
