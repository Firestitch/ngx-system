import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';

import { FsClipboard } from '@firestitch/clipboard';
import { parse } from '@firestitch/date';
import { FsMessage } from '@firestitch/message';
import { FsPrompt } from '@firestitch/prompt';

import { Observable } from 'rxjs';

import { SettingInterfaceType } from '../../enums';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { NgClass } from '@angular/common';
import { MatFormField, MatLabel, MatHint } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { FsDatePickerModule } from '@firestitch/datepicker';
import { FsColorPickerModule } from '@firestitch/colorpicker';
import { FsFileModule } from '@firestitch/file';
import { KeyNameValuePipe } from '../../pipes/key-name-value.pipe';


@Component({
    selector: 'fs-system-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatAccordion,
        MatExpansionPanel,
        MatExpansionPanelHeader,
        MatExpansionPanelTitle,
        MatIconButton,
        MatTooltip,
        MatIcon,
        NgClass,
        MatFormField,
        MatLabel,
        MatInput,
        FormsModule,
        MatHint,
        MatSelect,
        MatOption,
        FsDatePickerModule,
        FsColorPickerModule,
        FsFileModule,
        MatButton,
        KeyNameValuePipe,
    ],
})
export class SettingsComponent implements OnInit {
  private _message = inject(FsMessage);
  private _clipboard = inject(FsClipboard);
  private _prompt = inject(FsPrompt);
  private _cdRef = inject(ChangeDetectorRef);


  @Input() public loadSettings: (query) => Observable<any[]>;
  @Input() public save: (data: any, group: string) => Observable<any>;

  @Output() public fileRemove = new EventEmitter();
  @Output() public fileSelect = new EventEmitter<{ setting: any, file: Blob }>();

  public groupedSettings = [];
  public groups = [];
  public SettingInterfaceType = SettingInterfaceType;

  public ngOnInit(): void {
    this.loadSettings({
      visible: true,
    })
      .subscribe((settings) => {
        settings = settings
          .filter((setting) => {
            return setting.interfaceType !== SettingInterfaceType.None;
          })
          .map((setting) => {
            switch (setting.interfaceType) {
              case SettingInterfaceType.Date:
              case SettingInterfaceType.Time:
                return {
                  ...setting,
                  value: parse(setting.value),
                };

              case SettingInterfaceType.SelectMultiple:
                return {
                  ...setting,
                  value: Array.isArray(setting.value) ? setting.value : [],
                };
            }
            
            return setting;
          });

        this.groupedSettings = settings.reduce((accum, item) => {
          if(accum[item.group] === undefined) {
            accum[item.group] = [];
          }
          accum[item.group].push(item);

          return accum;
        }, {});
        
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
      };
    });

    this._clipboard.copy(JSON.stringify(data));
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
    const values = settings.reduce((result, value) => {
      return (result[value.name] = value.value, result);
    }, {});

    this.save(group, values)
      .subscribe(() => {
        this._message.success('Changes Saved');
      });
  }
}
