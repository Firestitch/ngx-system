import { Component, OnInit, Input } from '@angular/core';

import { FsMessage } from '@firestitch/message';
import { groupBy, reduce } from 'lodash-es';
import { SettingInterfaceType } from '../../enums';


@Component({
  selector: 'fs-system-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  @Input() load: Function;
  @Input() save: Function;

  public groupedSettings = [];
  public groups = [];
  public SettingInterfaceType = SettingInterfaceType;

  constructor(
    private _message: FsMessage,
  ) { }

  ngOnInit() {
    this.load()
    .subscribe(settings => {
      this.groupedSettings = groupBy(settings, (item) => {
        return item.group;
      });
      this.groups = Object.keys(this.groupedSettings);
    });
  }

  public saveGroup(group) {

    const settings = this.groupedSettings[group];
    const values = reduce(settings, (result, value, key) => {
      return (result[value.name] = value.value, result);
    }, {});

    this.save(group, values)
    .subscribe(response => {
      this._message.success('Changes Saved');
    });
  }
}
