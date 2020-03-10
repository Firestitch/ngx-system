import { FsSystemConfig } from './../interfaces/system-config';
import { Injectable, Inject } from '@angular/core';
import * as _snakecaseKeys from 'snakecase-keys';
import * as _camelcaseKeys from 'camelcase-keys';
import { isArray } from 'lodash-es';
import { FS_SYSTEM_CONFIG } from '../injectors/system-config.injector';

const snakecaseKeys = _snakecaseKeys;
const camelcaseKeys = _camelcaseKeys;

@Injectable()
export class SystemService {

  constructor(@Inject(FS_SYSTEM_CONFIG) private _config: FsSystemConfig) {}

  public input(data) {
    if (isArray(data)) {
      return data.map(item => {
        return this._config.case === 'snake' ? camelcaseKeys(item) : item;
      });
    } else {
      return this._config.case === 'snake' ? camelcaseKeys(data) : data;
    }
  }

  public output(data) {
    if (isArray(data)) {
      return data.map(item => {
        return this._config.case === 'snake' ? snakecaseKeys(item) : item;
      });
    } else {
      return this._config.case === 'snake' ? snakecaseKeys(data) : data;
    }
  }
}
